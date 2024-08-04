// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyBf-MxZJva_IuMFopt0c0SfdnppxPwF-bY",
  authDomain: "meteo-app-85e7c.firebaseapp.com",
  projectId: "meteo-app-85e7c",
  storageBucket: "meteo-app-85e7c.appspot.com",
  messagingSenderId: "367994241668",
  appId: "1:367994241668:web:e226aadf860b111eb338d1",
  measurementId: "G-26J2SPGX6V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();
console.log("welcome")

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }
  messaging.onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification('background');
  });