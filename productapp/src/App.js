import logo from './logo.svg';
import './App.css';
import { PostAdd } from '@mui/icons-material';
import Postbid from './components/postbidding';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LoginForm from './components/signinpage';
import Demo from './components/getlocation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc ,getDocs} from "firebase/firestore"; 
import { firestoredb } from '.';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const auth= getAuth();
  var user;
  useEffect(()=>{
    user = auth.currentUser;
  //  console.log(auth['currentUser']);
    if(user) {
      const uid = user.uid;
      console.log("hello");  
    }
  }, [])

  return (
    <Router>
    <div className="App">
      <ToastContainer/>
    <Route
                exact
                path="/"
                render={() => {
                    return (
                      user ?
                      <Redirect to={{
                        pathname : '/addbid',
                      }} />  : 
                      <Redirect to="/home" /> 
                   
                    )
                }}
              />
    <Route path='/addbid'>
<Postbid/>
    </Route>
    <Route path='/home'>
      <LoginForm/>
    </Route>
    <Route path='/location'>
      <Demo/>
    </Route>
    </div>
    </Router>
  );
}

export default App;
