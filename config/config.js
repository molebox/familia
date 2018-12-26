import firebase from 'firebase';

// Api Details
const config = {
    apiKey: "AIzaSyBjx0CLylHTJhzBNhrgxtIMbpzCLMSYoGY",
    authDomain: "familia-827ab.firebaseapp.com",
    databaseURL: "https://familia-827ab.firebaseio.com",
    projectId: "familia-827ab",
    storageBucket: "familia-827ab.appspot.com",
    messagingSenderId: "698253965238"
};

firebase.initializeApp(config);

// Firebase variables to use througout the app
export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
