import React from 'react';
import {View, AppLoading} from 'react-native';

import HomePage from './components/HomePage';
import { Pages } from 'react-native-pages';

import * as firebase from 'firebase';
import MainApp from './components/MainApp';
import { Font } from 'expo';


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
    this.state = {
      fontLoaded: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'navigation': require('./assets/fonts/YRThree_Light.ttf'),
      'descriptions': require('./assets/fonts/YRThree_Medium.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ fontLoaded: true });
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