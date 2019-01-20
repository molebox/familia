import React from 'react';
import {
    Text,
    View,
    StyleSheet
  } from 'react-native';

  import {Divider} from 'react-native-elements';

export default function Month(props) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.month}>{props.month}</Text>
      </View>
      <Divider style={styles.divider}/>
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
      month: {
        fontSize: 17,
        fontWeight: '300',
        color: '#faf9f9',
        marginBottom: 5,
        fontFamily: 'YRThree_Medium'
      },
      divider: {
        height: 1,
        opacity: 0.5,
        backgroundColor: '#fbf7f7',
      }
})