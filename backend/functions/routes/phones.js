const express = require('express')
const catalog = require('../src/catalog');
const deals = require('../src/deals');
const glossary = require('../src/glossary');
const search = require('../src/search');
const top = require('../src/top');


const Razorpay = require("razorpay");
const db = require('../firebase_Setup');
const router = express.Router();
const Twilio = require("./Messageservice.js");

router.get('/', function (req, res) {
    var devices;
    async function start() {
        devices = await catalog.getBrands();
        res.json(devices);
        console.log(devices);
    }
    start();
    
  })



  router.post('/search', function(req, res) {
   //console.log(req)
   const name = req.query.phone;

    var devices;
    async function start() {
        devices = await catalog.getBrand(name);
        res.json(devices);
        console.log(devices);
    }
    start();
 
    //res.json("he");
  });


  router.post('/getphone', function(req, res) {
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


   router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
           // key_id: process.env.RAZORPAY_KEY_ID,
           // key_secret: process.env.RAZORPAY_SECRET,
           key_id : "nc09IOkWivlgjORqBqWLaXJA",
           key_secret : "rzp_test_hjnHnpkynNqw7v",
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/success", async (req, res) => {
  try {
      // getting the details back from our font-end
      const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
      } = req.body;

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      if (digest !== razorpaySignature)
          return res.status(400).json({ msg: "Transaction not legit!" });

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      res.json({
          msg: "success",
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
      });
  } catch (error) {
      res.status(500).send(error);
  }
});

router.post('/sendquote', function (req, res) {
    //const quotedb = db.collection('Users');
    async function start() {
        try {
            console.log(req.body);
            const id = req.body.uid;
            const userJson = {
              "issue": req.body.issue,
              "model": req.body.model,
              "activestate" : true,
            };
            const quoteDb = db.collection('Quotes'); 
            const response = await quoteDb.doc(id).set(userJson);
            res.send({"response" : "True"});
            const partref = await db.collection('Partners').get();            
            partref.docs.map(doc => {
                Twilio.sendSms({ to: doc.id, 
                    message: `you got a notification from gadset, click on this linke to see the quotes https://gadsetpartner.web.app/home` }, 
                    (err,smsData) => {
                     console.log(smsData);
                });
            })
        
           var refreshIntervalId =  setInterval(async function() {      
                const userRef = await db.collection("Quotes").doc(id)
    .update({
                 "activestate" : false,
            });
               }, 60000); 

            
          clearInterval(refreshIntervalId);
  
          } catch(error) {
           // res.send(error);
           console.log(error)
           res.send({"message" : "false"});
          }
    }     
    start();    
  })
  router.post('/submitquote', function (req, res) {
    //const quotedb = db.collection('Users');
    console.log(req.body);
    async function start() {
        try {
            const id = req.body.uid;
            console.log(id);
            const userRef = db.collection("Quotes").doc(id);
    const response = await userRef.get();
    console.log(response.data());
        if(response.data().activestate === true){
            console.log("ifcond");
            var jsonformat={};
            jsonformat[req.body.name] = {
                "amount" : req.body.amount,
                "email" : req.body.email,
                "name" : req.body.name,
                "delivery" : req.body.delivery,
                "warranty" : req.body.warranty,
                "address": req.body.address,
            }; 
            console.log(req.body.delivery);
            if(req.body.delivery == 'Service center') {
                db.collection("Quotes").doc(id).collection("quotes").add({   "amount" : req.body.amount,
                "email" : req.body.email,
                "name" : req.body.name,
                "delivery" : req.body.delivery,
                "warranty" : req.body.warranty,
                "address": req.body.address,})
            } 
          else{
            db.collection("Quotes").doc(id).collection("quotes").add({   "amount" : req.body.amount,
            "email" : req.body.email,
            "name" : req.body.name,
            "delivery" : req.body.delivery,
            "warranty" : req.body.warranty,})
          }
        //    db1.doc(id).update({
        //    // quote : [...jsonformat]
        //    jsonformat
        //    }, {merge:true})
        console.log("done");
            res.send({"message" : "Succefully submitted"});        
        }
        else{
            console.log("elsecond");
            res.send({"message" : "this bid is closed"});
        }
        
          } catch(error) {
            res.send(error);
          }
    }
    start();   
  })

   module.exports = router ;