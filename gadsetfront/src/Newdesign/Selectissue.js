import React, {useState} from 'react';
import glass2 from '../Images/Issuepage/glass1.jpeg';
import battery from '../Images/Issuepage/battery1.jpeg';
import { Grid, Card, Typography, CardMedia, CardContent, Box,Button, Modal } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
    cardpre: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textAlign:'left',
        background : '#E3E3E3',
        marginBottom : '0px',
      },
      media: {
      //  height: 250,
        //width: 250,
        marginRight: '4px',
      },
      description1: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 3,
        lineHeight: 1.5,
      },
      button1: {
       width :'100%',
       height:'25px'
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection :'column',
      },
      paper: {
        backgroundColor: '#ffffff',
        padding:'16px',
        maxWidth: '90vw',
        maxHeight : '90vh',
        overflowY : 'auto',
        textAlign:'left',
        position:'absolute',
        bottom:0,
      },
})

const SelectIssue = () => {
    const classes = useStyles();
    const history = useHistory();
    const [issuearray, setissuearray] = useState([]);
    const [open, setOpen] = useState(false);

    const handleAddIssue = (issuename) => {
      setOpen(true);
      issuearray.push(issuename);
    }
    const issues1 = [
        {
          name: 'Glass Replacement and also many other to follow',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass2,
        },
        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : battery,

        },
        {
          name: 'Glass Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : glass2,

        },
        {
          name: 'Battery Replacement',
          description:
            'The glass on my device is cracked and needs to be replaced.',
          img : battery,
        },
       ]
    return(
        <Box sx={{marginTop:'8px', marginBottom:'50px'}}>
            <Typography variant='h4'>Select Issue</Typography>
<Grid container sx={{display:'flex', justifyContent:'center'}}>
    
{
            issues1.map((issue) => (
              <Grid item xs={5} sx={{paddingLeft:'0px', margin:'8px',}}>
              <Card className={classes.cardpre} sx={{borderRadius : '0px'}}>
                  <CardMedia
                    className={classes.media}
                    sx={{height:'120px', width:'100%'}} 
                    image={issue['img']}
                    title="Image"
                  />
                  <CardContent sx={{padding:'4px'}}>
                    <Typography variant='h5' sx={{WebkitLineClamp:2, wordWrap: 'breakword'}} noWrap>
                      {issue['name']}
                    </Typography>
                    <Typography
                  variant="body1"
                  className={classes.description1}
                  sx={{ WebkitLineClamp: 3}}
                  style={{color: '#0494949',fontSize : '15px',fontStyle:'normal',lineHeight : '20px', fontWeight :400, marginTop:'1px'}}
                >
                  {issue['description']}
                </Typography>
                  </CardContent>
                
                
                    <Button className={classes.button1} onClick={()=> handleAddIssue(issue['name'])} sx={{borderRadius:'0px'}}>Add</Button>
            </Card>
            </Grid>
            ))
          }
</Grid>

       {
        open ?  <Grid container sx={{display:'flex', justifyContent:'center'}}>{
          issuearray.map((isue)=>(
            <Grid item>
              <Typography variant='body1'>{isue}</Typography>
            </Grid>
          ))
        }
        <Button onClick={() => history.push('/preference')}>Get quotes</Button>
        </Grid>
        : <></>
       }  

</Box>
    )
}


export default SelectIssue;