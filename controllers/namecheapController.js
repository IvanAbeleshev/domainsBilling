const {accountNamecheap} = require('../model/model');

class NamecheapController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        const{name, login, password, key, secret} = req.body;
        const newEntry = await accountNamecheap.create({name, login, password, key});
        res.json(newEntry);

        
    }
}

module.exports = new NamecheapController();