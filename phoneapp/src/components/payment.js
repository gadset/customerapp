import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button } from "@mui/material";
import React, { useState } from "react";
import logo from '../Images/logo.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";

export default function Payment(){
    const model1 = useSelector((state) => state.model.value)
    const issues1 = useSelector((state) => state.issues.value)

    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += issues1[i]['cost'];
      }
    const gst = total/10 ;
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    
      async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
    
        // creating a new order
        const result = await  fetch('http://localhost:8000/orders' , {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          
        });
        //axios.post("http://localhost:8000/payment/orders");
    
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
    
        const js = await result.json();
       console.log(js);
        // Getting the order details back
        const { amount, id: order_id, currency } = js;
    
        const options = {
            key: "rzp_test_hjnHnpkynNqw7v", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Venkatesh patnala",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
               // axios.post("http://localhost:8000/payment/success", data) 
                const result = await fetch('http://localhost:8000/payment/success' , {
                  data : data,
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  
                });;
    
               alert(result.data.msg);
            },
            prefill: {
                name: "venkatesh",
                email: "patnala.1@iitj.ac.in",
                contact: "8688749458",
            },
            notes: {
                address: "iit jodhpur",
            },
            theme: {
                color: "#61dafb",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    
    return(
        <Grid container sx={{display:'flex', flexDirection:'column', margin:'8px', padding:'8px'}}>
        <Typography variant="h5">Price Summary</Typography>
        <Typography>Selected Device : {model1}</Typography>
        <Grid item>
            <Typography variant="h6"> Selected Issue </Typography>
            <TableContainer component={Paper}>
  <Table sx={{ minWidth: 400 }} aria-label="simple table">
  <TableBody>
      {issues1.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.cost}</TableCell>
        </TableRow>
      ))}
      <TableRow key='gst'
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            GST/CGST
          </TableCell>
          <TableCell align="right">{gst}</TableCell>
          </TableRow>
      <Divider/>
<TableRow key='total'
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            Total
          </TableCell>
          <TableCell align="right">{total}</TableCell>
          </TableRow>
    </TableBody>
  </Table>
</TableContainer>
<Button variant="contained" onClick={displayRazorpay}>Pay Now</Button>
</Grid>
</Grid>
    )
}