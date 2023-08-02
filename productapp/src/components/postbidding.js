import { Grid, Typography, Card, TextField, Button, Modal, FilledInput } from '@mui/material'
import React, { Component, useEffect, useState } from 'react'
import { getDatabase, ref, child, get } from "firebase/database";
import { collection, doc, setDoc ,getDocs, getDoc} from "firebase/firestore"; 
import {auth, firestoredb } from '../index';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Demo from './getlocation';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection :'column',
    },
    paper: {
      backgroundColor: '#ffffff',
      padding:'16px',
      maxWidth: '90vw',
      maxHeight : '90vh',
      overflowY : 'auto',
      textAlign:'left',
      borderRadius: '30px 30px 0px 0px',
      position:'absolute',
      bottom:0,
      flexDirection : 'column',
      display:'flex'

    },
  }));

export default function Postbid(){
  const classes = useStyles();
  const location = useLocation();
   // const name = location.state.name;
   // const email = location.state.email;
    const [quotedata, setquotedata] = useState([]);
    const[quotesall, setquotesall] = useState([]);
    const [amount, setamount] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Service center');
    const [value2, setValue2] = useState('zero warranty');
    const [modelname, setmodelname] = useState('');
    const [mapsmodel, setmapsmodel] = useState(false);
    //const [address, setaddress] = useState(null);
    const [quoteid1, setquoteid1] = useState(null);
    const history = useHistory();
    const quote1 = []
    const quote2 =[]
    const number = location.state.number;
    console.log(number);
    const [all, setalldata] = useState('');


    useEffect(()=>{
      if(number){
        async function start(){
          const docRef = doc(firestoredb, "Partners", number);
          const docSnap = await getDoc(docRef);
           
    if (docSnap.exists()) {
     setalldata(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
        }
        start();
    
  
      }
      else{
       setalldata(JSON.parse(localStorage.getItem('partnerdata')));
      }
     console.log(all);
    }, [])
  

    //const docid = location.state.docid || '';

    const name = useSelector((state) => state.name.value);
    const address = useSelector((state) => state.address.value);
    const email = useSelector((state)=>state.email.value);
    
    const handledata = async() => {
    const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
      querySnapshot.forEach((doc) => {
        doc.data()['quoteid'] = doc.id;
        quote1.push(doc.data());
quote2.push(doc.id);
      });
    console.log(quote1);
    console.log(quote2)
    setquotesall(quote1);
    setquotedata(quote2);
    }

    useEffect(() => {
        console.log('hello')
        handledata();
    //     const dbRef = ref(getDatabase());
    //     get(dbRef)
    //   .then((snapshot) => {
    //     const data = snapshot.val();
    //     setquotedata(snapshot.val());
    //     setquotesall(Object.keys(snapshot.val()));
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    // });
      }, []);

      const handleClose = () => {
        setOpen(false);
      }

      const handleClose2 = () =>{
        setmapsmodel(false);
      }

      const handleChange = (e) => {
        setValue(e.target.value);
        console.log(e.target.value)
      }

      const handlechange2 = (e) => {
        setValue2(e.target.value);
        console.log(e.target.value)
      }
      const handleopenmodel = (dat, id1) => {
        setmodelname(dat);
        setquoteid1(id1);
        setOpen(true);
       
      }

      const handlesubmitquote = async() => {
        setOpen(false);
        if(value ==='Service center'){
          setmapsmodel(true);
          console.log("hello")
        }
        else{
          const id1 = quoteid1;
          console.log(id1);
          const response = await fetch('http://localhost:8003/submitquote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }, 
            body : JSON.stringify({
              "uid" : id1,
              "name" : name,
                "email" : email,
                "amount" : amount,
                "delivery" : value,
                "warranty" : value2,    
            }),   
          });
          const json = await response.json();
          console.log(json);
          toast.success(json['message']);
          history.push({
            pathname : '/addbid'
          })
        }
      }

      const handlesendmessage = async() => {
        const response = await fetch('http://localhost:8000/message/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }, 
          body : JSON.stringify({
           "phone" : "+918688749458",
          }),   
        });
        const json = await response.json();
        console.log(json);
      }

      const handleadddata = async() => {
        const id1 = quoteid1;
        console.log(id1);
        //console.log("helllooooji")
        const response = await fetch('http://localhost:8003/submitquote', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }, 
          body : JSON.stringify({
            "docid" : "1",
            "alldata" : all,
            "uid" : id1,
            "amount" : amount,
            "delivery" : value,
            "warranty" : value2,  
          }),   
        });
        const json = await response.json();
        console.log(json);
        toast.success(json['message']);
        setOpen(false);
      }
        return(
        <Grid>
          <Button onClick={handlesendmessage}>Send message</Button>
          <Modal
  open={open}
  onClose={handleClose}
  className={classes.modal}
> 
<Grid container spacing={2} className={classes.paper} sx={{display:'flex', flexDirection:'column'}}>
  <Grid item>
  <Typography>{modelname}</Typography>
  </Grid>
  <Grid item>
  <Typography>Select type of service</Typography>
  <FormControl>
      <RadioGroup
        defaultValue="Service center"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Service center" control={<Radio />} label="Service center" />
        <FormControlLabel value="Doorstep delivery" control={<Radio />} label="Doorstep delivery" />
      </RadioGroup>
    </FormControl>
    </Grid>

    <Grid item>
  <Typography>Select minimum warranty you can give</Typography>
  <FormControl>
      <RadioGroup
        defaultValue="zero warranty"
        value={value2}
        onChange={handlechange2}
      >
        <FormControlLabel value="zero warranty" control={<Radio />} label="zero warranty" />
        <FormControlLabel value="3 months" control={<Radio />} label="3 months" />
        <FormControlLabel value="6 months" control={<Radio />} label="6 months" />
        <FormControlLabel value="12 months" control={<Radio />} label="12 months" />
      </RadioGroup>
    </FormControl>
    </Grid>

    <Grid item>
      
    <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            value={amount}
            onChange={(e)=> setamount(e.target.value)}
          />
        </FormControl>
    </Grid>
  <Button onClick={handleadddata}>Submit quote</Button>
</Grid>

</Modal>

{/* <Modal  open={mapsmodel}   onClose={handleClose}
  className={classes.modal}>
  <Grid container className={classes.paper}>
    <Grid item>
<Demo setaddress={setaddress}/>
<Button onClick={handleadddata}> Submit quote </Button>
</Grid>
  </Grid>
</Modal> */}
            {
                quotesall.length > 0 ?
                quotesall.map((quote, index)=> (
                <Card key={index} elevation={2} sx={{margin:'8px', padding:'8px'}} >       
                        <Typography>{quote['issue']}</Typography>
                        <Typography>{quote['model']}</Typography>
                        {/* <Typography>{quotedata[quote]['mod']}</Typography> */}
                        {/* <TextField label="Enter the amount here" variant='outlined' value={amount
                        } onChange={(e)=>setamount(e.target.value)}/> */}
                        <Button onClick={()=> handleopenmodel(quote['model'], quotedata[index])}> Add quote </Button>
                </Card>

                ))
                :
                <Typography> No quote available </Typography>
            }
        </Grid>
    )
}