const {accountGodaddy, accountNamecheap} = require('../model/model');

class commonController{
    static async runCollection(req, res){
        const allGodaddyAccounts = await accountGodaddy.findAll();                
        console.log(allGodaddyAccounts);
    }
}

module.exports = commonController;