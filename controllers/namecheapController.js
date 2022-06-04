const {accountNamecheap, domainsNamecheap} = require('../model/model');

class NamecheapController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        const{name, login, password, key} = req.body;
        const newEntry = await accountNamecheap.create({name, login, password, key});
        res.json(newEntry); 
    }
    
    addDomainsInfo(data, idAccount){

        data.forEach(async(item)=>{   
            const newElement = await domainsNamecheap.create({...item, accountNamecheapId:idAccount});
        });
        
        return true;

    }
}

module.exports = new NamecheapController();