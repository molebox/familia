import React from 'react';
import {View, StyleSheet, Text, FlatList, ImageBackground} from 'react-native';

import DummyData from '../../assets/dummyData.json';

import EventsBackgroundCard from './EventsBackgroundCard';
import Day from './Day.js';
import DaySection from './DaySection.js';


import { List, ListItem } from 'react-native-elements'


class Schedule extends React.Component {

    renderRow ({item}) {
        return (
                <ListItem
                style={styles.main}
                hideChevron
                key={item.id}
                title={item.creatorsName}
                subtitle={
                    <View style={styles.subtitleView}>
                    <Text style={styles.subStyle}>{item.location}</Text>
                    </View>
                }
                />
        )
      }

    render() {

        return (
            <View style={styles.container}>
                 <List containerStyle={styles.flatList}>
                    <FlatList                
                    data={DummyData.events}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id}
                    />
                    </List>

                {/* <EventsBackgroundCard>
                    {DummyData.events.map((item) => {
                        return <DaySection key={item.id} sectionTitle={item.eventName} title={item.creatorsName} description={item.location}/>
                    })}
                </EventsBackgroundCard> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15000f', 
      alignItems: 'center'
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
      flatList: {
        flex: 1,
        width: '90%',
        height: '80%'
      }

  });
  

export default Schedule;