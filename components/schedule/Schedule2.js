import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import TickerBar from '../Tickerbar';

import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import DaySection from './DaySection.js';


class Schedule2 extends React.Component {

    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => (
        <DaySection 
        id={item.id}
        eventName={item.eventName}
        creator={item.creatorsName}
        location={item.location}
        date={item.date}
        />
      );

    render() {

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.list}>
                <FlatList
                    data={dummyData}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}>
                </FlatList>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15000f', 
    },
    main: {
    flex: 1,
    backgroundColor: '#15000f',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    },
    subStyle: {
        fontSize: 15,
        fontWeight: '500',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      list: {
        flex: 1,
        width: '90%',
        height: '70%',
        margin: 20
      }

  });
  

export default Schedule2;

const dummyData = [
    {
        "id": 1,
        "eventName": "Skydiving",
        "date": "2018-01-01",
        "location": "London",
        "creatorsName": "Rich",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 2,
        "eventName": "Skydiving",
        "date": "2018-01-02",
        "location": "Brighton",
        "creatorsName": "Dave",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 3,
        "eventName": "Base Jumping",
        "date": "2018-01-05",
        "location": "Madrid",
        "creatorsName": "Marco",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 4,
        "eventName": "Skydiving",
        "date": "2018-02-02",
        "location": "Florida",
        "creatorsName": "Wayne",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 5,
        "eventName": "Skydiving",
        "date": "2018-02-02",
        "location": "Paris",
        "creatorsName": "Richie",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 6,
        "eventName": "Base Jumping",
        "date": "2018-02-05",
        "location": "London",
        "creatorsName": "Mary",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 7,
        "eventName": "Skydiving",
        "date": "2018-01-05",
        "location": "Margate",
        "creatorsName": "Sarah",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 8,
        "eventName": "Skydiving",
        "date": "2018-06-01",
        "location": "London",
        "creatorsName": "Gary",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 9,
        "eventName": "Skydiving",
        "date": "2018-01-10",
        "location": "London",
        "creatorsName": "Bona",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 10,
        "eventName": "Base Jumping",
        "date": "2018-04-21",
        "location": "Barcelona",
        "creatorsName": "Ricardo",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 11,
        "eventName": "Base Jumping",
        "date": "2018-01-01",
        "location": "London",
        "creatorsName": "Rich",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 12,
        "eventName": "Base Jumping",
        "date": "2018-01-02",
        "location": "Brighton",
        "creatorsName": "Dave",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 13,
        "eventName": "Skydiving",
        "date": "2018-01-05",
        "location": "Madrid",
        "creatorsName": "Marco",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 14,
        "eventName": "Skydiving",
        "date": "2018-02-02",
        "location": "Florida",
        "creatorsName": "Wayne",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 15,
        "eventName": "Skydiving",
        "date": "2018-02-02",
        "location": "Paris",
        "creatorsName": "Richie",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 16,
        "eventName": "Base Jumping",
        "date": "2018-02-05",
        "location": "London",
        "creatorsName": "Mary",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 17,
        "eventName": "Base Jumping",
        "date": "2018-11-05",
        "location": "Margate",
        "creatorsName": "Sarah",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 18,
        "eventName": "Base Jumping",
        "date": "2018-11-01",
        "location": "London",
        "creatorsName": "Gary",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    },
    {
        "id": 19,
        "eventName": "drop_9",
        "date": "2018-11-10",
        "location": "London",
        "creatorsName": "Bona",
        "contactNumber": "0730647544",
        "image": "../assets/skydiving.jpg"
    },
    {
        "id": 20,
        "eventName": "drop_10",
        "date": "2018-11-21",
        "location": "Barcelona",
        "creatorsName": "Ricardo",
        "contactNumber": "0730647544",
        "image": "../assets/basejumping.jpg"
    }
];