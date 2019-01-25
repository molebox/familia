import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const battuta_key = '49923b2ac727568e4e55daba75eca5ef';


export default class Places extends React.Component {

    state = {data: undefined}

    componentDidMount() {

        fetch(`http://battuta.medunes.net/api/country/all/?key=${battuta_key}`)
        .then((response) => {
            return response.json();
            })
        .then((myJson) => {
            this.setState({data: JSON.stringify(myJson)});
            console.log(JSON.stringify(myJson));
        });

    }

    render() {
        const {data} = this.state;
        return <View></View>
        // {data ? data.map((item) => {
        //     return <View style={styles.container}><Text>{item.name}</Text></View>
        // }) : <View style={styles.container}><Text>Nothing Found</Text></View>}
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '900',
        color: 'white',
        fontFamily: 'YRThree_Light'
    },
});


