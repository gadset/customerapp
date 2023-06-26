import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { auth, firestoredb } from "../index";
import { doc, setDoc, getFirestore,addDoc, collection, getDoc } from "firebase/firestore"; 
import { Link , useHistory, useLocation} from 'react-router-dom';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../index";
import {Row, Col, Toast} from 'react-bootstrap';
import Demo from "./getlocation";
import { useDispatch } from "react-redux";
import { setAddressValue, setemailValue, setnameValue } from "../reduxslice";
import { Form, Alert } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
  } from "firebase/auth";
import Phonenumber from "../Login/Phonenumber.js";
import { setMobileValue } from "../reduxslice";

export const gettoken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BGv0240OnB9TXCS1EnZSRkTDc31iMchcnB4StYyTjKV0VNnmQnauwLkK-n3xV3aY9g5lNff5-b31ymOsesZAMW8'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [address, setaddress] = useState(null);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [verified, setverified] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const dispatch = useDispatch();
gettoken(setTokenFound);

onMessageListener().then(payload => {
  setShow(true);
  setNotification({title: "hello partner", body: "new quote available"})
  console.log(payload);
  console.log("hello");
}).catch(err => console.log('failed: ', err));

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = async(e) => {
    dispatch(setAddressValue(address));
    dispatch(setnameValue(name));
    dispatch(setemailValue(email));
    e.preventDefault();
    const docRef = doc(firestoredb, "Partners", number);
    const data = {
               "email" : email,
               "name" : name,
               "address" : address,
               }
   
   setDoc(docRef, data)
   .then(() => {
       console.log("Document has been added successfully");
   })
   .catch(error => {
       console.log(error);
   })
    // const docRef = await setDoc(collection(firestoredb, "Partners",number), {
    //          "email" : email,
    //          "name" : name,
    //          "address" : address,
    //          });
    // console.log('signin successful')
    history.push({
       pathname : '/addbid',
        })
    // createUserWithEmailAndPassword(auth, email, password)
    // .then(async(userCredential) => {
    //     const user = userCredential.user;
    //  const docRef = await addDoc(collection(firestoredb, "Partners"), {
    //        "email" : email,
    //        "name" : name,
    //        "address" : address,
    //        });
    // console.log(docRef.id);
    // history.push({
    //     pathname : '/addbid',
    //     state : {name : name, email : email}
    // })
    //   // ...
    //   console.log('signin successful')
    // })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // ..
    });
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      dispatch(setMobileValue(number));
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
      setverified(true);
      alert("number verified");
//       const docRef = doc(firestoredb, "Partners", number );
//       const data = {
//         "email" : "email",
//         "name" : "venk",
//         "address" : "shusus",
//         };
//       setDoc(docRef, data);
// console.log('signin successful')
      console.log(number);
      const docRef = doc(firestoredb, "Partners", number);
      console.log(docRef);
      const docSnap = await getDoc(docRef);   
      if(docSnap.exists()){
        console.log(docSnap.data()['address']);
        dispatch(setAddressValue(docSnap.data()['address']));
        dispatch(setnameValue(docSnap.data()['name']));
        dispatch(setemailValue(docSnap.data()['email']));
        console.log('signin successful');
        history.push({
           pathname : '/addbid',
        })
      }
      else{
        setloggedin(true);
      }
      // const auth= getAuth();
      // const user = auth.currentUser;
      // var uid;
      // if(user){
      //   uid = user.uid;
      // }
      // const docRef = await addDoc(collection(firestoredb, "Users"), {
      //  "number" : number,    
      // "uid" : uid,
      // });   
      // history.push({
      //   pathname : '/service',
      //   state : {total : total}
      // })

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container sx={{margin:'4px', padding:'4px', display:'flex', flexDirection:'column'}}>
        <Typography>Sign in first to see the customer requirements</Typography>
        {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast> 
        <Button onClick={() => setShow(true)}>Show Toast</Button>*/}
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
            <Button type="submit" variant="contained" color="primary" id="sendotp"  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
              Send code
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
            <Button type="submit" variant="contained" color="primary"  sx={{ background: '#056AB5',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',}}>
              Verify
            </Button>
          </div>
        </Form>
        {
          loggedin ? 
          <Grid item> <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        /> {/*
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        /> */}
          <TextField
          label="Name"
          type="name"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
        />
        <Typography> Set your service center address </Typography>
        <Demo setaddress={setaddress}/>
        <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
        </Grid>
        :
        <></>
        }
      
    </Grid>
  );
}

export default LoginForm;
