import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {DesktopTimePicker} from "@mui/x-date-pickers/DesktopTimePicker";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setDateValue } from "../reduxstore";

const DateTimePickerPage = ({onDate, handlenextpage}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedDate,
      selectedTime,
    });

    console.log(selectedDate.getDate());
    console.log(selectedDate.getMonth());
    console.log(selectedDate.getFullYear());
  //  console.log(selectedDate.gett());
  };

  const handlenext = () => {
    const data = {
      'date' : selectedDate.getDate()+'/' + selectedDate.getMonth() + '/' +  selectedDate.getFullYear() ,
      'time' : selectedTime,
    }
    onDate(data);
    dispatch(setDateValue(data));
    handlenextpage();
  }
  return (
    <Grid container sx={{marginLeft: 0, marginTop : '10px', width: "100%", display:'flex', flexDirection:'column', alignItems:'center' , marginBottom: '16px',}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Date and Time
      </Typography>

        <Grid container spacing={2} sx={{ width:'80%',padding: '8px',
    backgroundColor : '#c8dee6',
    borderRadius : '10px' }}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                value={selectedDate}
                minDate={new Date()}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                label="Select Time"
                value={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {format(selectedTime, "hh:mm a")}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button type="submit" onClick={handlenext} variant="contained">
            Next
          </Button>
        </Box>

    </Grid>
  );
};

export default DateTimePickerPage;
