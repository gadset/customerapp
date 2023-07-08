import React from 'react';
import { Box, Container, Grid, TextField, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@emotion/react';
import SearchComponent from './Searchcomponent';
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
import mobile from "../Images/mobile.svg";
import laptop from "../Images/laptop.svg";
import watches from "../Images/watches.svg";
import tablet from "../Images/tablet.svg";
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  card1:{
    display:'flex',
    flexDirection:'column',
    alignItems : 'center',
    justifyContent:'center',
    border:' 0.5px solid rgba(73, 73, 73, 0.08)',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.015)',
      transition: '0.15s linear',
      boxShadow:' 1px 1px 22px rgba(157, 184, 209, 0.5)',
  color : ' #604CA5',  
   },
  },
  modelcard : {
    backgroundColor : ' rgba(223, 213, 236, 0.15)',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.015)',
      transition: '0.15s linear',
      boxShadow:' 1px 1px 22px rgba(157, 184, 209, 0.5)',  
   },
  }
})

const Home1 = () => {
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();

    const bidscompleted = [{name : "iphone-13", amount : '4500'},
    {name : "iphone-13", amount : '09'},
    // {name : "iphone-13", amount : '09'},
    // {name : "iphone-13", amount : '09'},
    // {name : "iphone-13", amount : '09'},
    // {name : "iphone-13", amount : '09'},
   ]

   
   const data1 = [
    {"name" : "apple" , "logo" : apple},
    {"name" : "Xiaomi", "logo" :mi },
    {"name" : "Motorola", "logo" :motorola },
    {"name" : "Nothing" , "logo" : nothing},
    {"name" : "OnePlus", "logo" : oneplus },
    {"name" : "Oppo", "logo" : oppo},
      {"name" : "Poco", "logo" : poco},
      {"name" : "Realme" , "logo" : realme },
      {"name" : "samsung", "logo" :samsung },
      {"name" : "Vivo", "logo" :vivo },
];

const devices = [
  { name: "Phone", img: mobile },
  { name: "Laptop", img: laptop },
  { name: "watches", img: watches },
  {name : "Tablet", img : tablet},
];

const handlenextpage = () => {
  console.log("hello")
  history.push('/select')
}
return(
    <Grid>
        <Box sx={{height: '25vh', width:'100%', backgroundColor:theme.palette.background.main }}></Box>
        <Grid item>
            <Typography variant='h4'>Bids completed</Typography>
            <Box  sx={{
        display: 'flex',
        overflowX: 'scroll',
        scrollBehavior: 'smooth',
        padding:'10px',

      }}
>
 {
    bidscompleted.map((bid) => (
        <Card sx={{width:'200px', padding:'4px', border:'1px solid black', borderRadius :'0px' }}>
             <Box sx={{ display: 'flex', flexDirection: 'column' }}>
             <Typography variant='body2'>{bid.name}</Typography>
          <Typography variant='body2'>screen replacement</Typography>
          <Typography variant='body2' >Rs : {bid.amount}</Typography>
             </Box>
          
      </Card>
    ))
 }
                
            </Box>
        </Grid>
    <Grid item sx={{display:'flex', justifyContent:'center', height:'50px'}}>
<SearchComponent label="" placeholder="Search Brand"/>
    </Grid>
    <Typography variant='h5' sx={{marginTop:'8px'}}>Select Device</Typography>
    <Grid container style={{ flexDirection: "row",display:'flex',justifyContent:'center',alignItems :'center', marginTop:'8px'}}>
          {devices.map((device) => (
            <Grid item xs={5} className={classes.modelcard} onClick={() =>handlenextpage()} spacing={2} style={{border: '1px solid #EFEFEF', display:'flex',justifyContent:'center', alignItems :'center', padding:'8px', margin:'8px'}}>
              <Card elevation={0} sx={{background : 'transparent', paddingBottom:'0'}}>
                <CardMedia
                  image={device["img"]}
                  title={device["name"]}
                 sx={{ height: '72px', width:'72px'}}
                />  
                  <Typography style={{fontSize : '12px',fontFamily:'Poppins', fontStyle:'normal',lineHeight : '18px', fontWeight :400, color : '#494949'}} >{device["name"]}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
    {/* <Grid item container spacing={1} sx={{width:'100%', display:'flex',justifyContent:'center', alignItems :'center',}}>

            {
                data1.map((lo) => (
            <Grid item xs={4} style={{ display:'flex',justifyContent:'center', alignItems :'center', flexDirection:'column', textAlign:'center'}}>
              <Card sx={{borderRadius :'20px'}} onClick={() => handlenextpage()} className={classes.card1} elevation={2}>
                <CardMedia
                  image={lo["logo"]}
                  title={lo["name"]}
                 sx={{ height: '70px', width:'90px', borderRadius:'20px'}}
                />
              </Card>
              <Typography style={{color: '#494949',fontSize : '14px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '16px', fontWeight :600, margin:'4px'}}>{lo["name"]}</Typography>
            </Grid>
                ))
            }
          </Grid> */}
    </Grid>
)
}

export default Home1;