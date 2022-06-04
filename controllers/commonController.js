const {accountGodaddy, accountNamecheap} = require('../model/model');

//import services
const Godaddy = require('../domainsServices/godaddy');
const Namecheap = require('../domainsServices/namecheap');

//import controllers
const GodaddyController = require('../controllers/godaddyController');

class commonController{
    static async runCollection(req, res){
        let addedNewEntries = false;
        const allGodaddyAccounts = await accountGodaddy.findAll();                
        allGodaddyAccounts.every(({dataValues})=>{
            const godaddyInstance = new Godaddy(process.env.hostGodaddy, dataValues.key, dataValues.secret);
            addedNewEntries = godaddyInstance.getDomainsInfo('/v1/domains').then(rezult=>{GodaddyController.addDomainsInfo(rezult, dataValues.id)}).catch(false);        
        });
    }
}

module.exports = commonController;