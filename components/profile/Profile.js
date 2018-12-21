import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomIcon from '../utilities/CustomIcon';

export default class Profile extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.center}><CustomIcon name="Profile" size={40} style={styles.iconStyle}/></View>
                    <View style={styles.center}><Text style={styles.text}>profile</Text></View> 
                </TouchableOpacity>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    iconStyle: {
        color: '#faf9f9',
    },
    text: {
        fontSize: 10,
        fontWeight: '300',
        color: '#81e6fc',
        fontFamily: 'YRThree_Light'
    },
    center: {
        alignItems: 'center',
        alignContent: 'center',
    }
})