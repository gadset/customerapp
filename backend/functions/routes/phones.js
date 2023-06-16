const express = require('express')
const catalog = require('../src/catalog');
const deals = require('../src/deals');
const glossary = require('../src/glossary');
const search = require('../src/search');
const top = require('../src/top');

const Razorpay = require("razorpay");

const router = express.Router();

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

   module.exports = router ;