import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';

import Button from '../../components/utilities/Button';
import { Pages } from 'react-native-pages';
import Dialog, { DialogContent, SlideAnimation, DialogTitle, ScaleAnimation, FadeAnimation } from 'react-native-popup-dialog';

import MainApp from '../MainApp';
import { f, auth, database} from '../../config/config';
import ErrorsAndWarnings from '../utilities/ErrorsAndWarnings';

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
    }

// Register user with email and log user in
registerUser = (email, password) => {
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => console.log(email, password, user))
    .catch((error) => {
        this.setState({error: error.message, hasError: true});
        console.log(error.message);
    });
};

    // handleSignUp = () => {
    //     console.log('signedup!');

    // }

    loginUser = async(email, password) => {
        if (email != '' && password != '') {
        try {
            let user = await auth.signInWithEmailAndPassword(email, password);
            console.log(user);
        } catch(error) {
            this.setState({error: error.message, hasError: true});
            console.log(error.message);
        }
    } else {
        // if empty
        this.setState({error: 'Missing email or password', hasError: true});
        // alert('Missing email or password');
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
            this.setState({error: error.message, hasError: true});
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
            this.setState({error: error.message, hasError: true});
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
                                    opacity={0.2}
                                    width={0.9}
                                    overlayBackgroundColor='transparent'
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
                                            {this.state.hasError ? <View style={styles.error}><ErrorsAndWarnings error={this.state.error}/></View> : null}
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
                                onPress={() => this.setState({loginVisible: true})}
                                />
                                <Dialog
                                    containerStyle={styles.signUpForm}
                                    visible={this.state.loginVisible}
                                    opacity={0.2}
                                    width={0.9}
                                    overlayBackgroundColor='#15000f'
                                    dialogAnimation={new SlideAnimation({
                                        slideFrom: 'bottom',
                                        })}
                                    dialogTitle={<DialogTitle style={{backgroundColor: '#15000f'}} textStyle={styles.signUpTitle} title="LOGIN"/>}
                                    onTouchOutside={() => {
                                    this.setState({loginVisible: false });
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
                                            {this.state.hasError ? <View style={styles.error}><ErrorsAndWarnings error={this.state.error}/></View> : null}
                                                <Button
                                                onPress={() => this.loginUser(this.state.email, this.state.password)}
                                                text="LOGIN"
                                                />
                                            </View>                                     
                                        </Form>
                                        </View>
                                    </DialogContent>
                                </Dialog>
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
        borderColor: '#15000f',
        borderWidth: 1,
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