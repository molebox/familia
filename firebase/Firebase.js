import firebase from 'firebase';
import 'firebase/auth';

// Api Details
const config = {
    apiKey: "AIzaSyBjx0CLylHTJhzBNhrgxtIMbpzCLMSYoGY",
    authDomain: "familia-827ab.firebaseapp.com",
    databaseURL: "https://familia-827ab.firebaseio.com",
    projectId: "familia-827ab",
    storageBucket: "familia-827ab.appspot.com",
    messagingSenderId: "698253965238"
};

    class Firebase {
        constructor() {
            firebase.initializeApp(config);

            this.auth = firebase.auth();
        }

        // *** Auth API ***
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

        doSignOut = () => this.auth.signOut();

        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

        doCheckAuthStateChanged = user => this.auth.onAuthStateChanged(user);
    }

export default Firebase;

// Firebase variables to use througout the app
// export const f = firebase;
// export const database = firebase.database();
// export const auth = firebase.auth();
// export const storage = firebase.storage();
