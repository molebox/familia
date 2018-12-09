import firebase from 'firebase';

// Api Details
const config = {
    apiKey: "AIzaSyCjRzvl0P-1dcgGExH41Nxc0-O4XBCNH_A",
    authDomain: "myfirstproject-163a7.firebaseapp.com",
    databaseURL: "https://myfirstproject-163a7.firebaseio.com",
    projectId: "myfirstproject-163a7",
    storageBucket: "myfirstproject-163a7.appspot.com",
    messagingSenderId: "523995989436"
};

firebase.initializeApp(config);

// Firebase variables to use througout the app
export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
