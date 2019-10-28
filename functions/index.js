const functions = require('firebase-functions');
const firebase = require('firebase');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC4SBa509su4wRQNu2piX1ueMlPiBDADP4",
    authDomain: "fir-basics-9f212.firebaseapp.com",
    databaseURL: "https://fir-basics-9f212.firebaseio.com",
    projectId: "fir-basics-9f212",
    storageBucket: "fir-basics-9f212.appspot.com",
    messagingSenderId: "460749756349",
    appId: "1:460749756349:web:2a3acc91fabe47e995e4d4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const {server} = require('./src');

// https://firebase.google.com/docs/admin/setup#initialize_the_sdk
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/ravitejadarapu/Desktop/YTube Tuts/FirebaseTut/fir-basics-9f212-firebase-adminsdk-ogu0b-9ef79e4de5.json"


exports.api = functions.https.onRequest(server);
