import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { auth, firestoredb } from "../index";
import { doc, setDoc, getFirestore,addDoc, collection } from "firebase/firestore"; 
import { Link , useHistory, useLocation} from 'react-router-dom';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../index";
import {Row, Col, Toast} from 'react-bootstrap';

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
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        const user = userCredential.user;
     const docRef = await addDoc(collection(firestoredb, "Partners"), {
           "email" : email,
           "name" : name
           });
    console.log(docRef.id);
    history.push({
        pathname : '/addbid',
        state : {name : name, email : email}
    })
      // ...
      console.log('signin successful')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // ..
    });
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Grid>
        <Typography>Sign in first to see the customer requirements</Typography>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
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
        <Button onClick={() => setShow(true)}>Show Toast</Button>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
        <TextField
        label="Name"
        type="name"
        variant="outlined"
        value={name}
        onChange={handleChangeName}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
    </Grid>
  );
}

export default LoginForm;
