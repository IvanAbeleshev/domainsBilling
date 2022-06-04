const axios = require('axios');

class Godaddy{
    constructor(host, key, secret){
        this.host = host;
        this.key = key;
        this.secret = secret;
    }

    async getDomainsInfo(uri){
    
        const arg = {
            headers: { 'Authorization': `sso-key ${this.key}:${this.secret}`}
        }
        //return promise
        return axios.get(this.host + uri, arg);

        
    }

}

module.exports = Godaddy;