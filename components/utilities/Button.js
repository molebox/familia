import React, { Component } from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

class Button extends Component {
    render() {
    const {isLoginButton} = this.props;
        return (
            <View>
                {isLoginButton ? (
                <TouchableOpacity style={styles.loginButton} onPress={this.props.onPress}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity >
            ) : 
            (
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity >
            ) }
            </View>
        )
    }
}

export default Button;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        width: 200,
        borderRadius: 20,
        borderColor: '#81e6fc',
        borderWidth: 1,
    },
    loginButton: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        width: 100,
        borderRadius: 20,
        borderColor: '#81e6fc',
        borderWidth: 1,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        // fontWeight: '300',
        fontFamily: 'YRThree_Light'
    }
});