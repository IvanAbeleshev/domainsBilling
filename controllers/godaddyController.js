const Sequelize = require('../db');
const {accountGodaddy, domainsDataGodaddy} = require('../model/model');

class GodaddyController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        const{name, login, password, key, secret} = req.body;
        const newEntry = await accountGodaddy.create({name, login, password, key, secret});
        res.json(newEntry);
    }

    addDomainsInfo({data}, idAccount){
        //data must be array of object
        const resultObject = {};
        resultObject.error = false;
        resultObject.message = '';

        if (!Array.isArray(data)){
            resultObject.error = true;
            resultObject.message = 'Write data godaddy domains in DB. Data is empty. /n';
            return resultObject;
        }

        try{
            data.forEach(async({createdAt, ...item})=>{   
                const newElement = await domainsDataGodaddy.create({...item, createdAtGoDaddy: createdAt, accountGodaddyId:idAccount});
            });
        }catch(e){
            resultObject.error = true;
            resultObject.message = 'Write data godaddy in DB. '+e.message+'/n';    
        }
        
        return resultObject;

    }

    getLastDataOfGodaddyDomains = async(login)=>{
        const stringQuery = `
        SELECT 
            "createdAtGoDaddy" as created,
            domain,
            "domainId" as idDomen,
            max("expires") as expires,
            "renewAuto" as autoRenew,
            "exposeWhois" as whoisGuard,
            max(domains."createdAt") as lastUpdate,
            'godaddy' as nameService,
            account.login as login
        FROM "domainsDataGodaddies" domains
        JOIN "accountGodaddies" account ON domains."accountGodaddyId" = account.id
        ${login==undefined? '': `where account.login = '${login}'`}
        group by idDomen, domain, created, autoRenew, whoisGuard, account.login`;
        const [result, metadata] = await Sequelize.query(stringQuery);
        return result;
    }

    requestGetLastDataOfGodaddyDomains = (req, res, next)=>{
        const {login} = req.query;
        const result = this.getLastDataOfGodaddyDomains(login);
        //result is object
        result.then((data)=>{res.json(data)});
    }

    
}

module.exports = new GodaddyController();