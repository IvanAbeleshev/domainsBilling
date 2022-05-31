const axios = require('axios');

class Godaddy{
    constructor(host, key, secret){
        this.host = host;
        this.key = key;
        this.secret = secret;
    }

    getDomainsInfo(uri){

        
        const arg = {
            headers: { 'Authorization': `sso-key ${this.key}:${this.secret}`}
        }
        

        axios.get(this.host + uri,{}, arg).then(()=>console.log('good autorization'));
        
    }

}

module.exports = Godaddy;