import React from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Form, Item, Input, Label, Text} from 'native-base';

import Button from '../../components/utilities/Button';
import { Pages } from 'react-native-pages';
import Dialog, { DialogContent, SlideAnimation, DialogTitle} from 'react-native-popup-dialog';

import MainApp from '../MainApp';
import { f, auth, database} from '../../config/config';
import ErrorsAndWarnings from '../utilities/ErrorsAndWarnings';
import Modal from "react-native-modal";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signUpVisible: false,
            loginVisible: false,
            email: '',
            password: '',
            hasError: false,
            error: ''
        }

    // this.registerUser('testemail@gmauil.com', 'password');
    let that = this;
    // Check if user exists
    f.auth().onAuthStateChanged((user) => {
        if(user) {
            // Logged in
            that.setState({loggedIn: true});
            // console.log('logged in...', user);
        } else {
            // Logged out
            that.setState({loggedIn: false});
            // console.log('Logged out...');
        }
        });
    }

// Register user with email and log user in
registerUser = (email, password) => {
    // console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
        // console.log(email, password, user);
        this.setState({loggedIn: true, loginVisible: false});
        this.closeDialog();
    })
    .catch((error) => {
        this.setState({error: error.message, hasError: true, loggedIn: false});
        console.log(error.message);
    });
};

    closeDialog = () => {
        const {loggedIn, loginVisible} = this.state;
        if (loginVisible === false && loggedIn === true) {
            this.setState({loginVisible: null});
        }
    }

    loginUser = async(email, password) => {
        if (email != '' && password != '') {
        try {
            let user = await auth.signInWithEmailAndPassword(email, password);
            if (user !== undefined) {
                console.log('LOGGED IN!!!', user);
                this.setState({loggedIn: true, loginVisible: null});
            }
        } catch(error) {
            this.setState({error: error.message, hasError: true, loggedIn: false});
            console.log(error.message);
        }
    } else {
        // if empty
        this.setState({error: 'Missing email or password', hasError: true});
        // alert('Missing email or password');
    }
}

//     async loginWithFacebook() {
//         const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
//         '315884342379807',
//         {permissions: ['email', 'public_profile']}
//     );
    
//     if (type === 'success') {
//         const credentials = f.auth.FacebookAuthProvider.credential(token);
//         f.auth().signInAndRetrieveDataWithCredential(credentials).catch((error) => {
//             console.log('error: ', error);
//             // this.setState({error: error, hasError: true});
//         })
//     }
// }

loginWithFacebook = async() => {
    try {
    const {
        type,
        token,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('315884342379807', {
        permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        this.setState({loggedIn: true});
        } else {
        // type === 'cancel'
        }
        } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
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
            this.setState({error: error.message, hasError: true});
        });
    }

    render() {
        const {loggedIn} = this.state;
        return (
        <View style={styles.container}>
                {!!loggedIn ? (
                    <Pages>
                        <MainApp/>      
                    </Pages>
                ) : (
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/IPhone-X-Purple.png')} resizeMode={'cover'}>
                    <View style={{flex: 4}}></View>
                    <View style={styles.buttonContainer}>
                        <View >
                            <View style={styles.singleButton}>
                                <Button 
                                text="SIGN UP"
                                onPress={() => this.setState({signUpVisible: true})}
                                />

                                <Modal 
                                isVisible={this.state.signUpVisible}
                                onBackdropPress={() => this.setState({ signUpVisible: false })}
                                onSwipe={() => this.setState({ signUpVisible: false })}
                                swipeDirection="left"
                                backdropOpacity={1}
                                animationIn="zoomInDown"
                                animationOut="zoomOutUp"
                                animationInTiming={1000}
                                animationOutTiming={1000}
                                backdropTransitionInTiming={1000}
                                backdropTransitionOutTiming={1000}
                                >
                                    <Form>
                                        <Label style={styles.signUpTitle}>SIGNUP</Label>
                                            <Item floatingLabel>
                                                <Label style={styles.text}>Email</Label>
                                                <Input
                                                style={styles.text}
                                                onChangeText={(text) => this.setState({email: text})}
                                                value={this.state.email}
                                                />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label style={styles.text}>Password</Label>
                                                <Input
                                                style={styles.text}
                                                onChangeText={(text) => this.setState({password: text})}
                                                secureTextEntry={true}
                                                value={this.state.pass}
                                                />
                                            </Item>
                                            <View style={styles.signUpBtn}>
                                            {!!this.state.hasError ? <View style={styles.error}><ErrorsAndWarnings error={this.state.error}/></View> : null}
                                                <Button
                                                onPress={() => this.registerUser(this.state.email, this.state.password)}
                                                text="CREATE ACCOUNT"
                                                />
                                            </View>
                                        
                                        </Form>
                                </Modal>

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
                                onPress={() => this.setState({loginVisible: true})}
                                />

                                <Modal 
                                isVisible={this.state.loginVisible}
                                onBackdropPress={() => this.setState({ loginVisible: false })}
                                onSwipe={() => this.setState({ loginVisible: false })}
                                swipeDirection="left"
                                backdropOpacity={1}
                                animationIn="zoomInDown"
                                animationOut="zoomOutUp"
                                animationInTiming={1000}
                                animationOutTiming={1000}
                                backdropTransitionInTiming={1000}
                                backdropTransitionOutTiming={1000}
                                >
                                    <Form>
                                    <Label style={styles.signUpTitle}>LOGIN</Label>
                                        <Item floatingLabel>
                                            <Label style={styles.text}>Email</Label>
                                            <Input
                                            style={styles.text}
                                            onChangeText={(text) => this.setState({email: text})}
                                            value={this.state.email}
                                            />
                                        </Item>
                                        <Item floatingLabel>
                                            <Label style={styles.text}>Password</Label>
                                            <Input
                                            style={styles.text}
                                            onChangeText={(text) => this.setState({password: text})}
                                            secureTextEntry={true}
                                            value={this.state.pass}
                                            />
                                        </Item>
                                        <View style={styles.signUpBtn}>
                                        {!!this.state.hasError ? <View style={styles.error}><ErrorsAndWarnings error={this.state.error}/></View> : null}
                                            <Button
                                            onPress={() => this.loginUser(this.state.email, this.state.password)}
                                            text="LOGIN"
                                            />
                                        </View>
                                        
                                    </Form>
                                </Modal>

                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
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
        borderColor: '#15000f',
        borderWidth: 1,
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
        alignSelf: 'center'
    },
    signUpContent: {
        backgroundColor: '#15000f',
        borderColor: '#15000f',
        borderWidth: 1,
    },
    error: {
        marginTop: 5,
        marginBottom: 10,
    }
});


export default LoginPage;