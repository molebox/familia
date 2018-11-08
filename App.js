import React from 'react';
import {View} from 'react-native';

import HomePage from './components/HomePage';
import { Pages } from 'react-native-pages';

import * as firebase from 'firebase';
import MainApp from './components/MainApp';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSlPQ7HJ7pzlOPE1YVMJEkeEkfyhxWtq0",
    authDomain: "test1-acf0d.firebaseapp.com",
    databaseURL: "https://test1-acf0d.firebaseio.com",
    projectId: "test1-acf0d",
    storageBucket: "",
    messagingSenderId: "822411268971"
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    return (
      <Pages>
        <HomePage />
          <MainApp/>
      </Pages>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#15000f',
//   },
//   headerStyle: {
//       borderBottomWidth: 1,
//       borderColor: '#15000f',
//       backgroundColor: '#15000f'
//   },
//   textStyle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'white'
// },
//   underlineStyle: {
//       height: 3.6,
//       backgroundColor: '#ffc300',
//       width: 50
//   }
// });
