import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddressValue } from "../reduxstore";

const AddressForm = ({onData, handlenextpage}) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      mobileNumber,
      pinCode,
      flatNumber,
      landmark,
      city,
    });
  };

  const handlenext = () => {
    const data = {
      'name' : name,
      'phone': mobileNumber,
      'pin' : pinCode,
      'flat' : flatNumber,
      'landmark' : landmark,
      'city' : city,
    };
    onData(data)
    dispatch(setAddressValue(data));
    handlenextpage();

  }
  return (
    <Box sx={{ width: "100%", display:'flex', justifyContent:'center', flexDirection:'column' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
       Add your Address
      </Typography>
      <Button>Use my current location</Button>
      <Divider/>
      <Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Name</Typography>
            <TextField
              variant="outlined"
              required
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Mobile Number</Typography>
            <TextField
              variant="outlined"
              required
              
              id="mobileNumber"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Pin Code</Typography>
            <TextField
              variant="outlined"
              required
              
              id="pinCode"
              name="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>
              Flat, House no., Building, Company, Apartment
            </Typography>
            <TextField
              variant="outlined"
              required
              
              id="flatNumber"
              name="flatNumber"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Landmark (Optional)</Typography>
            <TextField
              variant="outlined"
              
              id="landmark"
              name="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>City</Typography>
            <TextField
              variant="outlined"
              required
              
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} variant="contained">
            Add address
          </Button>
        </Box>
      </form>
      </Grid>
    </Box>
  );
};

export default AddressForm;
