const axios = require('axios');

class Godaddy{
    constructor(host, key, secret){
        this.host = host;
        this.key = key;
        this.secret = secret;
    }

    async getDomainsInfo(){
    
        const uri = '/v1/domains';

        const arg = {
            headers: { 'Authorization': `sso-key ${this.key}:${this.secret}`}
        }
        //return promise
        return await axios.get(this.host + uri, arg);

    }

}

module.exports = Godaddy;