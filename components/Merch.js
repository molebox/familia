import React from 'react';
import {View, StyleSheet, Linking, TouchableOpacity, Image} from 'react-native';
import { Container, Content, Card, CardItem, Text} from 'native-base';

class Merch extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <Container style={styles.contentContainer}>
                <Content>
                    <View style={{marginBottom: 5}}>
                        <Text style={styles.textStyle}>FAMILIA STORE</Text>
                    </View>
                    <Card style={{ borderRadius: 20}}>
                        <CardItem bordered style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://google.com')}>
                            <Image style={{height: 450, width: 340}} source={require('../assets/StoreLink.png')}>
                            </Image>
                        </TouchableOpacity>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15000f',
    },
    image: {
        width: 340,
        height: 450
    },
    contentContainer: {
        marginTop: 100,
        backgroundColor: '#15000f',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardStyle: {
        height: 450, 
        width: 340,
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '900',
        color: 'white',
        fontFamily: 'YRThree_Light'
    },
});


export default Merch;