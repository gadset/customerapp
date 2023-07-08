import React , {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Link , useHistory, useLocation} from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Stepper, Step, StepLabel, Slide,
  Paper, IconButton,InputBase
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import octopus from "../Images/octopus.svg";
import mobile from "../Images/mobile.svg";
import laptop from "../Images/laptop.svg";
import watches from "../Images/watches.svg";
import selectbrand from "../Images/selectbrand.svg";
import selectissue from "../Images/selectissue.svg";
import doorstep from "../Images/doorstep.svg";
import quote from "../Images/quote.svg";
import whowe from "../Images/whowe.svg";
import faq from "../Images/faq.svg";
import tablet from "../Images/tablet.svg";
import ResponsiveAppBar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import Grow from '@mui/material/Grow';
import Searchbar from "./Searchbar";


const useStyles = makeStyles({
  root: {
    display :'flex',
    //padding: "8px",
    //  flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: 'rgba(223, 213, 236, 0.15)',
    //margin: "16px",
   //marginLeft:0,
   //marginTop:0
  // maxWidth: '90%'
  },
  conta : {
    display: "flex",
      flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //alignContent:'center',
   // margin : '16px',
   width : '95%',
  },
  con: {
    display: "flex",
     // flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //alignContent:'center',
   // margin : '16px',
   //marginBottom: '16px',
  // padding: '8px',
   //backgroundColor : '#c8dee6',
  // borderRadius : '5px',
   padding: '8px',
  },
  con1: {
    display: "flex",
     // flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //alignContent:'center',
   // margin : '16px',
   //marginBottom: '16px',
   padding: '8px',
  //  backgroundColor : '#c8dee6',
  //  borderRadius : '5px'
  },
  heading : {
    color: '#056AB5',
    //fontSize : '20px',
    margin : '4px',
    padding : '4px'
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
});

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const labelProps = { style: { fontSize: '24px' } };

  const showtoast = () => {
    toast('warning', "This feature is not built yet.")
  }

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  //const isMobile = width <= 768;
  const isMobile = true;
  const handleClick = (device) => {
    if(device == 'Phone'){
      history.push({
        pathname:'/brands',
        //state : {mod : mod, issue : iss}
      })
      console.log("running")
    }
 else{
  toast("This feature is not built yet.");
 }
  }
  const devices = [
    { name: "Phone", img: mobile },
    { name: "Laptop", img: laptop },
    { name: "watches", img: watches },
    {name : "Tablet", img : tablet},
  ];

  const gadsetworks = [
    { data: "Select your device, brand and Model", img: selectbrand , label:1},
    { data: "Select issue with the device", img: selectissue,label:2 },
    { data: "See instant quotes from multiple service centers", img: quote,label:3 },
    { data: "Get Door Step Repair Services ", img: doorstep,label:4 },
  ];

  const faq1 = [
    {
      heading: "Advantages of obtaining services from this company",
      text: "Advantages of obtaining services from this company",
    },
    {
      heading: "Advantages of obtaining services from this company",
      text: "Advantages of obtaining services from this company",
    },
    {
      heading: "Advantages of obtaining services from this company",
      text: "Advantages of obtaining services from this company",
    },
  ];
  return (
    <Grid container spacing={2} sx={{ marginLeft: 0, marginTop : 0, width:'100%' }} className={classes.root}>
      <div className={classes.conta}>
      <ToastContainer />
      <Grid container spacing={2} sx={{marginTop : '8px', marginLeft:'0', width : '100%'}} className={classes.con}>
      {
      isMobile ? 
  <Searchbar/>   : <></>
    }
        <Grid item sx={{padding: '16px'}} xs={12}>
          <img src={octopus} alt="Your" style={{ width: "80%" }} />
        </Grid>
        <Grid item xs={12} spacing={2} sx={{padding: '16px'}} style={{display:'flex',justifyContent:'center',flexDirection:'column' }}>
          <Typography  style={{fontSize : '14px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '21px', fontWeight :500}}>
            Multi-Brand Online Mobile Repair in Bangalore
          </Typography>
          <Typography style={{color: '#056AB5',fontSize : '18px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '27px', fontWeight :500}}>
            Door Step Mobile Repair Service
          </Typography>
          {/* <Button variant='contained' style={{width:'200px', padding:'8px'}}>Book now</Button> */}
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.con} sx={{ marginLeft:'0', width : '100%'}} style={{ flexDirection: "column" }}>
        <Typography style={{color: '#056AB5',fontSize : '18px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '27px', fontWeight :500}}>Select Device </Typography>
        <Grid container style={{ flexDirection: "row",display:'flex',justifyContent:'center',alignItems :'center', marginTop:'8px'}}>
          {devices.map((device) => (
            <Grid item xs={5} className={classes.modelcard} onClick={() =>handleClick(device['name'])} spacing={2} style={{border: '1px solid #EFEFEF', display:'flex',justifyContent:'center', alignItems :'center', padding:'8px', margin:'8px'}}>
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
      </Grid>

      <Grid
        container
        className={classes.con1}
        spacing={2}
        sx={{marginTop : '0px', marginLeft:'0', width : '100%'}}
      >
      <Typography style={{color: '#056AB5',fontSize : '18px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '27px', fontWeight :500}} >How gadset works</Typography>{" "}
        <Grid container spacing={2} style={{ flexDirection: "row", justifyContent:'center' }}>
{/* 
        <Stepper activeStep={4} alternativeLabel>
      {gadsetworks.map((gadset, index) => (
        <Step key={index}>
          <StepLabel  completed={true} {...labelProps}>{gadset['label']}</StepLabel>
          <Typography variant="body2" color="textSecondary" component="p">
            <img src={gadset["img"]} alt={gadset["label"]} style={{ width: '120px' , height:'120px' }} />
          </Typography>
          <Typography component="div" sx={{fontSize : '25px',fontFamily:'Poppins', fontStyle:'normal'}}>
                        {gadset["data"]}
          </Typography>
        </Step>
      ))}
    </Stepper> */}
       {/* {gadsetworks.map((gadset, index) =>(
              <Grid item md={3} xs={11} sx={{padding:'16px'}} style={{alignItems :'center', justifyContent:'center'}}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding: '16px',
                    borderRadius: "5px",
                    border: "1px solid #436BB0",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100 , height:'100px' }}
                    image={gadset["img"]}
                    alt={gadset["data"]}
                  />
                    <CardContent  sx={{height:'60px' }}>
                      <Typography component="div" sx={{fontSize : '20px',fontFamily:'Poppins', fontStyle:'normal'}}>
                        {gadset["data"]}
                      </Typography>
                    </CardContent>
                </Card>
                </Slide>
              </Grid>
))} */}


          {gadsetworks.map((gadset, index) =>
            index % 2 == 0 ? (
              <Grid item xs={11}  style={{alignItems :'center', justifyContent:'center',}}>
                <Card
                  sx={{
                    display: "flex",
                    padding: 1,
                    height: "12vh",
                    border: '1px solid #436BB0',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
borderRadius: '30px',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={gadset["img"]}
                    alt={gadset["data"]}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '24px', fontWeight :500}}>
                        {gadset["data"]}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={11} style={{alignItems :'center', justifyContent:'center'}}>
                <Card
                  sx={{
                    display: "flex",
                    padding: 1,
                    height: "12vh",
                    border: '1px solid #436BB0',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
borderRadius: '30px',
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography style={{color: '#056AB5',fontSize : '16px',fontFamily:'Poppins', fontStyle:'normal', marginBottom:'8px',lineHeight : '24px', fontWeight :500}} >
                        {gadset["data"]}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={gadset["img"]}
                    alt={gadset["data"]}
                  />
                </Card>
              </Grid>
            )
          )}
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.con1}
          spacing={2}
          sx={{marginTop : '0', marginLeft:'0', width : '100%'}}
        >
            <Typography style={{color: '#056AB5',fontSize : '20px',fontFamily:'Poppins', fontStyle:'normal',lineHeight : '30px', fontWeight :400}}> Who Are We ?</Typography>
            <img src={whowe} alt="whowe" sx={{height:'80px'}} />{" "}
          <Grid item  sx={{padding:'16px'}} style={{ textAlign: "left" }}>
            <Typography>
              Koramangala, Bangalore. specialized in repairing iPad, Macbook,
              Laptop, and Mobile. We are a small startup specialized in mobile
              screen repair and water damage repair focused more on quality than
              quantity.
              <br></br>
              <br></br>
              Gadset is run by a group of engineers who are focused on providing
              the best possible experience to our customers at their doorstep.
              <br></br>
              <br></br>
              We are a mobile & Laptop repair service center near your area in
              Bangalore which is also focused on developing skilled technicians
              so we know what we are doing.
              <br></br>
              <br></br>
              If you have any questions, please do not hesitate to contact us.
              We want our customers to be happy and we go to great measures to
              ensure it.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          className={classes.con}
          sx={{marginTop : '8px', marginLeft:'0', width : '100%', display:'flex', flexDirection:'column'}}
        >
          <Typography style={{color: '#056AB5',fontSize : '20px',fontFamily:'Open Sans', fontStyle:'normal',lineHeight : '27px', fontWeight :600}} > FAQ ?</Typography>
          <img src={faq} alt="faq" />
          <Grid container spacing={2} style={{ justifyContent:'center' }}>
          {faq1.map((fa, index) => (
            <Grid item xs={11} sx={{paddingLeft:'0'}}>
              <Accordion
                style={{
                  borderRadius: "20px",
                  border: "1px solid #056AB5",
                  textAlign: "left",
                  zIndex: -1,
                  background: '#F7F4F8'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{fa["heading"]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{fa["text"]}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
          </Grid>
        </Grid>
        </div>
      </Grid>
  );
};

export default HomePage;
