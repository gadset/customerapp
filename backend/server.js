const express = require('express'); // Importing express module
  
const app = express(); // Creating an express object
  
const port = 8000; 
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
 // Setting an port for this application
const catalog = require('./src/catalog');
const deals = require('./src/deals');
const glossary = require('./src/glossary');
const search = require('./src/search');
const top = require('./src/top');
  
// Starting server using listen function
app.listen(port, function (err) {
   if(err){
       console.log("Error while starting server");
   }
   else{
       console.log("Server has been started at "+port);
   }
})

app.get('/', function (req, res) {
    var devices;
    async function start() {
        devices = await catalog.getBrands();
        res.json(devices);
        //console.log(devices);
    }
    start();
    
  })



  app.post('/search', function(req, res) {
   //console.log(req)
   const name = req.query.phone;

    var devices;
    async function start() {
        devices = await catalog.getBrand(name);
        res.json(devices);
        //console.log(devices);
    }
    start();
 
    //res.json("he");
  });


  app.post('/getphone', function(req, res) {
    //console.log(req)
    const name = req.query.phone;
 
     var devices;
     async function start() {
         devices = await catalog.getDevice(name);
         res.json(devices);
         console.log(devices);
        //  console.log(devices['detailSpec'][1]['specifications'][1]['value'])
        //  console.log(devices['detailSpec'][1]['specifications'][0]['value'])
        //  console.log(devices['detailSpec'][12])
     }
     start();
     //res.json("he");
   });