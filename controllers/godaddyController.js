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
            const newElement = await domainsDataGodaddy.create({...item, accountGodaddyId:idAccount});
        });
        
        return true;

    }

    async requestGetLastDataOfGodaddyDomains(req, res, next){
        const StringQuery = `SELECT * FROM public."domainsDataGodaddies"`;
        const [result, metadata] = await Sequelize.query(StringQuery);
        //console.log(result);
        res.json(result);
    }

    async getLastDataOfGodaddyDomains(){
        return undefined;
    }
}

module.exports = new GodaddyController();