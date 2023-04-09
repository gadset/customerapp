import { Grid, Typography, Paper, Divider, Stack, Chip, Checkbox, FormControlLabel, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from "react-redux";
import address from '../Images/summarypage/address.svg';
import calendar from '../Images/summarypage/calendar.svg';

export default function PriceSummary({handlenextpage}){
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  const address1  = useSelector((state) => state.address.value)
  const date1 = useSelector((state)=> state.date.value);
 // console.log(address1);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

 const handleclicked = () => {
  handlenextpage();
 }
  const tip = ['50', '100', '500'];
    //const Issues = issue;
    var total = 0;
    for (let i = 0; i < issues1.length; i++) {
       total += issues1[i]['cost'];
      }
    const gst = total/10 ;
    return(
        <Grid container sx={{display:'flex', flexDirection:'column', margin:'8px', padding:'8px'}}>
            <Typography variant="h5">Price Summary</Typography>
            <Typography>Selected Device : {model1}</Typography>
            <Grid item>
                <Typography variant="h6"> Selected Issue </Typography>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
      <TableBody>
          {issues1.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
          <TableRow key='gst'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                GST/CGST
              </TableCell>
              <TableCell align="right">{gst}</TableCell>
              </TableRow>
          <Divider/>
<TableRow key='total'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">{total}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <Grid item>
      <Typography>Add tip to the technician</Typography>
      <Stack direction="row" spacing={2}>
        {
          tip.map((t, index) => (
            <Chip label={t}/>
          ))
        }

      </Stack>
    </Grid>

    <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
        label="I accept the terms and conditions"
      />
    
    <Grid item>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={address} alt="address icon" />
        <div>
        <Typography>{address1['name']}, {address1['phone']}, {address1['flat']} </Typography>
        <Typography>{address1['city']}, {address1['landmark']}, {address1['pin']}</Typography>
        </div>
      </Box>
    </Grid>

    <Grid item>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <img src={calendar} alt="address icon" />
        <div>
        <Typography>{date1['date']} </Typography>
        </div>
      </Box>
    </Grid>
    
            </Grid>
            <Button type="submit" variant="contained" color="primary" onClick={handlenextpage} disabled={!isChecked}>
        Next
      </Button>
        </Grid>
    )
}