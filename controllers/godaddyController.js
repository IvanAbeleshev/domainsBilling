const { beforeFind } = require('../db');
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
        if (!Array.isArray(data)){
            return false;
        }

        data.forEach(async({createdAt, ...item})=>{   
            const newElement = await domainsDataGodaddy.create({...item, createdAtGoDaddy: createdAt, accountGodaddyId:idAccount});
        });
        
        return true;

    }

    async getLastDataOfGodaddyDomains(){
        const StringQuery = `
        SELECT 
            "createdAtGoDaddy" as created,
            domain,
            "domainId" as idDomen,
            max("expires") as expired,
            "renewAuto" as autoRenew,
            "exposeWhois" as whoisGuard,
            max(domains."createdAt") as lastUpdate,
            'godaddy' as nameService,
            account.login as login
        FROM "domainsDataGodaddies" domains
        JOIN "accountGodaddies" account ON domains."accountGodaddyId" = account.id
        group by idDomen, domain, created, autoRenew, whoisGuard, account.login`;
        const [result, metadata] = await Sequelize.query(StringQuery);
        return result;
    }

    async requestGetLastDataOfGodaddyDomains(req, res, next){
        const StringQuery = `
        SELECT 
            "createdAtGoDaddy" as created,
            domain,
            "domainId" as idDomen,
            max("expires") as expired,
            "renewAuto" as autoRenew,
            "exposeWhois" as whoisGuard,
            max(domains."createdAt") as lastUpdate,
            'godaddy' as nameService,
            account.login as login
        FROM "domainsDataGodaddies" domains
        JOIN "accountGodaddies" account ON domains."accountGodaddyId" = account.id
        group by idDomen, domain, created, autoRenew, whoisGuard, account.login`;
        const [result, metadata] = await Sequelize.query(StringQuery);
        //result is object
        res.json(result);
    }

    
}

module.exports = new GodaddyController();