import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';

import AnimatedLogo from './AnimatedLogo';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../assets/IPhone-X-Purple.png')} resizeMode={'cover'}>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  /*     backgroundColor: '#000', */
      alignSelf: 'stretch',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: 50,
    },
    subText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: 10,
    }
  });
  

export default HomePage;