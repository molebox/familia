import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {database} from '../../../config/config';

import CustomIcon from '../utilities/CustomIcon';
import UserProfile from './UserProfile';
import Modal from 'react-native-modal';
import AdminProfile from './AdminProfile';

export default class Profile extends React.Component {

    state = {
        showProfile: false,
        isAdmin: false
    };

    onShowProfilePress = () => this.setState({showProfile: !this.state.showProfile});

    // componentDidMount() {
    //     const that = this;
    //     database.ref('users/').once('value', (snapshot) => {
    //         const exists = (snapshot.val() !== null);
    //         if (exists) {
    //             data = snapshot.val();
    //         }

    //         for(var user in data) {
    //             const userInfo = data[user];
    //             if (userInfo.isAdmin) {
    //                 that.setState({isAdmin: true});
    //                 console.log('USERDATA: ', userInfo);
    //             }            
    //         }         
    //     }) 
    // }

    render() {
        const {showProfile, isAdmin} = this.state;

        if (showProfile === true && isAdmin === true) {
            return (
                <Modal 
                isVisible={this.state.showProfile}
                backdropOpacity={1}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                    <AdminProfile closeModel={this.onShowProfilePress}/>
                </Modal>
            )
        } else if (showProfile === true) {
            return (
                <Modal 
                isVisible={this.state.showProfile}
                backdropOpacity={1}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                    <UserProfile closeModel={this.onShowProfilePress}/>
                </Modal>
            )
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.setState({showProfile: true})}>
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
        backgroundColor: '#15000f', 
    },
    iconStyle: {
        color: '#faf9f9',
    },
    text: {
        fontSize: 10,
        fontWeight: '300',
        color: '#81e6fc',
        fontFamily: 'YRThree_Light'
    }
})