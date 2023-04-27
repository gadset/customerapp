import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { Card, CardMedia, Grid, Typography,Pagination } from '@mui/material';
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
 justifyContent: "center",
    alignItems: "center",
   // textAlign: "center",
 //   margin: "16px",
   // marginLeft:'8px'
  // maxWidth: '90%'
  },
card1 :{
  width : '300px',
  display:'flex',
  flexDirection:'column',
  alignItems : 'center',
  justifyContent:'center',
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
    const [rowsPerPage, setRowsPerPage] = useState(9);
  
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
      const response = await fetch('http://localhost:8000/search?phone=' + brand, {
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
    <Grid container className={classes.root}>
      <ResponsiveAppBar/>
      <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Model </Typography>
      <Grid container spacing={2} style={{padding:'8px'}}>
    {
        phones.length > 0 ? 
       slicedData.map((model, i)=> (
      
        <Grid item md={3} xs={6} style={{ display:'flex',justifyContent:'center', alignItems :'center', margin:3,}}>
            {/* <Link to={{pathname:'/selectissue', 
          state : model}}> */}
        <Card className={classes.card1}  elevation={1} onClick={() =>handlemodelclick(model)}>
        
        <CardMedia image={model['img']}
                  title={model['name']}
                 sx={{ height: '120px', width:'120px'}} />
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
    </Grid>

)
}

export default Brand;