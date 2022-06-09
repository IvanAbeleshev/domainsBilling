const {accountGodaddy, accountNamecheap} = require('../model/model');

//import services
const Godaddy = require('../domainsServices/godaddy');
const Namecheap = require('../domainsServices/namecheap');

//import controllers
const GodaddyController = require('../controllers/godaddyController');
const NamecheapController = require('../controllers/namecheapController');
const { response } = require('express');

class commonController{
    static runCollection = async (req, res) => {
        let addedNewEntries = false;
        
        const allGodaddyAccounts = await accountGodaddy.findAll();                
        allGodaddyAccounts.every(({dataValues})=>{
            const godaddyInstance = new Godaddy(process.env.hostGodaddy, dataValues.key, dataValues.secret);
            addedNewEntries = godaddyInstance.getDomainsInfo('/v1/domains').then(rezult=>{GodaddyController.addDomainsInfo(rezult, dataValues.id)}).catch(false);        
        });
        

        const allNamecheapAccounts = await accountNamecheap.findAll();                
        allNamecheapAccounts.every(async({dataValues})=>{
            const namecheapInstance = new Namecheap(process.env.hostNamecheap, dataValues.login, dataValues.key, process.env.ipAdr);
            const {error, message, data} = await namecheapInstance.getDomainsInfo();
            if(!error){
                addedNewEntries = NamecheapController.addDomainsInfo(data, dataValues.id);
            }
                                        
        });

        const getLastData = async()=>{
            const dataGodaddyDomains = await GodaddyController.getLastDataOfGodaddyDomains();
            const dataNamecheapDomains = await NamecheapController.getLastDataOfNamecheapDomains();
    
            //console.log([...dataGodaddyDomains, ...dataNamecheapDomains]);
            return [...dataGodaddyDomains, ...dataNamecheapDomains];
        }

        const responseObject = {};
        responseObject.error = false;
        responseObject.message = '';
        responseObject.data = await getLastData();
        
        res.json(responseObject);
    }

}

module.exports = commonController;