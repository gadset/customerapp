import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
 // databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyBULQBdwnrNopZghLLXL1dHrPZvRDXMe68",
  authDomain: "gadset-customer.firebaseapp.com",
  databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gadset-customer",
  storageBucket: "gadset-customer.appspot.com",
  messagingSenderId: "853423138437",
  appId: "1:853423138437:web:eb298cd5e3159a6e1aabec",
  measurementId: "G-J8Z28LEYJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeProvider theme={theme}>
     <App />
     </ThemeProvider>
     </Provider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
