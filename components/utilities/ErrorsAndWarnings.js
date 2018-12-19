import React from 'react';
import {StyleSheet} from 'react-native'
import {Text, View} from 'native-base';

export default class ErrorsAndWarnings extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>{this.props.error}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 14,
        color: '#C70039',
        fontFamily: 'YRThree_Light'
    },
});
