//import block
const dotenv = require('dotenv').config();
const express = require('express');
const Sequelize = require('./db');
const router = require('./routes/index');

//namecheap test
//const namecheap = new Namecheap(process.env.hostNamecheap, process.env.loginNamecheap, process.env.keyNamecheap, process.env.ipAdr);
//namecheap.getDomainsInfo();

/*
//godaddy test
const godaddyInstance = new Godaddy(process.env.host, process.env.keyGodaddy, process.env.secretGodaddy);
godaddyInstance.getDomainsInfo('/v1/domains');
*/


//express block
const server = express();
//need to add express.json for parse req.body and req.param
server.use(express.json());
server.use('/api', router);

const startServer = async() =>{
    try{
        //connected to db
        await Sequelize.authenticate();
        await Sequelize.sync();
        
        server.listen(8000 , ()=>{console.log('Server starting on port 8000')});
    }catch(e){
        console.log(e.message);
    }
}

startServer();
