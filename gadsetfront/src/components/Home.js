import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
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

const useStyles = makeStyles({
  root: {
    display :'flex',
    padding: "8px",
    //  flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
  con: {
    display: "flex",
    //  flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    //alignContent:'center',
    margin : '16px',

  },
  heading : {
    color: '#056AB5',
    //fontSize : '20px',
    margin : '8px'
  }
});

const HomePage = () => {
  const classes = useStyles();
  const devices = [
    { name: "Phone", img: mobile },
    { name: "Laptop", img: laptop },
    { name: "watches", img: watches },
    {name : "Tablet", img : tablet},
  ];

  const gadsetworks = [
    { label: "Select your device, brand and Model", img: selectbrand },
    { label: "Select issue with the device", img: selectissue },
    { label: "See instant quotes from multiple service centers", img: quote },
    { label: "Get Door Step Repair Services ", img: doorstep },
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
    <Grid container spacing={2} className={classes.root}>
      <ResponsiveAppBar/>
      <Grid container className={classes.con} style={{ flexDirection: "row" }}>
        <Grid item xs={12} md={6}>
          <img src={octopus} alt="Your" style={{ width: "80%" }} />
        </Grid>
        <Grid item xs={12} md={6} style={{  justifyContent:'center' }}>
          <Typography variant="h6" align="left">
            Multi-Brand Online Mobile Repair in Bangalore
          </Typography>
          <Typography variant="h5" align="left">
            Door Step Mobile Repair Service
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.con} style={{ flexDirection: "column", margin:'8px' }}>
        <Typography variant="h5" className={classes.heading}> Select Device </Typography>
        <Grid container spacing={2} style={{ flexDirection: "row",display:'flex',justifyContent:'center',alignItems :'center', marginTop:8}}>
          {devices.map((device) => (
            <Grid item xs={5} md={2} style={{border: '1px solid #EFEFEF', background: 'rgba(223, 213, 236, 0.15)', display:'flex',justifyContent:'center', alignItems :'center', margin:3}}>
              <Card elevation={0} style={{ background: 'rgba(223, 213, 236, 0.15)',}}>
                <CardMedia
                  image={device["img"]}
                  title={device["name"]}
                 sx={{ height: '100px', width:'100px'}}
                />
                <CardContent>
                  <Typography>{device["name"]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.con}
        style={{ flexDirection: "column" }}
      >
        <Grid item>
          <Typography variant="h5" className={classes.heading}>How gadset works</Typography>{" "}
        </Grid>
        <Grid item container spacing={2} style={{ flexDirection: "row", justifyContent:'center' }}>
          {gadsetworks.map((gadset, index) =>
            index % 2 == 0 ? (
              <Grid item md={5} xs={11}  style={{alignItems :'center', justifyContent:'center'}}>
                <Card
                  sx={{
                    display: "flex",
                    padding: 1,
                    minHeight: "10vh",
                    borderRadius: "5px",
                    border: "1px solid #436BB0",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={gadset["img"]}
                    alt={gadset["label"]}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="p">
                        {gadset["label"]}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ) : (
              <Grid item md={5} xs={11} style={{alignItems :'center', justifyContent:'center'}}>
                <Card
                  sx={{
                    display: "flex",
                    padding: 1,
                    minHeight: "10vh",
                    borderRadius: "5px",
                    border: "1px solid #436BB0",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="p">
                        {gadset["label"]}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={gadset["img"]}
                    alt={gadset["label"]}
                  />
                </Card>
              </Grid>
            )
          )}
          </Grid>
        </Grid>

        <Grid
          container
          className={classes.con}
          style={{ flexDirection: "column" }}
        >
          <Grid item>
            <Typography variant="h5" className={classes.heading}> Who Are We ?</Typography>
          </Grid>
          <Grid item>
            <img src={whowe} alt="whowe" />{" "}
          </Grid>
          <Grid item style={{ textAlign: "left" }}>
            <Typography>
              Koramangala, Bangalore. specialized in repairing iPad, Macbook,
              Laptop, and Mobile. We are a small startup specialized in mobile
              screen repair and water damage repair focused more on quality than
              quantity.
              <br></br>
              Gadset is run by a group of engineers who are focused on providing
              the best possible experience to our customers at their doorstep.
              <br></br>
              We are a mobile & Laptop repair service center near your area in
              Bangalore which is also focused on developing skilled technicians
              so we know what we are doing.
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
          style={{ flexDirection: "column" }}
        >
          <Typography variant="h5" className={classes.heading}> FAQ ?</Typography>
          <img src={faq} alt="faq" />
          {faq1.map((fa, index) => (
            <Grid item md={7} xs={11}>
              <Accordion
                style={{
                  borderRadius: "5px",
                  border: "1px solid #056AB5",
                  textAlign: "left",
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
  );
};

export default HomePage;
