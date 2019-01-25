import React from 'react';
import {View, StyleSheet, FlatList, SectionList, TouchableOpacity } from 'react-native';

import {f, auth, database} from '../../../config/config';


import CustomIcon from '../utilities/CustomIcon';
import UserContext from '../utilities/UserContext';
import LoginPage from './../../login/LoginPage';
import CustomButton from '../utilities/Button';
import Collapsible from 'react-native-collapsible';


import Month from '../schedule/Month';
import moment from 'moment';
import Day from '../schedule/Day';

import { Container, Header, Content, Button, Icon, ListItem, Text, Spinner, SwipeRow } from 'native-base';

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

// Display the header for each section - the month - JAN/FAB etc
export class SectionHeader extends React.Component {
    render() {
        return (
        <View style={styles.monthHeader}>
            {/* <Month month={this.props.section.title}/> */}
            <Text style={styles.eventName}>{this.props.section.title}</Text>
        </View>
        );
    }
}

// class EventDescription extends React.Component {
    
//     render() {
//         return (
//             <View style={styles.descriptionDropdown}>
//                 <View >
//                     <Icon name='arrow-up' type="SimpleLineIcons" style={styles.upArrow} />
//                 </View>
//                 <View style={styles.descriptionContainer}>
//                     <Text style={styles.description}>{this.props.description}</Text>
//                 </View>
//                 <View style={styles.iconContainer}>
//                 {!!this.props.discipline ? (this.props.discipline.map((item, index) => {
//                     return <View key={index} style={styles.iconMargin}><CustomIcon name={item} size={20} style={styles.iconStyle}/></View>
//                 })) : null}
//                 </View>
//             </View>
//         );
//     }
// }

// Display each date there is an event
 export class SectionListItem extends React.Component {

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
            <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            style={styles.swipeRowContainer}
            left={
              <Button success onPress={() => alert('Add')}>
                <Icon active name="add" />
              </Button>
            }
            body={
                <View style={styles.sectionListItemContainer}>
                <View style={styles.eventInfoContainer}>
                    {/* <View>
                        <Day day={day}/>
                    </View> */}
                        <TouchableOpacity onPress={this.toggleDescription}>
                        <View style={styles.info}>
                            {/* <Text style={styles.eventName}>{this.props.item.eventName.toUpperCase()}</Text> */}
                            <Text style={styles.creatorsName}>Coached by {this.props.item.creatorsName}</Text>
                            <Text style={styles.location}>{this.props.item.creatorsEmail}</Text>
                            <Text style={styles.location}>{this.props.item.location}</Text>
                        </View>
                        </TouchableOpacity>
                </View>
                {/* <Collapsible collapsed={this.state.descriptionCollapsed}>
                    <EventDescription description={this.props.item.description} discipline={this.props.item.discipline}/>
                </Collapsible> */}
            </View>
            }
            right={
              <Button danger onPress={() => alert('Trash')}>
                <Icon active name="trash" />
              </Button>
            }
          />
        );
    }
}


export default class AdminProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loading: true,
            // refreshing: false,
            showEventsCollapsed: true
        }
    }

    componentDidMount() {
        this.loadEvents();
        console.log('data: ', this.state.listData);
    }

    toggleShowEvents = () => {
        this.setState({ showEvents: !this.state.showEvents });
    };

    // onRefresh = () => {
    //     this.setState({refreshing: true})
    //     this.loadEvents();
    // }
    
    formatDateToMonth(date) {
        let fullDate = moment(date);
        fullDate.month();     
        const month = fullDate.format('MMM');   
        return month.toUpperCase();
    }

    getUsername = (context) => {
        console.log('CONTEXT: ', context);
        if (!!context.state.user.displayName) return <Text style={styles.username}>{context.state.user.displayName}</Text>;
        if (!!context.state.user.name) return <Text style={styles.username}>{context.state.user.name}</Text>;
        return <Text style={styles.username}>No name found</Text>;
    }

    checkLogoutStatus = (context) => {
        if (context.state.loggedIn === false) return <LoginPage/>;
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
                               creatorsEmail: eventObj.creatorsEmail,
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

    removeItem(key) {
       console.log('DELETED!!!');
      }

    render() {
        if (!!this.state.loading) {
            return (
                <View style={styles.spinner}>
                    <Spinner color="#81e6fc"/>
                </View>
            )
        }

        return (
           
        <UserContext.Consumer>
            {context => (
                <View style={styles.container}>
                    <View style={styles.userInfo}>
                        {this.getUsername(context)}
                        <Text style={styles.email}>{context.state.user.email}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.descriptionContainer} onPress={this.toggleShowEvents}>
                            <View style={styles.textContainer}><Text style={styles.descriptionText}>ACCEPT/DECLINE EVENTS</Text></View>
                            <View style={styles.iconContainer}><CustomIcon name="edit" size={30} style={styles.iconStyle}/></View>
                        </TouchableOpacity>
                        <Collapsible collapsed={this.state.showEvents}>
                            <View style={styles.list}>
                                <SectionList
                                    //scrollEnabled={false}
                                    // refreshing={this.state.refreshing}
                                    // onRefresh={this.onRefresh}
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
                        </Collapsible>
                    </View>
                   
                    <TouchableOpacity style={styles.descriptionContainer} onPress={context.signUserOut}>
                        <View style={styles.textContainer}><Text style={styles.descriptionText}>LOGOUT</Text></View>
                        <View style={styles.iconContainer}><CustomIcon name="Logout" size={30} style={styles.iconStyle}/></View>
                    </TouchableOpacity>
                    {this.checkLogoutStatus(context)}
                    <View style={styles.closeBtn}>
                        <CustomButton onPress={this.props.closeModel} text='Close'/>
                    </View>
                </View>
            )}     
        </UserContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    swipeRowContainer: {
        flex: 1,
        backgroundColor: '#15000f', 
    },
    text: {
        fontSize: 15,
        fontWeight: '300',
        color: 'white',
        fontFamily: 'YRThree_Light'
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#15000f', 
        borderBottomWidth: 0.5,
        borderBottomColor: '#81e6fc',
    },
    descriptionText: {
        fontSize: 15,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingHorizontal: 20,
        paddingVertical: 15,
        color: 'white',
    },
    userInfo: {
        marginBottom: 50
    },
    username: {
        color: '#FFC300',
        fontSize: 30,
        fontWeight: '300',
        fontFamily: 'YRThree_Medium',
    },
    email: {
        color: '#81e6fc',
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
    },
    iconContainer: {
        alignSelf: 'center'
    },
    iconStyle: {
        color: '#faf9f9',
    },
    iconMargin: {
        padding: 5
    },
    closeBtn: {
        marginVertical: 20,
        alignItems: 'center'
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
    upArrow: {
        color: '#81e6fc',
        fontSize: 20,
        alignSelf: 'center',
        padding: 10
    },
})