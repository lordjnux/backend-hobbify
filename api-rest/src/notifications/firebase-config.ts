// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDrnCI_h1Fh4jlrHn3tLWZ4UlTGst0RaiA',
  authDomain: 'hobbify-notifications-416da.firebaseapp.com',
  projectId: 'hobbify-notifications-416da',
  storageBucket: 'hobbify-notifications-416da.appspot.com',
  messagingSenderId: '354516929928',
  appId: '1:354516929928:web:806fcbd71e9c9f45f17e3d',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging();

getToken(messaging, {
  vapidKey:
    'BMiK5NKE2ywZqMYbavoR9yHjFouWB86YUZ5mRc-1p9Yc4UiJf6Vh2e9U9xEEZzpS2RhraIH1logyeAP4TwIFjbc',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log('Current token for client: ', currentToken);
      // ...
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      );
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
