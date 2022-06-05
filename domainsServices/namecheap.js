const axios = require('axios');
const xml2js = require('xml2js');

class Namecheap{
    constructor(host, login, key, ipadress){
        this.host = host;
        this.key = key;
        this.login = login;
        this.ipadress = ipadress;
    }

    async getDomainsInfo(){

        const responseObject = {};
        responseObject.error = false;
        responseObject.message = "";

        pageSize = 20;
        do{
            let url = `${this.host}/xml.response?ApiUser=${this.login}&ApiKey=${this.key}&UserName=${this.login}&ClientIp=${this.ipadress}&PageSize=${pageSize}&Command=namecheap.domains.getList`;

            axios.get(url).then(this.transformDataToDB).catch(responseObject.error = true);
        } while(pageSize == 20)
        
        return 
    }
    transformDataToDB({data}){
        const arrayOutgoingData = [];
        let arrayOfDomains;
        console.log(data);
        const parseString = require('xml2js').parseString;

        //potential we can get error
        try{
            parseString(data, 
                function (err, result) {
                    arrayOfDomains = result.ApiResponse.CommandResponse[0].DomainGetListResult[0].Domain;
                });
        }catch(e){
            console.log('Eror transform xml to js');
            return undefined;
        }
        
        //transform data for db from arrayOfDomains

        const getDataFromString = (incomingString) =>{
            //incomingString example '11/03/2021' => dd/MM/YYYY
            let year, mounth, day;
           
            year = incomingString.slice(-4);
            mounth = incomingString.slice(0, 2);
            day = incomingString.slice(3, 5);

            return new Date(year, mounth, day);
        };

        const isBoolean = incomingString=> incomingString==='true'?true:false;

        arrayOfDomains.forEach(item=>{
            const elementOfArray = {};
           
            elementOfArray.idDomen = Number(item["$"].ID);
            elementOfArray.name = item["$"].Name;
            elementOfArray.user = item["$"].User;
            elementOfArray.created = getDataFromString(item["$"].Created);
            elementOfArray.expires = getDataFromString(item["$"].Expires);
            elementOfArray.isExpired = isBoolean(item["$"].IsExpired);
            elementOfArray.isLocked = isBoolean(item["$"].IsLocked);
            elementOfArray.autoRenew = isBoolean(item["$"].AutoRenew);
            elementOfArray.whoisGuard = item["$"].WhoisGuard;
            elementOfArray.isPremium = isBoolean(item["$"].IsPremium);
            elementOfArray.isOurDNS = isBoolean(item["$"].IsOurDNS);

            arrayOutgoingData.push(elementOfArray);
        })
        
        return arrayOutgoingData;
    }

}

module.exports = Namecheap;