import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, Typography } from '@mui/material';

//const catalog = require('../../src/catalog');

function App() {
  //var devices ;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://8000-patnala1-gadset-93t7fxzgg3x.ws-us87.gitpod.io');
      const json = await response.json();
      setData(json);
      console.log(data);
    }

    fetchData();
  }, []);

  return (
   <Grid container spacing={2}>
    {
      data.map((device, index) => (
        <Grid item md={3}> 
        <Card>
        <Typography>{device.name}</Typography>
        </Card>
        </Grid>

      ))
    }
   </Grid>
  );
}

export default App;
