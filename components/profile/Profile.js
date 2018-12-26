import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomIcon from '../utilities/CustomIcon';
import UserProfile from './UserProfile';
import Modal from 'react-native-modal';

export default class Profile extends React.Component {

    state = {showProfile: false};

    onShowProfilePress = () => this.setState({showProfile: true});

    render() {
        const {showProfile} = this.state;

        if (showProfile === true) {
            return (
                <Modal 
                isVisible={this.state.showProfile}
                onBackdropPress={() => this.setState({ showProfile: false })}
                onSwipe={() => this.setState({ showProfile: false })}
                swipeDirection="left"
                backdropOpacity={1}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                    <UserProfile/>
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