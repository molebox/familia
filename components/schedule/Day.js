import React from 'react';
import {
    Text,
    View,
    StyleSheet
  } from 'react-native';


export default function Day(props) {
  return (
       <View >
        <Text style={styles.dayText}>{props.day}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#15000f',
      },
      dayText: {
        fontSize: 20,
        fontWeight: '300',
        color: '#faf9f9'
      }
})