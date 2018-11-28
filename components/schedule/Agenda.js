import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import { Icon } from 'react-native-elements'

import Month from './Month';
import Filter from '../Filter';

const skydiving = {key:'skydiving', color: 'red'};
const baseJumping = {key:'baseJumping', color: 'blue'};
const party = {key:'party', color: 'pink'};

const months = {
  jan: 'JAN',
  feb: 'FEB',
  mar: 'MAR',
  apr: 'APR',
  may: 'MAY',
  jun: 'JUN',
  jul: 'JUL',
  aug: 'AUG',
  sept: 'SEPT',
  oct: 'OCT',
  nov: 'NOV',
  dec: 'DEC'
}

let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month('MMMM');
// let getCurrentMonth = today.format('MMM').toUpperCase();

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      items:
        {
        '2018-11-22': [{
        month: months.nov,
        type: 'Skydive', 
        creator: 'Balloon Jumps', 
        location: 'Skydive99 Dunkeswell, UK'
        },
        {
          month: months.nov,
          type: 'BASE', 
          creator: 'HALO Boogie', 
          location: 'DZ Denmark'
          }],
          '2018-11-24': [{
            month: months.nov,
            type: 'Skydiving', 
            creator: 'Rowan Costello', 
            location: 'Madrid, Spain'
            }],
        '2018-11-25': [{
        month: months.nov,
        type: 'BASE', 
        creator: 'Adrien Daszkowski', 
        location: 'Brento, Switzerland'
        }],
        '2018-11-06': [],
        '2018-11-27': [{
        month: months.nov,
        type: 'Skydive', 
        creator: 'Shamrock Showdown', 
        location: 'Skydive DeLand, Florida'
        }],
        '2018-11-29': [{
        month: months.nov,
        type: 'BASE', 
        creator: 'HALO Boogie', 
        location: 'DZ Denmark'
        }],
        '2018-12-01': [{
          month: months.dec,
          type: 'Skydive', 
          creator: 'Balloon Jumps', 
          location: 'Skydive99 Dunkeswell, UK'
          },
          {
            month: months.dec,
            type: 'BASE', 
            creator: 'HALO Boogie', 
            location: 'DZ Denmark'
            }],
            '2018-12-03': [{
              month: months.dec,
              type: 'Skydiving', 
              creator: 'Rowan Costello', 
              location: 'Madrid, Spain'
              }],
              '2018-12-05': [{
                month: months.dec,
                type: 'Skydive', 
                creator: 'Balloon Jumps', 
                location: 'Skydive99 Dunkeswell, UK'
                },
                {
                  month: months.dec,
                  type: 'BASE', 
                  creator: 'HALO Boogie', 
                  location: 'DZ Denmark'
                  }],
                  '2018-12-28': [{
                    month: months.dec,
                    type: 'Skydiving', 
                    creator: 'Rowan Costello', 
                    location: 'Madrid, Spain'
                    }],
                    '2018-12-28': [{
                      month: months.dec,
                      type: 'Skydive', 
                      creator: 'Balloon Jumps', 
                      location: 'Skydive99 Dunkeswell, UK'
                      },
                      {
                        month: months.dec,
                        type: 'BASE', 
                        creator: 'HALO Boogie', 
                        location: 'DZ Denmark'
                        }],
                        '2018-12-03': [{
                          month: months.dec,
                          type: 'Skydiving', 
                          creator: 'Rowan Costello', 
                          location: 'Madrid, Spain'
                          }],
          '2018-12-10': [{
          month: months.dec,
          type: 'BASE', 
          creator: 'Adrien Daszkowski', 
          location: 'Brento, Switzerland'
          }],
          '2018-12-11': [{
          month: months.dec,
          type: 'Skydive', 
          creator: 'Shamrock Showdown', 
          location: 'Skydive DeLand, Florida'
          }],
          '2018-12-20': [{
          month: months.dec,
          type: 'BASE', 
          creator: 'HALO Boogie', 
          location: 'DZ Denmark'
          }],
        }
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={now}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        renderKnob={this.renderKnob.bind(this)}
        theme={{
            backgroundColor: '#15000f',
            calendarBackground: '#15000f',
            textSectionTitleColor: '#ff5733',
            monthTextColor: '#ff5733',
            selectedDayBackgroundColor: '#ffc300',
            selectedDayTextColor: '#15000f',
            todayTextColor: '#ffc300',
            agendaDayTextColor: 'white',
            agendaDayNumColor: 'white',
            agendaTodayColor: 'white',
            agendaKnobColor: '#ff5733'
          }}
          // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  renderItem(item, firstItemInDay) {
    let divider;
    if (firstItemInDay) {
      divider = (
        <View style={styles.monthDivider}>
          <Month month={item.month}/>
        </View>
      );
    }
   return (
    <View>
       <View style={styles.monthDivider}>
          <Month month={item.month}/>
        </View>
      <View style={[styles.item]}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.itemText}>{item.creator}</Text>
          <Text style={styles.itemText}>{item.location}</Text>
        </View>
    </View>
   ) 
  }


  renderEmptyDate() {
    return (
      <View >
        <Text style={styles.emptyText}>Nothing happening...</Text>
      </View>
    );
  }

  renderKnob() {
    return (
      <View style={styles.knobContainer}>
         <Text style={styles.knobText}>SHOW CALENDAR</Text>
      </View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }



  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#900C3F',
    backgroundColor: '#15000f',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  type: {
    color: 'white',
    fontSize: 20,
    marginBottom: 5
  },
  itemText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '100'
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  emptyText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300'
  },
  calendarKnob: {
    flex: 1,
    margin: 10,
  },
  knobText: {
    color: '#ffc300',
    fontSize: 15,
    fontWeight: '500'
  },
  knobContainer: {
    marginTop: 7
  },
  monthDivider: {
    marginTop: 35
  }
});