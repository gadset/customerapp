import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Brands from "./components/Brands";
import Cashify from "./components/Cashify";
import HomePage from "./components/Home";
import Repair from "./components/Repair";
import ResponsiveAppBar from "./Navbar/Navbar";
import SelectPhone from "./Select";
import Brand from "./components/Brand";
import IssuePage from "./components/Issues";
import ServiceType from "./components/Servicetype";
import AddressForm from "./components/Address";
import DateTimePickerPage from "./components/DateTime";
import StepperForm from "./components/Stepper";
export default function App() {
  return (
    <Router>
      <center>
       <div className="App" style={{justifyContent:'center'}}>
        
        {/* <nav>
          <ul>
            <li>
              <Link to="/select">select</Link>
            </li>
            <li>
              <Link to="/repair">repair</Link>
            </li>
            <li>
              <Link to="/cashify">cashify</Link>
            </li>
            <li>
              <Link to="/navbar">navbar</Link>
            </li>
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link to="/brands">brand</Link>
            </li>
            <li>
            <Link to="/selectissue">select issue</Link>
            </li>
            <li>
            <Link to="/service">service</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route path="/about">
           <SelectPhone/>
          </Route>
          <Route exact path ='/'>
            <HomePage/>
          </Route>
          <Route path="/repair">
            <Repair/>
          </Route>
          <Route path="/cashify">
           <Cashify/>
          </Route>
          <Route path='/navbar'>
          <ResponsiveAppBar/>
          </Route>
          <Route path='/brands'>
         <Brands/>
          </Route>
          <Route path='/brand/:id'>
         <Brand/>
          </Route>
          <Route path='/selectissue'>
        <IssuePage/>
          </Route>
          <Route path='/service'>
        <ServiceType/>
          </Route>
          <Route path='/address'>
            <AddressForm/>
          </Route>
          <Route path='/datetime'>
            <DateTimePickerPage/>
          </Route>
          <Route path='/stepper'>
            <StepperForm/>
          </Route>
        </Switch>
      </div> 
      </center>
     
   </Router>
  );
}