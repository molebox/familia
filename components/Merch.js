import React from 'react';
import {View, StyleSheet, Text, Linking, TouchableOpacity, Image} from 'react-native';

class Merch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.container}>
                <View >
                {/* <Text style={styles.textStyle}>SELL SOME SHIT HERE!</Text>   */}
                <TouchableOpacity onPress={ ()=> Linking.openURL('https://google.com') }>
                <Image style={styles.image} source={require('../assets/StoreLink.png')} resizeMode={'contain'}>
                </Image>
                </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15000f',
        // alignSelf: 'stretch',
    },
    image: {
        flex: 1,
        width: 200,
        height: 200
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    },
});


export default Merch;