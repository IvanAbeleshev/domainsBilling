//import block
const dotenv = require('dotenv').config();
const express = require('express');
const Sequelize = require('./db');
const router = require('./routes/index');
const xmlparser = require('express-xml-bodyparser');
const { request } = require('express');
const path = require("path");
const cors = require("cors");

//namecheap test
//const namecheap = new Namecheap(process.env.hostNamecheap, process.env.loginNamecheap, process.env.keyNamecheap, process.env.ipAdr);
//namecheap.getDomainsInfo();

/*
//godaddy test
const godaddyInstance = new Godaddy(process.env.host, process.env.keyGodaddy, process.env.secretGodaddy);
godaddyInstance.getDomainsInfo('/v1/domains');
*/
const port = process.env.PORT_SERVER || 7000;

//express block
const server = express();
//need to add express.json for parse req.body and req.param
server.use(cors());
server.use(express.json());
server.use(xmlparser());

server.use('/api', router);
server.get('/', (req, res)=>res.sendFile(path.join(__dirname+'/ui/index.html')));

const startServer = async() =>{
    let countTry = 5;
    for(let i=0; i<=countTry; i++){
        try{
            await Sequelize.authenticate();
            await Sequelize.sync();
            
            server.listen(port , ()=>{console.log(`Server starting on port ${port}`)});
            break;
        }
        catch(e){
            console.log("web server will bee restarted at 5s");
            await new Promise(res=>setTimeout(res, 5000));
            
        }

    }
}

startServer();
