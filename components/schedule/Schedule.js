import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import TickerBar from '../Tickerbar';

class Schedule extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <TickerBar/>
                <View style={styles.main}>
                <Text style={styles.textStyle}>EVENTS LIST GOES HERE</Text>  
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15000f',
      alignSelf: 'stretch',
    },
    main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    },
  });
  

export default Schedule;