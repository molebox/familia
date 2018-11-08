import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import TickerBar from './Tickerbar';

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
             <TickerBar/>
                <View style={styles.main}>
                <Text style={styles.textStyle}>SHARE INFO HERE</Text>  
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
  

export default Share;