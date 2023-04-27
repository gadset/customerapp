import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { Card, CardMedia, Grid, Typography,Pagination } from '@mui/material';
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setModelValue } from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';
import { makeStyles } from "@mui/styles";
import Loader from "react-js-loader";

const useStyles = makeStyles({
  root: {
    display :'flex',
  //  padding: "8px",
    flexDirection:'column',
 justifyContent: "center",
    alignItems: "center",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
card1 :{
  width : '250px',
  display:'flex',
  flexDirection:'column',
  alignItems : 'center',
  justifyContent:'center',
  padding:'8px',
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
    const [phones, setphone]= useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const slicedData = phones.slice(startIndex, endIndex);

    async function handleselectdevice(){
      const response = await fetch('http://172.31.8.120:8000/search?phone=' + brand, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
         
        });
        const json = await response.json();
        console.log(json)
        setphone(json);
        
        //console.log(phonelast)
    }
   

    useEffect(() => {
      handleselectdevice();
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
dispatch(setModelValue(model['name']));
history.push({
  pathname : '/selectissue',
  state : model['name']
})
    }


return(
    <Grid container spacing={2}  sx={{ marginLeft: 0, marginTop : '10px' }} className={classes.root}>
      {phones.length > 0 ? <div style={{width:'80%', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px', textAlign:'left'}}>Select Model </Typography>
      <Grid container spacing={2} style={{padding:'8px', margin:'8px', alignItems :'start', display:'flex'}}>
    {
        phones.length > 0 ? 
       slicedData.map((model, i)=> (
      
        <Grid item md={2} xs={6} style={{ display:'flex',justifyContent:'center', alignItems :'center', margin:3,}}>
            {/* <Link to={{pathname:'/selectissue', 
          state : model}}> */}
        <Card className={classes.card1}  elevation={3} onClick={() =>handlemodelclick(model)}>
        
        <CardMedia
        component="img"
         image={model['img']}
                  title={model['name']}
                 sx={{ height: '100px', width:'80px'}} 
                />
            <Typography> {model['name']}</Typography>
            </Card>
            {/* </Link> */}
            </Grid>
        
        ))
        :
        <></>
    }
    </Grid>
    <Pagination
        count={Math.ceil(phones.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
      </div> :
       <Loader type="spinner-circle" bgColor={"#056AB5"} title={"Loading Models"} color={'#056AB5'} size={100} /> }

    </Grid>

)
}

export default Brand;