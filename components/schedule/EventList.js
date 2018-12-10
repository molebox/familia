import React from 'react';
import {View, StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import { Container, Content , Text} from 'native-base';
import Collapsible from 'react-native-collapsible';

import CustomIcon from '../utilities/CustomIcon';

import Month from './Month';
import moment from 'moment';
import Day from './Day';


let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month('MMM');

// Display each date there is an event
class SectionListItem extends React.Component {

    state = {
        descriptionCollapsed: true
    };

    toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

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
                        <TouchableOpacity onPress={this.toggleDescription}>
                        <View style={styles.info}>
                            <Text style={styles.eventName}>{this.props.item.eventName}</Text>
                            <Text style={styles.creatorsName}>{this.props.item.creatorsName}</Text>
                            <Text style={styles.location}>{this.props.item.location}</Text>
                        </View>
                        </TouchableOpacity>
                </View>
                <Collapsible collapsed={this.state.descriptionCollapsed}>
                    <EventDescription description={this.props.item.description}/>
                </Collapsible>;
            </View>
        )
    }
}

class EventDescription extends React.Component {
    render() {
        return (
            <View style={styles.descriptionDropdown}>
                <View style={styles.upArrow}>
                    <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
                    <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
                    <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
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

export default class EventList extends React.Component {

    state = {
        filterCollapsed: true
    };

    toggleFilter = () => {
        this.setState({ filterCollapsed: !this.state.filterCollapsed });
    };

    render() {
      return (
        <Container style={styles.container}>
            <TouchableOpacity style={styles.filterTextContainer} onPress={this.toggleFilter}>
                <Text style={styles.filterText}>FILTER</Text>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.filterCollapsed}>
                <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
            </Collapsible>;
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
        fontSize: 15,
        fontWeight: '300',
        color: '#81e6fc',
        // fontFamily: 'descriptions',
    },
    creatorsName: {
        fontSize: 13,
        fontWeight: '300',
        color: '#faf9f9'
    },
    location: {
        fontSize: 12,
        fontWeight: '300',
        color: '#898688'
    },
    list: {
        width: '80%',
        height: '70%',
        margin: 20,
        marginTop: 50
    },
    descriptionContainer: {
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'center',
        marginLeft: 35
    },
    description: {
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
    },
    descriptionDropdown: {
        marginTop: 15
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
        marginLeft: 35
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    iconStyle: {
        color: '#faf9f9',
    },
    upArrow: {
        alignSelf: 'center',
    },
    filterTextContainer: {
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    filterText: {
        color: '#ffc400',
        fontSize: 19,
        fontWeight: '300',
        fontFamily: 'YRThree_Medium'
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
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 2,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-01-05",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
             {
            id: 3,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-01-07",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
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
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
                    {
            id: 5,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-02-13",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
                    {
            id: 6,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-02-22",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
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
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 8,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 9,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Coached by Adrian Daszkowski",
            date: "2018-03-02",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            }
        ],
        title: 'MAR'
    }
]
