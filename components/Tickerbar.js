import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import TextTicker from 'react-native-text-ticker'

export default class TickerBar extends PureComponent {
  render(){
    return(
      <View style={styles.container}>
        <TextTicker
          style={styles.textStyle}
          duration={6000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={2000}
        >
          Something about skydiving. Base jumping. Something funny. Im moving look!
        </TextTicker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 20
    },
    textStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white'
},
});