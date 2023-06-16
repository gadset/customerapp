import React, { Component, useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { Grid, Button, Typography, Card } from '@mui/material';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { getDatabase, ref, child, get, set } from "firebase/database";
import {auth, firestoredb } from '../index';
import { doc, setDoc, getFirestore,addDoc, collection, getDocs } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from 'react-redux';
export default function Bidding(){
    const location = useLocation();
    //const mod = location.state.name ;
    const mod = location.state.model;
    console.log(mod);
    const price = location.state.price;
    const [issue, setIssue] = React.useState();
    const [quotedata, setquotedata] = useState([]);
    const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [isTimerRunning, setistimerrunning] = useState(false);
  const [loading, setloading] = useState(false);
  const [timerId, setTimerId] = useState(null);
    const quote1 = []

    const handlegetquotes = async() => {
      const auth= getAuth();
      const user = auth.currentUser;
      var uid;
      if(user){
        uid = user.uid;
      }
      console.log(uid);
      const querySnapshot = await getDocs(collection(firestoredb, "Quotes", uid, 'quotes'));
      querySnapshot.forEach((doc) => {
        quotedata.push(doc.data());
        console.log(doc.data());
        console.log("hello")
      }); 
  setquotedata(quotedata);
  console.log(quotedata);
  setistimerrunning(false);
    }
    const handleChange = (event) => {
        setIssue(event.target.value);
        console.log(issue);
      };
   
      React.useEffect(() => {
        let timeroi;
       // handlegetquotes();
    
        if (isTimerRunning) {
           setCountDown(20 * 1);
        timeroi= setInterval(() => {
          if(countDown>=0){
            setCountDown((countDown) => countDown - 1);
          }
        }, 1000);
        }
        return () => {
          clearInterval(timeroi);
        };
      }, [isTimerRunning, timerId]);
    

    const Issuesarr = [
        {
            name : 'Battery Replacement',
        },
        {
            name : 'Screen replacement',
        },
        {
            name :  'speaker replacement',
        },
        {
            name:  'touch repair'
        }      
       
    ]
const userid = useSelector((state) => state.userid.value);
const addtodatabase = async() => {

  const auth= getAuth();
  const user = auth.currentUser;
  var uid;
  if(user){
    uid = user.uid;
    console.log(uid)
  }
  const quoteRef = await addDoc(collection(firestoredb, "Quotes"), {  
  "uid" : uid,
  "model" : mod,
  "issue" : issue
  });

  const quoteid = quoteRef.id;
  const useref = doc(firestoredb, "Users", userid);
  setDoc(useref, { "quote": quoteid }, { merge: true });
  // const quoteRef = await setDoc(collection(firestoredb, "Users", userid), {  
  //   "uid" : uid,
  //   "model" : mod,
  //   "issue" : issue
  //   });

    // const db = getDatabase();
    // const tasksRef = ref(db, "Users", userid);
    // set(tasksRef, {
    //     mod,
    //     issue,
    //   })
}

async function handlesend(){
  const auth= getAuth();
  const user = auth.currentUser;
  var uid;
  if(user){
    uid = user.uid;
    console.log(uid)
  }
  const response = await fetch('http://localhost:8000/sendquote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify({
        "uid" : uid,
        "model" : mod,
        "issue" : issue
      }),   
    });
    const json = await response.json();
    if(json["response"] === "True"){  
     setistimerrunning(true);
//      const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
//      querySnapshot.forEach((doc) => {
//        quotedata.push(doc.data());
//      }); 
//  setquotedata(quotedata);
//  console.log(quotedata);
//     setloading(true);

     const newTimerId = setTimeout(async() => {
      const auth= getAuth();
      const user = auth.currentUser;
      var uid;
      if(user){
        uid = user.uid;
      }
      const querySnapshot = await getDocs(collection(firestoredb, "Quotes", uid, 'quotes'));
      querySnapshot.forEach((doc) => {
        quotedata.push(doc.data());
        console.log(doc.data());
      }); 
  setquotedata(quotedata);
  console.log(quotedata);
  setloading(true);
      clearTimeout(newTimerId);
      setTimerId(null);
      setistimerrunning(false);
    }, 20000); // 5 minutes in milliseconds

    setTimerId(newTimerId);
   
      console.log("hello1")
      }
    
      
     



      // const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.id, " => ", doc.data());
      //     doc.data()['quoteid'] = doc.id;
      //     quote1.push(doc.data());});
      //     setquotedata(quote1);

    }


const seconds = String(countDown % 60).padStart(2, 0);
const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
    return(
        <Grid>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Issue</InputLabel>
        <Select
          value={issue}
          onChange={handleChange}
        >
          {
            Issuesarr.map((iss, index) => (
                <MenuItem key={index} value={iss.name}>{iss.name}</MenuItem>
            ))
          }
        </Select>
        <Button onClick={handlesend}>get quotes</Button>

      </FormControl>

      <Grid>
          <Typography>
  Time: {seconds}
</Typography> 


        </Grid>
        <Grid>

        {
          loading ?
         
          quotedata.map((quo, index) => (
          <Card key={quo.model} elevation={2} sx={{margin:'8px', padding:'8px'}}>
              <Typography>amount : {quo.amount}</Typography>
              <Typography>Partner name : {quo.name}</Typography>
          </Card>
         ))
          :
          <></>
        }

</Grid>
        </Grid>
    )
}