import React from 'react';
import {View, StyleSheet, SectionList, TouchableOpacity, RefreshControl} from 'react-native';
import { Container, Content , Text, Icon, Spinner } from 'native-base';
import Collapsible from 'react-native-collapsible';
import {f, auth, database} from '../../config/config';
import _ from 'lodash';

import CustomIcon from '../utilities/CustomIcon';

import Month from './Month';
import moment from 'moment';
import Day from './Day';


let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month('MMM');

const monthOrder = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEPT',
    'OCT',
    'NOV', 
    'DEC'
];

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
                            <Text style={styles.eventName}>{this.props.item.eventName.toUpperCase()}</Text>
                            <Text style={styles.creatorsName}>Coached by {this.props.item.creatorsName}</Text>
                            <Text style={styles.location}>{this.props.item.location}</Text>
                        </View>
                        </TouchableOpacity>
                </View>
                <Collapsible collapsed={this.state.descriptionCollapsed}>
                    <EventDescription description={this.props.item.description} discipline={this.props.item.discipline}/>
                </Collapsible>
            </View>
        );
    }
}

class EventDescription extends React.Component {
    
    render() {
        return (
            <View style={styles.descriptionDropdown}>
                <View >
                    <Icon name='arrow-up' type="SimpleLineIcons" style={styles.upArrow} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
                <View style={styles.iconContainer}>
                {!!this.props.discipline ? (this.props.discipline.map((item, index) => {
                    return <View key={index} style={styles.iconMargin}><CustomIcon name={item} size={20} style={styles.iconStyle}/></View>
                })) : null}
                </View>
            </View>
        );
    }
}

// Display the header for each section - the month - JAN/FAB etc
class SectionHeader extends React.Component {
    render() {
        return (
        <View style={styles.monthHeader}>
            <Month month={this.props.section.title}/>
        </View>
        );
    }
}

export default class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterCollapsed: true,
            listData: [],
            loading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        this.loadEvents();
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.loadEvents();
    }
    
    formatDateToMonth(date) {
        let fullDate = moment(date);
        fullDate.month();     
        const month = fullDate.format('MMM');   
        return month.toUpperCase();
    }

    loadEvents = async() => {
        this.setState({listData: []});
        const that = this;

        database.ref('events').once('value').then((snapshot) => {
            const exists = (snapshot.val() !== null);
            if (exists) {
                data = snapshot.val();
            }
            const listData = that.state.listData;

            const holding = [];

            for(var event in data) {
                const eventObj = data[event]; 

                    const month = this.formatDateToMonth(eventObj.date);   
                    let title;   

                    getCurrentMonth.month();
                    const currentMonth = getCurrentMonth.format('MMM');

                    if (month === currentMonth.toUpperCase()) {
                        title = 'THIS MONTH';  
                    } else {
                        title = month;                         
                    }

                    holding.push(
                        {
                           data: [
                               {
                               id: event,
                               eventName: eventObj.eventName,
                               location: eventObj.location,
                               description: eventObj.description,
                               creatorsName: eventObj.creatorsName,
                               date: eventObj.date,
                               discipline: eventObj.discipline,
                               }
                           ],
                           title
                           }    
                       );
            }

            holding.sort((a, b) => a.title < b.title ? -1 : 1);
    
               const groupNames = Array.from(new Set(holding.map(k  => k.title)));
    
               let groups = {};
    
               groupNames.forEach(k => {
                groups[k] = [];
                });
    
                holding.forEach(k => {
                const month = k.title;
              groups[month].push(k.data[0]);
            });

            groupNames.map((name) => {
                let monthInfo = {title: '', data: []};
                for(let key in groups) {
                    if (name === key) {
                        monthInfo.title = name
                        monthInfo.data = groups[key];
                        listData.push(monthInfo);
                    }
                }
            });

            function sortByMonth(arr) {             
                arr.sort(function(a, b){
                    return monthOrder.indexOf(a.title)
                         - monthOrder.indexOf(b.title);
                });
              };
              sortByMonth(listData);
              that.setState({loading: false, refreshing: false});

        }).catch(error => console.log('error: ', error));
    }


    toggleFilter = () => {
        this.setState({ filterCollapsed: !this.state.filterCollapsed });
    };

    render() {

        if (!!this.state.loading) {
            return (
                <View style={styles.spinner}>
                    <Spinner color="#81e6fc"/>
                </View>
            )
        }

        return (
            <Container style={styles.container}>
                <TouchableOpacity style={styles.filterTextContainer} onPress={this.toggleFilter}>
                    <Text style={styles.filterText}>FILTER</Text>
                </TouchableOpacity>
                <Collapsible collapsed={this.state.filterCollapsed}>
                    <CustomIcon name="Rate" size={50} style={styles.iconStyle}/>
                </Collapsible>
                <View style={styles.list}>
                <SectionList
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                renderItem={({item, index}) => {
                    return <SectionListItem item={item} index={index}/>
                }}
                renderSectionHeader={({section}) => {
                    return <SectionHeader section={section}/>
                }}
                sections={this.state.listData}
                keyExtractor={(item, index) => item + index}
                />
            </View>
        </Container>   
    );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#15000f', 
    },
    coloursContainer: {
        alignContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    eventName: {
        fontSize: 15,
        fontWeight: '300',
        color: '#81e6fc',
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
        height: '85%',
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
        color: '#faf9f9'
    },
    iconMargin: {
        padding: 5
    },
    upArrow: {
        color: '#81e6fc',
        fontSize: 20,
        alignSelf: 'center',
        padding: 10
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
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
    }

});


const dummyData = [

    {
        data: [
            {
            id: 1,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
            date: "2018-01-02",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 2,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
            date: "2018-01-05",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
             {
            id: 3,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
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
            creatorsName: "Adrian Daszkowski",
            date: "2018-02-10",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
                    {
            id: 5,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
            date: "2018-02-13",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
                    {
            id: 6,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
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
            creatorsName: "Adrian Daszkowski",
            date: "2018-03-02",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 8,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            },
            {
            id: 9,
            eventName: "WINGS BASS AND BUTTER",
            location: "Brento, Switzerland",
            creatorsName: "Adrian Daszkowski",
            date: "2018-03-02",
            description: 'Our instructors are local to Brento, Lauterbrunnen, and Chamonix, meaning that we remain available to you after your initial training. Mt Brento is Europes most popular big wall training site with jumpable weather year-round, and the Brento BASE Schools staﬀ is located there full time. All of these courses are based in the Alps. Brento BASE Schools campus is at Monte Brento, Italy. Rock Drop operates from Chamonix, France. Coaching is available all summer in Lauterbrunnen, Switzerland. Our staﬀ includes instructors ﬂuent in French, Italian, Polish, Spanish, and English'
            }
        ],
        title: 'MAR'
    }
]
