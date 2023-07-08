import { useTheme } from '@emotion/react';
import { Box, Typography, Grid, Stack, Button } from '@mui/material';
import React, { Component } from 'react'
import { useState } from 'react';
import { Watch } from  'react-loader-spinner'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    filterbutton : {
        fontSize : '15px'
    }
})

const Getquotes = () => {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    return(
<Box sx={{marginTop:'8px', display:'flex', flexDirection : 'column', alignItems:'center'}}>
    {
        show ? <Grid>
              <Typography variant='h4' sx={{margin :'4px'}}>Getting Quote's</Typography>
    <Watch
  height="80"
  width="80"
  radius="48"
  color= {theme.palette.primary.main}
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
        </Grid>
        : 
        <Box sx={{width:'90%', display:'flex', justifyContent:'center', flexDirection :'column', alignItems:'center'}}>
            <Typography variant='h4'>Quote's</Typography>
            <Stack sx={{marginTop:'8px'}} spacing={1} direction="row">
            <Button sx={{fontSize:'10px',}} endIcon={<ArrowDropUpIcon/>}>
                warranty
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                price
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                ratings
            </Button>
            <Button sx={{fontSize:'10px'}} endIcon={<ArrowDropUpIcon/>}>
                distance
            </Button>
            </Stack>

        <Grid container spacing={3} sx={{ marginTop:'10px',width:'100%', marginLeft:'0'}} >
            <Grid sx={{height: '200px', width:'100%', backgroundColor:theme.palette.background.main, margin:'8px' }}></Grid>
            <Grid sx={{height: '200px', width:'100%', backgroundColor:theme.palette.background.main, margin:'8px' }}></Grid>
        </Grid>
        </Box>
    }
  
</Box>
    )
}

export default Getquotes;