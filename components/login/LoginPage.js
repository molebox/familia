import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import * as Facebook from 'expo-facebook';

import { Pages } from 'react-native-pages';
// import Dialog, { DialogContent, SlideAnimation, DialogTitle} from 'react-native-popup-dialog';

import MainApp from '../mainApp/MainApp';
import { f, auth, database} from '../../config/config';
import ErrorsAndWarnings from '../mainApp/utilities/ErrorsAndWarnings';
import Modal from "react-native-modal";
import UserContext from '../mainApp/utilities/UserContext';
import Button from '../mainApp/utilities/Button';
import AnimatedLogo from '../mainApp/AnimatedLogo';
import AdminApp from '../adminApp/AdminApp';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signUpVisible: false,
            loginVisible: false,
            email: '',
            name: '',
            displayName: '',
            password: '',
            hasError: false,
            error: '',
            user: null,
            isAdmin: false
        }

    let that = this;
    // Check if user exists
    f.auth().onAuthStateChanged((user) => {
        if(user) {
            // Logged in
            that.setState({loggedIn: true, user});
            this.checkUserIsAdmin();
            console.log('USER DETAILS: ', user);
        } else {
            // Logged out
            that.setState({loggedIn: false});
        }
        });
    }

    // Create the new users and put thier details in the database
    createUserObject = (userObj, email, name) => {
        console.log('create user object: ', userObj, email);

        const uObj = {
            name,
            isAdmin: false,
            email
        };
        console.log('uObj: ', uObj);
        database.ref('users').child(userObj.uid).set(uObj);
    }

    // Register user with email and log user in
    registerUser = (email, password, name) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            var currentUser = f.auth().currentUser;
            console.log('currentUser: ', currentUser);
            this.createUserObject(user.user, email, name);
            currentUser.updateProfile({
                displayName: name
            }).then(() => this.setState({loggedIn: true, loginVisible: false, user: user.user, name, displayName: name}))
            .catch((error) => {
                this.setState({error: error.message, hasError: true, loggedIn: false});
                console.log(error.message);
            })  
        })
        .catch((error) => {
            this.setState({error: error.message, hasError: true, loggedIn: false});
            console.log(error.message);
        });
    };

    loginUser = async(email, password) => {
        if (email != '' && password != '') {
        try {
            let user = await auth.signInWithEmailAndPassword(email, password);
            if (user !== undefined) {
                this.checkUserIsAdmin();
                this.setState({loggedIn: true, loginVisible: null, user: user.user});
            }
        } catch(error) {
            this.setState({error: error.message, hasError: true, loggedIn: false});
            console.log(error.message);
        }
    } else {
        // if empty
        this.setState({error: 'Missing email or password', hasError: true});
    }
}

    checkUserIsAdmin = () => {
        const that = this;
        var userId = f.auth().currentUser.uid;
        database.ref('/users/' + userId).once('value').then(function(snapshot) {
        const currentUser = snapshot.val();
        console.log(currentUser);
            if (currentUser.isAdmin) {
                that.setState({isAdmin: true});
            } 
        });
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
        } = await Facebook.logInWithReadPermissionsAsync('315884342379807', {
        permissions: ['email', 'public_profile'],
    });
    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);

        const user = await response.json();
        this.checkUserIsAdmin();
        this.setState({loggedIn: true, user});
        
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
            this.setState({loggedIn: false});
            console.log('Logged out...');
        }).catch((error) => {
            this.setState({error: error.message, hasError: true});
        });
    }

    renderMain = () => {
        const {loggedIn, isAdmin} = this.state;

        let viewToRender;

        if (!!loggedIn && !!isAdmin) {
            viewToRender = <AdminApp/>;
        } else if (!!loggedIn) {
            viewToRender = <MainApp/>;

        } else {
            viewToRender = <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../assets/IPhone-X-Purple.png')} resizeMode={'cover'}>
                    <View style={{flex: 4}}></View>
                    <View style={styles.buttonContainer}>
                        <View >
                            <View style={styles.singleButton}>
                            <AnimatedLogo duration={4000}>
                                <Button 
                                text="SIGN UP"
                                onPress={() => this.setState({signUpVisible: true})}
                                />
                            </AnimatedLogo>

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
                                                <Label style={styles.text}>Name</Label>
                                                <Input
                                                style={styles.text}
                                                onChangeText={(text) => this.setState({name: text})}
                                                value={this.state.name}
                                                />
                                            </Item>
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
                                                onPress={() => this.registerUser(this.state.email, this.state.password, this.state.name)}
                                                text="CREATE ACCOUNT"
                                                />
                                            </View>
                                        
                                        </Form>
                                </Modal>

                            </View>
                            <View style={styles.singleButton}>
                                <AnimatedLogo duration={3000}>
                                    <Button 
                                    text="CONTINUE WITH FACEBOOK"
                                    onPress={this.loginWithFacebook}
                                    />
                                </AnimatedLogo>
                             
                            </View>
                            <View style={styles.singleButton}>
                                <AnimatedLogo duration={2000}>
                                    <Button 
                                    text="CONTINUE WITH GOOGLE"
                                    onPress={this.loginWithGoogle}
                                    />
                                </AnimatedLogo>
                            </View>
                            <View style={styles.singleButton}>
                                <AnimatedLogo duration={1500}>
                                    <Button 
                                    isLoginButton={true}
                                    text="LOGIN"
                                    onPress={() => this.setState({loginVisible: true})}
                                    />
                                </AnimatedLogo>
                       
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
        }

        return viewToRender;     
    }

    render() {

        return (
            <UserContext.Provider value={{user: this.state.user}}>
                <View style={styles.container}>
                    {this.renderMain()}
                </View>
            </UserContext.Provider>
        
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