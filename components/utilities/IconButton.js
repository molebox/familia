import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CustomIcon from './CustomIcon';

export default class IconButton extends React.Component {

    render() {
        const {selected} = this.props;
        return (
            <View>
                {!!selected ? (
                    <View style={styles.iconContainer}>
                        <Text style={styles.selectedDisciplineText}>{this.props.disciplineText}</Text>
                        <CustomIcon name={this.props.discipline} size={25} style={styles.selectedColor}/>
                    </View>
                ) : (
                    <View style={styles.iconContainer}>
                        <Text style={styles.defaultDisciplineText}>{this.props.disciplineText}</Text>
                        <CustomIcon name={this.props.discipline} size={25} style={styles.defaultColor}/>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#15000f', 
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    defaultColor: {
        color: '#81e6fc'
    },
    selectedColor: {
        color: '#ffc400',
    },
    selectedDisciplineText: {
        color: '#ffc400',
        fontSize: 10,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingBottom: 5
    },
    defaultDisciplineText: {
        color: '#81e6fc',
        fontSize: 10,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingBottom: 5
    },
});

