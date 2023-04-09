import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { Card, Grid, Typography } from '@mui/material';
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setModelValue } from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';
import { makeStyles } from "@mui/styles";

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

const Brand = () => {
    const location = useLocation()
    const brand = location.state ;
    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
   

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, brand)).then((snapshot) => {
            if (snapshot.exists()) {
              setData(snapshot.val());
              console.log(data)
              //console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
      }, []);

    const handlemodelclick = (model) => {
dispatch(setModelValue(model));
history.push({
  pathname : '/selectissue',
  state : model
})
    }


return(
    <Grid container className={classes.root}>
      <ResponsiveAppBar/>
      <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Model </Typography>
      <Grid container spacing={2} style={{padding:'8px'}}>
    {
        data ? 
       Object.keys(data).map((model, i)=> (
      
        <Grid item md={3} xs={5} style={{margin:3}}>
            {/* <Link to={{pathname:'/selectissue', 
          state : model}}> */}
        <Card className={classes.card1}  elevation={1} onClick={() =>handlemodelclick(model)}>
        <Typography> {model}-- </Typography>
            <Typography> {data[model].color}</Typography>
            <Typography> {data[model].screen['discounted']}</Typography>
            </Card>
            {/* </Link> */}
            </Grid>
        
        ))
        :
        <></>
    }
    </Grid>
    </Grid>

)
}

export default Brand;