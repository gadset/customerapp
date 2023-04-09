import { Button, Card, CardContent, Grid, Typography, CardMedia, Stack, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import bike from '../Images/servicepage/bike.svg';
import house from '../Images/servicepage/house.svg';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setModelValue , setIssueValue} from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    card: {
      display : 'flex',
      flexDirection :'row',
      alignItems : 'center',
      justifyContent : 'center',
      background: '#F7F4F8',
      border: '1px solid rgba(73, 73, 73, 0.5)',
boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.1)',
borderRadius: '5px',
padding : '8px'
    },
    root: {
      display :'flex',
    //  padding: "8px",
      flexDirection:'column',
    // justifyContent: "center",
      alignItems: "center",
     // textAlign: "center",
   //   margin: "16px",
     // marginLeft:'8px'
    // maxWidth: '90%'
    },
     sub:{
      //display :'flex',
       padding: "8px",
       margin : '8px',
     //  maxWidth:'80%',
        flexDirection:'column',
       // justifyContent: "center",
        alignItems: "center",
     }
  }));


  export default function ServiceType(){
    const location = useLocation();
    const mod = location.state.model ;
    console.log(mod);
    const iss = location.state.issue;
    console.log(iss)
    const classes = useStyles();
    const dispatch = useDispatch();
   // dispatch(setModelValue(mod));
   // dispatch(setIssueValue(iss));
   const history = useHistory();

   const handlenextpage = () => {
    history.push({
      pathname:'/stepper',
      state : {mod : mod, issue : iss}
    })
   }

    return(
        <Grid container className={classes.root}>
          <ResponsiveAppBar/>
          <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Service Type </Typography>
          {/* <Grid container spacing={2} className={classes.sub}>  */}
          <Box sx={{ width: '100%', margin:4}}>
          <Stack spacing={2}>
            <Grid item md={6} xs={12}>
              {/* <Link to={{pathname:'/stepper', mod : mod, issue : iss}}> */}
                <Card className={classes.card}  onClick={handlenextpage}>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={bike}
                    alt='doorstep'
                  />
                <CardContent>
                Door Step Service
                </CardContent>
                <Button color='primary' variant='contained'>Book service</Button>
                </Card>
                {/* </Link> */}
            </Grid>
            <Grid item md={6} xs={12}>
                <Card className={classes.card} >
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={house}
                    alt='doorstep'
                  />
                <CardContent>
                Store Locator
                </CardContent>
                <Button color='primary' variant='contained'>Book service</Button>
                </Card>
            </Grid>
            <Grid item md={6} xs={12}>
                <Card className={classes.card} >
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={bike}
                    alt='doorstep'
                  />
                <CardContent>
                Onsite Repair
                </CardContent>
                <Button color='primary' variant='contained'>Book service</Button>
                </Card>
            </Grid>
            </Stack>
            </Box>
            {/* </Grid> */}

        </Grid>

    )
  }