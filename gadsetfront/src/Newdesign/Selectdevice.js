import { MenuItem, Typography, Grid , Button} from '@mui/material';
import { styled } from '@mui/system';
import { TextField, IconButton, Box } from '@mui/material';
import {InputAdornment} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react';
import SearchComponent from './Searchcomponent';
import apple from '../logos/apple.svg';
import mi from '../logos/mi.svg';
import motorola from '../logos/motorola.svg';
import nothing from '../logos/nothing.svg';
import oneplus from '../logos/oneplus.svg';
import oppo from '../logos/oppo.svg';
import poco from '../logos/poco.svg';
import realme from '../logos/realme.svg';
import samsung from '../logos/samsung.svg';
import vivo from '../logos/vivo.svg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import { setMobileValue, setModelValue } from '../reduxstore';
import { useDispatch } from 'react-redux';

const StyledTextField = styled(TextField)`
  background-color: #D9D9D9;
  border-radius: 5px;
`;
const Selectdevice = () => {
    const history = useHistory();
    const [brand, setBrand]= useState("");
    const [devices, setDevices] = useState([]);
    const [devicearray, setDevicearr]= useState([]);
    const [phone,setPhone] = useState('');
    const dispatch = useDispatch();
    const handleChangebrand = (e) => {
      setBrand(e.target.value);
      const dbRef = ref(getDatabase());
        get(child(dbRef, brand)).then((snapshot) => { 
          if (snapshot.exists()) {
            setDevices(snapshot.val());    
            setDevicearr(Object.keys(snapshot.val()))  ;        //console.log(data)
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    
    const data1 = [
        {"name" : "apple" , "logo" : apple},
        {"name" : "Xiaomi", "logo" :mi },
        {"name" : "Motorola", "logo" :motorola },
        {"name" : "Nothing" , "logo" : nothing},
        {"name" : "OnePlus", "logo" : oneplus },
        {"name" : "Oppo", "logo" : oppo},
          {"name" : "Poco", "logo" : poco},
          {"name" : "Realme" , "logo" : realme },
          {"name" : "samsung", "logo" :samsung },
          {"name" : "Vivo", "logo" :vivo },

    ]

    const handleDeviceSelected = () =>{
      dispatch(setModelValue(phone));
      history.push('/issuepage')
    }
    return(
        <Grid container sx={{display:'flex', justifyContent:'center', textAlign:'left', marginTop:'10px'}}>
            <Grid item sx={{width:'90%', margin:'4px'}}>
                <Typography variant='h4'>Select Brand</Typography>
            <StyledTextField
          label=""
          select
          placeholder="Search your brand"
          fullWidth
          value={brand}
          onChange={(e) => handleChangebrand(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchOutlinedIcon sx={{color:'#000',fontSize:'30px'}}/>
                </IconButton>
              </InputAdornment>
            ),
          }}>
            {
                data1.map((brand1) => (
                    <MenuItem key={brand1.name} value={brand1.name}>
                        {brand1.name}
                    </MenuItem>
                ))
            }

            </StyledTextField>
            </Grid>

            <Grid item item sx={{width:'90%', margin:'4px'}}>
            <Typography variant='h4'>Select Device</Typography>
            <StyledTextField
          label=""
          select
          placeholder="Search your device"
          fullWidth
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchOutlinedIcon sx={{color:'#000',fontSize:'30px'}}/>
                </IconButton>
              </InputAdornment>
            ),
          }}>
            {
                devicearray.map((brand1) => (
                    <MenuItem key={brand1} value={brand1}>
                        {brand1}
                    </MenuItem>
                ))
            }

            </StyledTextField>
            </Grid>
        
          <Button sx={{padding:'4px', width:'150px', marginTop:'8px'}} onClick={() => handleDeviceSelected()}>Submit</Button>
        </Grid>
    )
}


export default Selectdevice;