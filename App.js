import React from 'react';
import {View, AppLoading, ActivityIndicator} from 'react-native';

import * as firebase from 'firebase';
import * as Expo from 'expo';
import LoginPage from './components/login/LoginPage';

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
    } else {
      return <View style={{alignItems: 'center', alignSelf: 'center'}}><ActivityIndicator size="large" color="#81e6fc" /></View>
    }

    }
  }