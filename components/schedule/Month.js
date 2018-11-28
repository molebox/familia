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
        fontSize: 21,
        fontWeight: '300',
        color: 'white',
        marginBottom: 5
      },
      divider: {
        height: 1,
        backgroundColor: 'white',
      }
})