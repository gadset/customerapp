import { Button, Card, CardContent, Grid, Typography, CardMedia, Stack, Box, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import bike from '../Images/servicepage/bike.svg';
import house from '../Images/servicepage/house.svg';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setModelValue , setIssueValue, setImageValue} from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';
import { useState } from 'react';
import PhoneSignUp from '../Login/PhoneSignup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const useStyles = makeStyles((theme) => ({
    card: {
      display : 'flex',
      flexDirection :'row',
      alignItems : 'center',
      
    },
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
    width:'80%'
    },
     sub:{
      //display :'flex',
       padding: "8px",
       margin : '8px',
     //  maxWidth:'80%',
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
     },
     modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));


  export default function ServiceType(){
    const location = useLocation();
   // const mod = location.state.model;
   // const iss = location.state.iss;
    const total = location.state.total;
   // const price = location.state.price;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(true);
  //  dispatch(setModelValue(mod));
  //  dispatch(setIssueValue(iss));
  //  dispatch(setImageValue(price['image']));
   const history = useHistory();

   const handleCloseModal = () => {
    setModalOpen(false);
   }

   const handlenextpage = () => {
    history.push({
      pathname:'/stepper',
      state : {total:total}
    }) ;
   }

   const [value, setValue] = useState('');

   const handleChange = (event) => {
     setValue(event.target.value);
   };

    return(
        <Grid container className={classes.root}>
          <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Service Type </Typography>
          {/* <Grid container spacing={2} className={classes.sub}>  
          <Modal 
           className={classes.modal}
           open={modalOpen}
           onClose={handleCloseModal}>
            <PhoneSignUp/>
          </Modal>
     */}
          <Grid container spacing={2} className={classes.sub}>
  
            <Grid item md={7} xs={12}>
              {/* <Link to={{pathname:'/stepper', mod : mod, issue : iss}}> */}
                <Card className={classes.card} sx={{background:' #FBFBFB',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px'}} 
onClick={handlenextpage}>
                <Radio
        onChange={handleChange}
        value="Doorstep"
        name="radio-buttons"
      />
       <CardContent>
                Door Step Service
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{width: '86px' }}
                    image={bike}
                    alt='doorstep'
                  />
               
                </Card>
                {/* </Link> */}
            </Grid>
            <Grid item md={7} xs={12}>
                <Card className={classes.card} sx={{background:' #FBFBFB',
boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 4px 4px rgba(0, 0, 0, 0.1)',
borderRadius: '20px'}}
 onClick={handlenextpage} >
                <Radio
        onChange={handleChange}
        value="store locator"
        name="radio-buttons"
      />
      <CardContent>
                Store Locator
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: '86px' }}
                    image={house}
                    alt='doorstep'
                  />
                
                </Card>
            </Grid>
            </Grid>

            {/* </Grid> */}
         

        </Grid>

    )
  }