import React from 'react';
import {View, StyleSheet, ImageBackground, Text, TextInput, Dimensions} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import Button from '../../components/utilities/Button';
import { Pages } from 'react-native-pages';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';

import MainApp from '../MainApp';
import { f, auth, database} from '../../config/config';
import ErrorsAndWarnings from '../utilities/ErrorsAndWarnings';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signUpVisible: false,
            email: '',
            password: '',
            hasError: false,
            error: ''
        }
        // this.registerUser('testemail@gmauil.com', 'password');

        // let that = this;
        //     // Check if user exists
        //     f.auth().onAuthStateChanged((user) => {
        //         if(user) {
        //         // Logged in
        //         that.setState({
        //             loggedIn: true
        //         });
        //         console.log('logged in...', user);
        //         } else {
        //         // Logged out
        //         that.setState({
        //             loggedIn: false
        //         });
        //         console.log('Logged out...');
        //         }
        //     });
        }

// Register user with email and log user in
registerUser = (email, password) => {
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => console.log(email, password, user))
    .catch((error) => this.setState({error, hasError: true}));
};

    handleSignUp = () => {
        console.log('signedup!');

    }

    loginUser = async(email, password) => {
        if (email != '' && password != '') {
        try {
            let user = await auth.signInWithEmailAndPassword(email, password);
            console.log(user);
        } catch(error) {
            this.setState({error, hasError: true});
        }
    } else {
        // if empty
        alert('Missing email or password');
    }
}

    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        '303982843784209',
        {permissions: ['email', 'public_profile']}
    );
    
    if (type === 'success') {
        const credentials = f.auth.FacebookAuthProvider.credential(token);
        f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error) => {
            this.setState({error, hasError: true});
        })
    }
}

    loginWithGoogle = () => {
        console.log('google login!');
        this.setState({isLoggedIn: true});
        return (
            <Pages>
                <MainApp/>      
            </Pages>
        )
    }

    signUserOut = () => {
        auth.signOut()
        .then(() => {
            console.log('Logged out...');
        }).catch((error) => {
            this.setState({error, hasError: true});
        });
    }


    render() {
        return (
            <View style={styles.container}>

                {this.state.loggedIn === true ? (
                    <Pages>
                        <MainApp/>      
                    </Pages>
                ) : (
                <ImageBackground style={styles.image} source={require('../../assets/IPhone-X-Purple.png')} resizeMode={'cover'}>
                    <View style={{flex: 4}}></View>
                    <View style={styles.buttonContainer}>
                        <View >
                            <View style={styles.singleButton}>
                                <Button 
                                text="SIGN UP"
                                onPress={() => this.setState({signUpVisible: true})}
                                />
                                    <Dialog
                                    containerStyle={styles.signUpForm}
                                    visible={this.state.signUpVisible}
                                    opacity={0.5}
                                    width={0.9}
                                    overlayBackgroundColor='#000000'
                                    dialogAnimation={new SlideAnimation({
                                        slideFrom: 'bottom',
                                    })}
                                    dialogTitle={<DialogTitle style={{backgroundColor: '#15000f'}} textStyle={styles.signUpTitle} title="REGISTER"/>}
                                    onTouchOutside={() => {
                                    this.setState({signUpVisible: false });
                                    }}
                                    >
                                    <DialogContent style={styles.signUpContent}>
                                        <View>
                                        <Form>
                                            <Item floatingLabel>
                                                <Label style={styles.text}>Email</Label>
                                                <Input
                                                style={styles.text}
                                                onChangeText={(text) => this.setState({email: text})}
                                                value={this.state.email}
                                                />
                                                {this.state.hasError ? <ErrorsAndWarnings error={this.state.error}/> : null}
                                            </Item>
                                            <Item floatingLabel>
                                                <Label style={styles.text}>Password</Label>
                                                <Input
                                                style={styles.text}
                                                onChangeText={(text) => this.setState({password: text})}
                                                secureTextEntry={true}
                                                value={this.state.pass}
                                                />
                                                {this.state.hasError ? <ErrorsAndWarnings error={this.state.error}/> : null}
                                            </Item>
                                            <View style={styles.signUpBtn}>
                                                <Button
                                                onPress={() => this.registerUser(this.state.email, this.state.password)}
                                                text="CREATE ACCOUNT"
                                                />
                                            </View>
                                        
                                        </Form>
                                        </View>
                                    </DialogContent>
                                </Dialog>
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
                )}

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
        color: 'white',
        fontFamily: 'YRThree_Light',
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
    },
    signUpForm: {
        backgroundColor: '#15000f',
        zIndex: 10, 
        elevation: 10,
    },
    signUpBtn: {
        marginTop: 35,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpTitle: {
        color: 'white',
        fontFamily: 'YRThree_Medium',
        fontSize: 20,
    },
    signUpContent: {
        backgroundColor: '#15000f',
        // borderColor: '#81e6fc',
        // borderWidth: 1,
    }
});


export default LoginPage;