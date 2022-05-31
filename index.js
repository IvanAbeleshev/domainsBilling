//import block
const dotenv = require('dotenv').config();
const express = require('express');
const Godaddy = require('./godaddy');


const godaddyInstance = new Godaddy(process.env.host, process.env.keyGodaddy, process.env.keyGodaddy);
const rezultRequest = godaddyInstance.getDomainsInfo('/v1/domains');
console.log(rezultRequest);

//express block
const server = express();

//test middleware function
server.use((req, res, next)=>{
    console.log(req.url);
});


server.listen(8000 , ()=>{console.log('Server starting on port 8000')});

