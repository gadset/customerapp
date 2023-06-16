import { Grid, Typography, Card, TextField, Button, Modal } from '@mui/material'
import React, { Component, useEffect, useState } from 'react'
import { getDatabase, ref, child, get } from "firebase/database";
import { collection, doc, setDoc ,getDocs} from "firebase/firestore"; 
import {auth, firestoredb } from '../index';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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

    },
  }));

export default function Postbid(){
  const classes = useStyles();
  const location = useLocation();
    const name = location.state.name;
    const email = location.state.email
    const [quotedata, setquotedata] = useState([]);
    const[quotesall, setquotesall] = useState([]);
    const [amount, setamount] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Service center');
    const [value2, setValue2] = useState('zero warranty');
    const [modelname, setmodelname] = useState('');
    const quote1 = []
    const quote2 =[]
    const handledata = async() => {
      const querySnapshot = await getDocs(collection(firestoredb, "Quotes"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
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

      const handleChange = (e) => {
        setValue(e.target.value);
        console.log(e.target.va)
      }

      const handleopenmodel = (dat) => {
        setmodelname(dat);
        setOpen(true);

      }

      const handleadddata = async(id) => {
        console.log(id);
        var id1 = quotedata[id];
        console.log(id1);
        const response = await fetch('http://localhost:8000/submitquote', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }, 
          body : JSON.stringify({
            "uid" : id1,
            "name" : name,
              "email" : email,
              "amount" : amount
          
          }),   
        });
        const json = await response.json();
        console.log(json);
        console.log("happening") 
      }
        return(
        <Grid>
          <Modal
  open={open}
  onClose={handleClose}
  className={classes.modal}
> 
<Grid container className={classes.paper}>
  <Typography>{modelname}</Typography>
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
      >
        <FormControlLabel value="zero warranty" control={<Radio />} label="zero warranty" />
        <FormControlLabel value="3 months" control={<Radio />} label="3 months" />
        <FormControlLabel value="6 months" control={<Radio />} label="6 months" />
        <FormControlLabel value="12 months" control={<Radio />} label="12 months" />
      </RadioGroup>
    </FormControl>
    </Grid>
  <Button>Submit quote</Button>
</Grid>

</Modal>
            {
                quotesall.length > 0 ?
                quotesall.map((quote, index)=> (
                <Card key={index} elevation={2} sx={{margin:'8px', padding:'8px'}} >       
                        <Typography>{quote['issue']}</Typography>
                        <Typography>{quote['model']}</Typography>
                        {/* <Typography>{quotedata[quote]['mod']}</Typography> */}
                        {/* <TextField label="Enter the amount here" variant='outlined' value={amount
                        } onChange={(e)=>setamount(e.target.value)}/> */}
                        <Button onClick={()=> handleopenmodel(quote['model'])}>Submit </Button>
                </Card>

                ))
                :
                <Typography> No quote available </Typography>
            }
        </Grid>
    )
}