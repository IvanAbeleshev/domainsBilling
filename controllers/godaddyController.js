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

}

module.exports = new GodaddyController();