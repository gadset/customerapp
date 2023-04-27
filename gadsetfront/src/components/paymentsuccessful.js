import React from 'react';
import { makeStyles } from "@mui/styles";
import { Typography, Button, Paper } from '@mui/material/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const PaymentSuccessful = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" component="h1" className={classes.title}>
          Payment Successful
        </Typography>
        <Typography variant="subtitle1" component="p">
          Thank you for your payment. Your order has been processed and we will assign a agent soon.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => window.location.href = '/'}
        >
         Go to Home page
        </Button>
      </Paper>
    </div>
  );
};

export default PaymentSuccessful;
