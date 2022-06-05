const {accountGodaddy, accountNamecheap} = require('../model/model');

//import services
const Godaddy = require('../domainsServices/godaddy');
const Namecheap = require('../domainsServices/namecheap');

//import controllers
const GodaddyController = require('../controllers/godaddyController');
const NamecheapController = require('../controllers/namecheapController');

class commonController{
    static async runCollection(req, res){
        let addedNewEntries = false;
        /*
        const allGodaddyAccounts = await accountGodaddy.findAll();                
        allGodaddyAccounts.every(({dataValues})=>{
            const godaddyInstance = new Godaddy(process.env.hostGodaddy, dataValues.key, dataValues.secret);
            addedNewEntries = godaddyInstance.getDomainsInfo('/v1/domains').then(rezult=>{GodaddyController.addDomainsInfo(rezult, dataValues.id)}).catch(false);        
        });
        */

        const allNamecheapAccounts = await accountNamecheap.findAll();                
        allNamecheapAccounts.every(({dataValues})=>{
            const namecheapInstance = new Namecheap(process.env.hostNamecheap, dataValues.login, dataValues.key, process.env.ipAdr);
            addedNewEntries = namecheapInstance.getDomainsInfo().then(rezult=>{
                                //need transform data to object
                                const rezultObject = Namecheap.transformDataToDB(rezult);
                                NamecheapController.addDomainsInfo(rezultObject, dataValues.id);
                                }).catch(false);        
        });

        res.json({message: "get update data"});
    }
}

module.exports = commonController;