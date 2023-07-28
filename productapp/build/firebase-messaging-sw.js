// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBULQBdwnrNopZghLLXL1dHrPZvRDXMe68",
    authDomain: "gadset-customer.firebaseapp.com",
    databaseURL: "https://gadset-customer-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gadset-customer",
    storageBucket: "gadset-customer.appspot.com",
    messagingSenderId: "853423138437",
    appId: "1:853423138437:web:fe04fa006927f44b1aabec",
    measurementId: "G-FLJ0KC5E98"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});