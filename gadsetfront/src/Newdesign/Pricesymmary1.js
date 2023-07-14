import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button , Card, CardMedia, CardContent,IconButton
 ,FormControl, RadioGroup, Radio} from "@mui/material";
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import address from '../Images/summarypage/address.svg';
import calendar from '../Images/summarypage/calendar.svg';
import { Edit } from '@mui/icons-material';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { makeStyles, withStyles } from "@mui/styles";
import MuiTableCell from "@mui/material/TableCell";

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

export default function PriceSummary1({handlenextpage, delivery}){
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
  const mobile = useSelector((state) => state.mobile.value);
  const image = useSelector((state)=>state.image.value);
  const history = useHistory();
 // console.log(address1);
 const [width, setWidth] = useState(window.innerWidth);
 //const isMobile = width <= 768;
 const isMobile = true;
  const [isChecked, setIsChecked] = useState(false);

  const [value, setValue] = React.useState('online');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleclickedit = () => {
    history.push({
      pathname : '/brands',
    })
  }

 const handleclicked = () => {
  handlenextpage();
 }

 const handletotal = (e) => {
  total = total + e;
 }
  const tip = ['50', '100', '500'];
    //const Issues = issue;
    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += Number(issues1[i]['cost']);
      }
    const gst = Math.ceil(total/10) ;
    total = gst + total;
    return(
        <Grid container spacing={2} sx={{width:'100%', display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center', padding:'8px', marginLeft: 0, marginTop : '10px',}}>
            <Typography variant="h4">Price Summary </Typography>
        


        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%'}}>
            <Typography variant="h4">{model1}</Typography>
            <Typography variant="body1">Rs.14999</Typography>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%', mt:2}}>
            <Typography variant="body1">Promo</Typography>
            <Typography variant="body1">Apply</Typography>
        </Box>
        <Divider sx={{width :'80%', m:1}}/>
        <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', width:'80%'}}>
            <Typography variant="h4">{model1}</Typography>
            <Typography variant="body1">Rs.14999</Typography>
        </Box>

        
            <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
        label="I accept the terms and conditions"
      />

      <Divider sx={{width:'80%', m:2}}/>
      <Box sx={{display:'flex',justifyContent:'start',flexDirection:'column',width:'100%'}}>
<Typography variant="body1">Select payment method</Typography>
      <FormControl>
      <RadioGroup
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="online" sx={{background: '#FBFBFB',
        boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', marginTop:'4px', alignSelf:'center', width:'80%', mb:1}} control={<Radio />} label="Pay total online" />
        <FormControlLabel sx={{background: '#FBFBFB',
boxShadow:' 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px', marginTop:'4px',  alignSelf:'center', width:'80%', mb:1}} value="later" control={<Radio />} label="Pay later" />
      </RadioGroup>
    </FormControl>
    </Box>
            <Button type="submit" variant="contained" color="primary" onClick={handlenextpage} disabled={!isChecked} >
        Book Service
      </Button>
        </Grid>
    )
}