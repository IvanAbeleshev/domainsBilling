const {accountGodaddy} = require('../model/model');

class GodaddyController{
    async addEntry(req, res, next){
        //need to add securite and check data field
        //const{name, login, password, key, secret} = req.body;
        console.log(req.body);
        //const newEntry = await accountGodaddy.create({name, login, password, key, secret});
        //res.json(newEntry);

        
    }
}

module.exports = new GodaddyController();