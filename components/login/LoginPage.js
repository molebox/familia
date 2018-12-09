import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
// import {Button} from 'react-native-elements';

import Button from '../../components/utilities/Button';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleSignUp = () => {
        console.log('signedup!');
    }

    loginWithFacebook = () => {
        console.log('fb login!');
    }

    loginWithGoogle = () => {
        console.log('google login!');
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/IPhone-X-Purple.png')} resizeMode={'cover'}>
                <View style={{flex: 4}}></View>
                <View style={styles.buttonContainer}>
                    <View >
                        <View style={styles.singleButton}>
                            <Button 
                            text="SIGN UP"
                            onPress={this.handleSignUp}
                            />
                        </View>
                        <View style={styles.singleButton}>
                            <Button 
                            text="CONTINUE WITH FACEBOOK"
                            onPress={this.loginWithFacebook}
                            />
                        </View>
                        <View style={styles.singleButton}>
                            <Button 
                            text="CONTINUE WITH GOOGLE"
                            onPress={this.loginWithGoogle}
                            />
                        </View>
                        <View style={styles.singleButton}>
                            <Button 
                            isLoginButton={true}
                            text="LOGIN"
                            onPress={this.loginWithGoogle}
                            />
                        </View>
                    </View>
                </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignSelf: 'stretch',
    },
    image: {
    flex: 1,
    justifyContent: 'center',
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
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    singleButton: {
        alignItems: 'center',
        margin: 5
    }
});


export default LoginPage;