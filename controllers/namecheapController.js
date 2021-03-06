const Sequelize = require('../db');
const {accountNamecheap, domainsNamecheap} = require('../model/model');

class NamecheapController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        const{login, password, key} = req.body;
        const newEntry = await accountNamecheap.create({name:login, login, password, key});
        res.json(newEntry); 
    }
    
    addDomainsInfo(data, idAccount){

        const resultObject = {};
        resultObject.error = false;
        resultObject.message = '';
        try{
            data.forEach(async(item)=>{   
                const newElement = await domainsNamecheap.create({...item, accountNamecheapId:idAccount});
            });
        }catch(e){
            resultObject.error = true;
            resultObject.message = 'Write data namecheap in DB. '+e.message+'/n';             
        }
        
        return resultObject;

    }

    getLastDataOfNamecheapDomains = async(login)=>{
        const stringQuery=`
        SELECT 
            "created" as created,
            "name" as domain,
            "idDomen" as idDomen,
            max("expires") as expires,
            "autoRenew" as autoRenew,
            "whoisGuard" as whoisGuard,
            max("createdAt") as lastUpdate,
            'namecheap' as nameService,
            "user" as login
        FROM "domainsNamecheaps" domains
        ${login==undefined? '': `where domains.user = '${login}'`}
        group by idDomen, domain, created, autoRenew, whoisGuard, login
        `;
        const [result, metadata] = await Sequelize.query(stringQuery);
        return result;
    }

    requestGetLastDataOfNamecheapDomains = (req, res, next)=>{        
        const {login} = req.query;
        const result = this.getLastDataOfNamecheapDomains(login);
        //result is object
        result.then((data)=>{res.json(data)});
    }
}

module.exports = new NamecheapController();