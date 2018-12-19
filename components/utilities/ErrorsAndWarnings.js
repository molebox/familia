import React from 'react';
import {StyleSheet, Text} from 'react-native'

export default function ErrorsAndWarnings(props) {

    const styles = StyleSheet.create({
        textStyle: {
            fontSize: 16,
            color: '#C70039',
            fontFamily: 'YRThree_Light'
        },
    });

    return <Text style={styles.textStyle}>{props.error}</Text>
}