const axios = require('axios');

class Godaddy{
    constructor(host, key, secret){
        this.host = host;
        this.key = key;
        this.secret = secret;
    }

    async getDomainsInfo(idAccount, nameAccount){
        const responseObject = {};
        responseObject.error = false;
        responseObject.message = "";
        responseObject.data = undefined;

        const uri = '/v1/domains';

        const arg = {
            headers: { 'Authorization': `sso-key ${this.key}:${this.secret}`}
        }

        try{
            const {status, statusText, data} = await axios.get(this.host + uri, arg);
            if(status!==200){
                responseObject.error = true;
                responseObject.message = `For account ${nameAccount}: ${statusText}\n`;
                return responseObject;
            }
            responseObject.data = data;
        }
        catch(e){
            responseObject.error = true;
            responseObject.message = `For account ${nameAccount}: ${e.message}\n`;  
        }

        return responseObject;
    }

}

module.exports = Godaddy;