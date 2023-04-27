
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Box,
  } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, {useState, useEffect} from 'react';
import apple from '../logos/apple.svg';
import mi from '../logos/mi.svg';
import motorola from '../logos/motorola.svg';
import nothing from '../logos/nothing.svg';
import oneplus from '../logos/oneplus.svg';
import oppo from '../logos/oppo.svg';
import poco from '../logos/poco.svg';
import realme from '../logos/realme.svg';
import samsung from '../logos/samsung.svg';
import vivo from '../logos/vivo.svg';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link, useHistory } from "react-router-dom";
import ResponsiveAppBar from "../Navbar/Navbar";

const useStyles = makeStyles({
  root: {
    display :'flex',
  //  padding: "8px",
    flexDirection:'column',
  //  justifyContent: "center",
    alignItems: "center",
   // textAlign: "center",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
card1 :{

  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.015)',
    transition: '0.15s linear',
    boxShadow:' 1px 1px 22px rgba(157, 184, 209, 0.5)',
color : ' #604CA5',  
 },
}
});


const Brands = () => { 

const history = useHistory();
const classes = useStyles();
const [data, setData] = useState([]);
const handlebrandclick = (lo) => {
  let obj = data.find(o => o.name === lo['name']);
  console.log(obj)
  history.push({
    pathname : `/brand/` + lo['name'],
    state : obj['id']
  })
}

const dbRef = ref(getDatabase());
get(child(dbRef, `apple`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

useEffect(() => {
  fetch('http://localhost:8000/')
  .then((response) => response.json())
  .then((data) => setData(data));
  console.log(data)
}, []);


    const data1 = [
        {"name" : "Apple" , "logo" : apple},
        {"name" : "Xiaomi", "logo" :mi },
        {"name" : "Motorola", "logo" :motorola },
        {"name" : "Nothing" , "logo" : nothing},
        {"name" : "OnePlus", "logo" : oneplus },
        {"name" : "Oppo", "logo" : oppo},
          {"name" : "Poco", "logo" : poco},
          {"name" : "Realme" , "logo" : realme },
          {"name" : "Samsung", "logo" :samsung },
          {"name" : "Vivo", "logo" :vivo },


    ]
    return(
        <Grid container className={classes.root}>
         <ResponsiveAppBar/>
         <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Brand </Typography>
         <Grid container>
            {
                data1.map((lo) => (
            <Grid item xs={5} md={2} style={{ display:'flex',justifyContent:'center', alignItems :'center', margin:3, flexDirection:'row'}}>
              {/* <Link to = {{
                pathname : `/brand/` + lo['name'],
                state : lo['name']
              }}> */}
              <Card onClick={() => handlebrandclick(lo)} className={classes.card1} elevation={0}>
                <CardMedia
                  image={lo["logo"]}
                  title={lo["name"]}
                 sx={{ height: '100px', width:'100px'}}
                />
                <CardContent>
                  <Typography>{lo["name"]}</Typography>
                </CardContent>
              </Card>
              {/* </Link> */}
            </Grid>
                ))
            }
          </Grid>
        </Grid>
    )
}

export default Brands;