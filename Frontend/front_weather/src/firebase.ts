// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);
console.log('firebase.ts')
export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BJrW7O0uSqmRiA-NkgMxr2ZVKcGEvU-CWE2th9zRk6M5Cbuh1w3Qf3JFCIR1okjJEVQvhMl_KmGOUsMyVBt_Dqo' });
      console.log('FCM Token:', token);
      return token;
    } else {
      throw new Error('Notification permission not granted');
    }
  } catch (error) {
    console.error('Error getting FCM token', error);
    throw error;
  }
};


//onMessage(messaging, (payload) => {
  //console.log('Message received. ', payload);
  //new Notification(payload.notification?.title || 'onMessage')
 
  // ...
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    const title = payload.notification?.title || 'Notification';
    const body = payload.notification?.body || '';
  
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    } else {
      console.error('Notification permission not granted or revoked.');
    }
});

export default app;
