const express = require('express'); // Importing express module
  
const app = express(); // Creating an express object
  
const port = 8000;  // Setting an port for this application
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
        //console.log(devices);
    }
    start();
    res.json(devices);
  })