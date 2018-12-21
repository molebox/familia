import React from 'react';
import {View, AppLoading, ActivityIndicator} from 'react-native';

import HomePage from './components/HomePage';
import { Pages } from 'react-native-pages';

import * as firebase from 'firebase';
import MainApp from './components/MainApp';
import { Font } from 'expo';
import LoginPage from './components/login/LoginPage';
import Places from './components/test/Places';


// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyBSlPQ7HJ7pzlOPE1YVMJEkeEkfyhxWtq0",
//     authDomain: "test1-acf0d.firebaseapp.com",
//     databaseURL: "https://test1-acf0d.firebaseio.com",
//     projectId: "test1-acf0d",
//     storageBucket: "",
//     messagingSenderId: "822411268971"
// };

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'YRThree_Light': require('./assets/fonts/YRThree_Light.ttf'),
      'YRThree_Medium': require('./assets/fonts/YRThree_Medium.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {

    if (this.state.fontLoaded) {
      return <LoginPage/>
      // return (
      //   <Pages>
      //   {/* <HomePage /> */}
      //   {/* <LoginPage/> */}
      //   <MainApp/>      
      // </Pages>
      // )
    } else {
      return <View style={{alignItems: 'center', alignSelf: 'center'}}><ActivityIndicator size="large" color="#0000ff" /></View>
    }

    }
  }