import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button, Grid, TextField, Typography } from '@mui/material';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {auth} from '../index';
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
  } from "firebase/auth";
import Phonenumber from "./Phonenumber";

function setUpRecaptha(number) {
 // var appVerifier = new RecaptchaVerifier('recaptcha-container');
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    console.log('function called')
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);

  // let out ;
  //   const recaptchaVerifier = new RecaptchaVerifier('sendotp', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       out = signInWithPhoneNumber(auth, number, recaptchaVerifier);
  //     }
  //   }, auth);
  //   // recaptchaVerifier.render();
  //    return out;
   ;
  }

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  //const { setUpRecaptha } = useUserAuth();
  const history = useHistory();

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      console.log(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }

    console.log(error);
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      history.push({
        pathname : '/stepper'
      })
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container  sx={{ marginLeft: 0, marginTop : '10px' }} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'80%', display:'flex', flexDirection:'column', justifyContent:'center',    backgroundColor : '#c8dee6',
   borderRadius : '10px', padding:'8px'}}>
        <Typography style={{margin:'8px'}}>Please sign in with your phone number</Typography>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none", margin:'auto' }}>
          <Form.Group style={{margin:'8px'}} controlId="formBasicEmail">
            <PhoneInput
            defaultCountry="IN"
              value={number}
              onChange={setNumber}
              inputComponent={Phonenumber}
              placeholder="Enter phone number"
            />
            <div style={{margin:'8px'}} id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="contained" color="primary" id="sendotp">
              Send Otp
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group style={{margin:'8px'}} controlId="formBasicOtp">
            <TextField
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              size='small'
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button color="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="contained" color="primary">
              Verify
            </Button>
          </div>
        </Form>
        </div>
    </Grid>
  );
};

export default PhoneSignUp;