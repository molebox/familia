import React from 'react';
import { View, StyleSheet} from 'react-native';
import Profile from '../profile/Profile';

export default function ColourBars() {
    
    return(
        <View style={styles.container}>
            <View style={{flex: 1}}></View>
            <View style={styles.elementsContainer}>
                <View style={styles.five}/>
                <View style={styles.four}/>
                <View style={styles.three}/>
                <View style={styles.two}/>
                <View style={styles.one}/>
            </View>
            <View style={styles.profileContainer}><Profile/></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    elementsContainer: {
        flex: 2,
    },
    profileContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        marginTop: 30
    },
    five: {
        flex: 1, 
        backgroundColor: '#FFC300'
    },
    four: {
        flex: 1, 
        backgroundColor: '#FF5733'
    },
    three: {
        flex: 1, 
        backgroundColor: '#C70039'
    },
    two: {
        flex: 1, 
        backgroundColor: '#900c3f'
    },
    one: {
        flex: 2, 
        backgroundColor: '#581845'
    }

});