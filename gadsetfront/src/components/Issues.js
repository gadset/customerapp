import { Paper,Card, CardContent, Typography ,Accordion, AccordionDetails, AccordionSummary, Grid, CardMedia, Button, Divider, CardHeader,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import glass from '../Images/Issuepage/glass.svg'
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import click from '../Images/servicepage/clickicon.svg';
import { Link , useHistory, useLocation} from 'react-router-dom';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { setIssueValue } from '../reduxstore';
import ResponsiveAppBar from '../Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
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
  },
    card: {
      maxWidth: 500,
      margin: '0 auto',
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
    issue: {
      fontSize: 16,
      marginBottom: theme.spacing(1),
    },
    description: {
      fontSize: 14,
      color: 'gray',
      marginBottom: theme.spacing(2),
    },
    grid1 : {
        //width : '80%',
        margin : '8px'
    }
  }));
  export default function IssuePage() {
    const classes = useStyles();
    const theme = useTheme();
    const location = useLocation();
    const mod = location.state ;
    console.log(mod);
    const dispatch = useDispatch();
    const history = useHistory();
    const [arr, setArr] = useState([]);
    const [total, setTotal] = useState(0);

    const handleadd = (replacement, cost) => {
      arr.push({
        'name' : replacement,
        'cost' : cost
      });

      setTotal(total + parseInt(cost));
    }

    const handleaddissue = () => {
      dispatch(setIssueValue(arr));
      history.push({
        pathname : '/service',
        state : {model : mod , iss :  arr}
      })
    }

    const issues = [
        {
          name: 'Glass Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass
        },
        {
          name: 'Battery Replacement',
          description:
            'The battery on my device is no longer holding a charge and needs to be replaced.',
          img : glass
        },
      ];
      
  
    return (
      <Grid container className={classes.root}>
        <ResponsiveAppBar/>
        <Typography style={{ color: '#056AB5', padding:'8px', margin:'8px'}}> Select Issue </Typography>
        <Grid container spacing={2} style={{display : 'flex', justifyContent:'center', margin:4}}>
        {issues.map((issue) => (
            <Grid item md={8} xs={8} className={classes.grid1}  >
          <Card>
          <Accordion>
          
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <img src={glass} alt="Glass Replacement" />
            <Box style={{display : 'flex', flexDirection : 'column'}}>
              <Typography className={classes.issue}>{issue.name}</Typography>
              <Typography className={classes.description}>The glass on my device is cracked and needs to be replaced. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque turpis vel ligula vestibulum, quis bibendum felis semper.</Typography>
            </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-around', margin:8}}>
                <Typography>Price : 5000</Typography> <Button color='primary' onClick={()=>handleadd(issue.name, '5000')} variant='contained'> Add </Button>
                </Box>
                <Divider/>
                <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-around', margin:8}}>
                <Typography>Price : 10000</Typography> <Button color='primary' onClick={()=>handleadd(issue.name, '10000')} variant='contained'> Add </Button>
                </Box>
            </AccordionDetails>
          </Accordion>
          </Card>
          </Grid>
        ))}

<Grid item md={8} xs={8} className={classes.grid1} >
    <Card style={{backgroundColor : '#056AB5', color: '#fff', textAlign :'start', display:'flex', flexDirection:'row'}}>
        <CardContent>
            <Box style={{justifyContent : 'start'}}>
            <Typography> Searching for other repair services? </Typography>
            <Typography> Please leave a message and someone from our team will contact you!</Typography>
            </Box>
        </CardContent>
        <CardContent>
        <CardMedia  component="img"
                    sx={{ width: 50 }}
                    image={click}
                    alt='click'/>
        <Typography> Click here! </Typography>
        </CardContent>
    </Card>
    </Grid>


    <Grid item md={8} xs={8} className={classes.grid1} >
    <Card style={{textAlign :'center', display:'flex', flexDirection:'column', justifyContent:'center'}}>
       <Typography variant='h5' style={{margin:3}}> Selected Issue </Typography>
        <CardContent>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, margin:'4px' }} aria-label="simple table">
      <TableBody>
          {arr.map((row) => (
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
        {/* <Link to={{pathname:'/service', model: mod, iss : arr}}> */}
        <Button color='primary' onClick={handleaddissue} variant='contained' style={{margin:3}} >Next</Button>
        {/* </Link> */}
        </CardContent>
       
    </Card>
    </Grid>
    </Grid>

      </Grid>
    );
  }
    