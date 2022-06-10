const {accountGodaddy, accountNamecheap} = require('../model/model');

//import services
const Godaddy = require('../domainsServices/godaddy');
const Namecheap = require('../domainsServices/namecheap');

//import controllers
const GodaddyController = require('../controllers/godaddyController');
const NamecheapController = require('../controllers/namecheapController');

class commonController{
    static runCollection = async (req, res) => {
        const responseObject = {};
        responseObject.error = false;
        responseObject.message = '';
        
        const allGodaddyAccounts = await accountGodaddy.findAll();                
        allGodaddyAccounts.every(async({dataValues})=>{
            const godaddyInstance = new Godaddy(process.env.hostGodaddy, dataValues.key, dataValues.secret);
            const {error, message, data} = await godaddyInstance.getDomainsInfo();        
            responseObject.error = responseObject.error&&error; 
            responseObject.message += message;
            if(!error){
                const resultWriteInDB = GodaddyController.addDomainsInfo(data, dataValues.id);
                responseObject.error = responseObject.error&&resultWriteInDB.error; 
                responseObject.message += resultWriteInDB.message;
            }
        });
        

        const allNamecheapAccounts = await accountNamecheap.findAll();                
        allNamecheapAccounts.every(async({dataValues})=>{
            const namecheapInstance = new Namecheap(process.env.hostNamecheap, dataValues.login, dataValues.key, process.env.ipAdr);
            const {error, message, data} = await namecheapInstance.getDomainsInfo();
            responseObject.error = responseObject.error&&error; 
            responseObject.message += message;
            if(!error){
                const resultWriteInDB = NamecheapController.addDomainsInfo(data, dataValues.id);
                responseObject.error = responseObject.error&&resultWriteInDB.error; 
                responseObject.message += resultWriteInDB.message;
            }
                                        
        });

        const getLastData = async()=>{
            const dataGodaddyDomains = await GodaddyController.getLastDataOfGodaddyDomains();
            const dataNamecheapDomains = await NamecheapController.getLastDataOfNamecheapDomains();
    
            return [...dataGodaddyDomains, ...dataNamecheapDomains];
        }

        responseObject.data = await getLastData();
        
        res.json(responseObject);
    }

}

module.exports = commonController;