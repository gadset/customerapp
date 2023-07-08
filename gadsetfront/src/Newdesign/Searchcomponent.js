import React from 'react';
import { styled } from '@mui/system';
import { TextField, IconButton, Box } from '@mui/material';
import {InputAdornment} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const StyledTextField = styled(TextField)`
  background-color: #D9D9D9;
  border-radius: 5px;
`;

const SearchComponent = ({label, placeholder}) => {
    return (
      <Box sx={{width:'95%', alignSelf:'center'}}>
        <StyledTextField
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchOutlinedIcon sx={{color:'#000',fontSize:'20px'}}/>
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
      </Box>
    );
  };
  
  export default SearchComponent;