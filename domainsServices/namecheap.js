const axios = require('axios');
const xmlParser = require('xml2js');

class Namecheap{
    constructor(host, login, key, ipadress){
        this.host = host;
        this.key = key;
        this.login = login;
        this.ipadress = ipadress;
    }

    async getDomainsInfo(){
    
        let url = `${this.host}/xml.response?ApiUser=${this.login}&ApiKey=${this.key}&UserName=${this.login}&ClientIp=${this.ipadress}&Command=namecheap.domains.getList`;

        //return promise
        return axios.get(url);
        
    }
    static transformDataToDB({data}){
        console.log(data);
        return xmlParser.parseString(data, (err, result)=>{
                if(err) {
                    throw err;
                }
                const json = JSON.stringify(result, null, 4);

                return json;
        });
    }

}

module.exports = Namecheap;