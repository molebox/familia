import React from 'react';
import {View, StyleSheet, TouchableHighlight, Text, TextInput, Button} from 'react-native';
import { Formik, Field, Form } from 'formik';

export default class CreateEvent extends React.Component {


    constructor(props){
        super(props);
        this.state = {
          formData:{}
        }
      }

      handleChange = (value) => {
        console.log(value)
      }

    render() {
        return (
            <View style={styles.container}>
    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#15000f',
        alignSelf: 'stretch',
        
      },
    labelStyle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    },
    inputStyle : {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        borderWidth: 0,
        borderBottomColor: '#ff5733',
        borderBottomWidth: 1,
        margin: 15
    },
    inputContainerStyle : {
        borderWidth: 0,
        borderBottomColor: '#ff5733',
        borderBottomWidth: 1,
    },
     divider: {
        backgroundColor: '#ffc300',
        height: 1,
        marginTop: 30,
        marginBottom: 30
     }
})