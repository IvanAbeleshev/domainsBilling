const {accountNamecheap} = require('../model/model');

class NamecheapController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        const{name, login, password, key} = req.body;
        await accountNamecheap.create({name, login, password, key});

        
    }
}

module.exports = new NamecheapController();