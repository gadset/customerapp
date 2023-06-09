import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  StepContent, StepConnector
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddressForm from "./Address";
import DateTimePickerPage from "./DateTime";
import PriceSummary from "./Summary";
import Payment from "./payment";
import { Link , useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ResponsiveAppBar from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

// function getSteps() {
//   return ["Address", "Date & Time", "Order Summary", "Payment"];
// }

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <DateTimePickerPage />;
//     case 2:
//       return <PriceSummary />;
//     case 3:
//       return <Payment />;
//     default:
//       return "Unknown stepIndex";
//   }
// }

export default function StepperForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  ///const steps = getSteps();
  const location = useLocation();
  //const model = location.model;
  //const issue = location.issue;
  //console.log(issue);
  const model1 = useSelector((state) => state.model.value)
  const issues1 = useSelector((state) => state.issues.value)
  console.log(model1);
  console.log(issues1);
  const [address, setAddress] = useState({});
  const [Datetime, setDate]= useState({});

  const handleData = (data) => {
    setAddress((prevdata) => ({...prevdata, ...data}));
    console.log(data);
  }

  const handleDatetime = (date) => {
    setDate((prevdata) => ({...prevdata, ...date}));
    console.log(date)

  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: 'Add Address',
      component: <AddressForm onData={handleData} />,
    },
    {
      label: 'Date and Time',
      component: <DateTimePickerPage onDate={handleDatetime}/>,
    },
    {
      label: 'Price Summary',
      component: <PriceSummary model={model1} issue={issues1} addres={address} datetime={Datetime} />,
    },
    {
      label : 'Payment',
      component :<Payment/>
    }
  ];


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <AddressForm onData={handleData} handlenextpage={handleNext} />
      case 1:
        return <DateTimePickerPage onDate={handleDatetime} handlenextpage={handleNext}/>;
      case 2:
        return <PriceSummary handlenextpage={handleNext} />;
      case 3:
        return <Payment />;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className={classes.root}>
      <ResponsiveAppBar/>
      <Stepper activeStep={activeStep} alternativeLabel connector={<StepConnector />}>
        {steps.map((step,index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
               <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
