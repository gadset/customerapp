import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBULQBdwnrNopZghLLXL1dHrPZvRDXMe68",
  authDomain: "gadset-customer.firebaseapp.com",
  databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gadset-customer",
  storageBucket: "gadset-customer.appspot.com",
  messagingSenderId: "853423138437",
  appId: "1:853423138437:web:fe04fa006927f44b1aabec",
  measurementId: "G-FLJ0KC5E98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoredb = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const messaging = getMessaging(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
