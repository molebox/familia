import React from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import { Container, Content ,Text } from 'native-base';



import Month from './Month';
import moment from 'moment';
import Day from './Day';


let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month('MMM');

// Display each date there is an event
class SectionListItem extends React.Component {

    render() {
    let fullDay = moment(this.props.item.date);
    fullDay.day();
    const day = fullDay.format('DD')
        return (
            <View style={styles.sectionListItemContainer}>
            <View style={styles.eventInfoContainer}>
                <View>
                    <Day day={day}/>
                </View>
           <View style={styles.info}>
                <Text style={styles.eventName}>{this.props.item.eventName}</Text>
                <Text style={styles.creatorsName}>{this.props.item.creatorsName}</Text>
                <Text style={styles.location}>{this.props.item.location}</Text>
                {/* <Text style={styles.textStyle}>{this.props.item.description}</Text> */}
           </View>
           
            </View>
            </View>
        )
    }
}

// Display the header for each section - the month - JAN/FAB etc
class SectionHeader extends React.Component {
    render() {
        return (
        <View style={styles.monthHeader}>
            <Month month={this.props.section.title}/>
        </View>
        )
    }
}

export default class SectionListTest extends React.Component {

    render() {
      return (
        <Container style={styles.container}>
            <Content contentContainerStyle={styles.list}>
            <SectionList
            renderItem={({item, index}) => {
                return <SectionListItem item={item} index={index}/>
            }}
            renderSectionHeader={({section}) => {
                return <SectionHeader section={section}/>
            }}
            sections={listData}
            keyExtractor={(item) => item.id}
            >
            </SectionList>
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
    eventName: {
        fontSize: 18,
        fontWeight: '300',
        color: '#81e6fc',
        // fontFamily: 'descriptions',
    },
    creatorsName: {
        fontSize: 15,
        fontWeight: '300',
        color: '#faf9f9'
    },
    location: {
        fontSize: 14,
        fontWeight: '300',
        color: '#898688'
    },
    list: {
        width: '80%',
        height: '70%',
        margin: 20,
        marginTop: 70
    },
    monthHeader: {
        marginBottom: 15
    },
    sectionListItemContainer: {
        marginTop: 2,
        marginBottom: 12
    },
    eventInfoContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    info: {
        marginLeft: 40
    }

});


const listData = [

    {
        data: [
            {
            id: 1,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-01-02",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
             {
            id: 2,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-01-05",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
             {
            id: 3,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-01-07",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            }
        ],
        title: 'THIS MONTH'
    },
    {
        data: [
            {
            id: 4,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-02-10",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
                    {
            id: 5,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-02-13",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
                    {
            id: 6,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-02-22",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            }
        ],
        title: 'FEB'
    },
    {
        data: [
            {
            id: 7,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-03-02",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
            {
            id: 8,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            },
            {
            id: 9,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-03-02",
            description: 'Esse velit eiusmod dolore consequat cupidatat reprehenderit amet laboris. Labore quis dolore ex excepteur voluptate aliqua ea commodo. Minim proident labore consequat nulla ullamco sint. Adipisicing reprehenderit cupidatat mollit Lorem esse aliqua amet occaecat amet in. Qui incididunt qui cupidatat aliquip nisi do amet dolor qui eiusmod.'
            }
        ],
        title: 'MAR'
    }
]
