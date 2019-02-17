import React from 'react';
import {View, StyleSheet, SectionList, TouchableOpacity, SafeAreaView} from 'react-native';
import { Container, Text, Icon, Spinner } from 'native-base';
import Collapsible from 'react-native-collapsible';
import Modal from "react-native-modal";
import {Calendar} from 'react-native-calendars';

import _ from 'lodash';
import CustomIcon from '../utilities/CustomIcon';
import CustomDivider from './CustomDivider';
import IconButton from '../utilities/IconButton';
import DirectionArrow from '../utilities/DirectionArrow';

import Month from './Month';
import moment from 'moment';
import Day from './Day';
import { database } from '../../../config/config';


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
export class SectionHeader extends React.Component {
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
            refreshing: false,
            skySelected: false,
            baseSelected: false,
            wingSelected: false,
            coachSelected: false,
            filterOpen: false
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

    setSkydivingState = () => this.setState({ skySelected: !this.state.skySelected, filterCollapsed: false });

    setBaseState = () => this.setState({ baseSelected: !this.state.baseSelected, filterCollapsed: false });

    setWingState = () => this.setState({ wingSelected: !this.state.wingSelected, filterCollapsed: false });

    setCoachState = () => this.setState({ coachSelected: !this.state.coachSelected, filterCollapsed: false });

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
                
                if (moment(eventObj.date).isAfter(now, 'month') || moment(eventObj.date).isSame(now, 'month')) {
                    
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
        const {skySelected, baseSelected, wingSelected, coachSelected} = this.state;

        if (!!this.state.loading) {
            return (
                <View style={styles.spinner}>
                    <Spinner color="#81e6fc"/>
                </View>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.filterTextContainer} onPress={() => this.setState({filterOpen: true})}>
                        <Text style={styles.filterText}>FILTER</Text>
                    </TouchableOpacity>

                        <Modal
                        isVisible={this.state.filterOpen}
                        onBackdropPress={() => this.setState({ filterOpen: false })}
                        backdropOpacity={1}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                        style={styles.model}
                        >
                            <View style={filterStyles.filterAreaContainer}>
                                <View style={{flex: 1}}>
                                    <View style={filterStyles.center}><Text style={filterStyles.textStyle}>LOCATION</Text></View>
                                    <CustomDivider/>
                                </View>  
                                <View style={{flex: 1}}>
                                    <View style={filterStyles.center}><Text style={filterStyles.textStyle}>FILTER by</Text></View>
                                        <View>
                                            <View style={filterStyles.disciplineContainer}>
                                                <TouchableOpacity style={styles.iconStyle} onPress={this.setSkydivingState}>
                                                    <IconButton discipline="sky02" selected={skySelected} disciplineText="skydiving"/>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.iconStyle} onPress={this.setWingState}>
                                                    <IconButton discipline="Wing02" selected={wingSelected} disciplineText="wingsuit"/>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.iconStyle} onPress={this.setBaseState}>
                                                    <IconButton discipline="Base02" selected={baseSelected} disciplineText="base"/>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.iconStyle} onPress={this.setCoachState}>
                                                    <IconButton discipline="Coach02" selected={coachSelected} disciplineText="coaching"/>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </View>   
                                <View style={{flex: 3}}>
                                <View style={filterStyles.center}><Text style={filterStyles.textStyle}>FROM DATE</Text></View>
                                    <Calendar
                                    style={filterStyles.calendar}
                                    markingType={'period'}
                                    // Initially visible month. Default = Date()
                                    current={now}
                                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                    minDate={now}
                                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                    maxDate={'2050-01-01'}
                                    // Handler which gets executed on day press. Default = undefined
                                    onDayPress={(day) => {console.log('selected day', day)}}
                                    // Handler which gets executed on day long press. Default = undefined
                                    onDayLongPress={(day) => {console.log('selected day', day)}}
                                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                    monthFormat={'MMMM yyyy'}
                                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                                    onMonthChange={(month) => {console.log('month changed', month)}}
                                    // Hide month navigation arrows. Default = false
                                    hideArrows={false}
                                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                    // renderArrow={(direction) => (<DirectionArrow direction={direction}/>)}
                                    // Do not show days of other months in month page. Default = false
                                    hideExtraDays={true}
                                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                    // day from another month that is visible in calendar page. Default = false
                                    disableMonthChange={true}
                                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                    firstDay={1}
                                    // Hide day names. Default = false
                                    hideDayNames={false}
                                    // Show week numbers to the left. Default = false
                                    showWeekNumbers={false}
                                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                    onPressArrowLeft={substractMonth => substractMonth()}
                                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                    onPressArrowRight={addMonth => addMonth()}
                                    theme={{
                                        backgroundColor: '#15000f',
                                        calendarBackground: '#15000f',
                                        textSectionTitleColor: 'white',
                                        monthTextColor: 'white',
                                        selectedDayBackgroundColor: '#ffc300',
                                        selectedDayTextColor: '#15000f',
                                        todayTextColor: '#ffc300',
                                        arrowColor: '#81e6fc',
                                        textDayFontFamily: 'YRThree_Medium',
                                        textMonthFontFamily: 'YRThree_Light',
                                        textDayHeaderFontFamily: 'YRThree_Medium',
                                        textDayFontSize: 12,
                                        dotColor: '#ffc300',
                                        selectedDotColor: '#ffc300',
                                      }}
                                    />
                                </View>  
                            </View>
                        </Modal>
                </View>


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
        </SafeAreaView>   
    );
    }
}

const filterStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15000f',
    },
    filterAreaContainer: {
        flex: 1,
        marginTop: 20,
        borderColor: '#81e6fc',
        borderRadius: 20,
        borderWidth: 0.5,
        height: '90%',
        padding: 5,
        backgroundColor: '#15000f', 
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        fontFamily: 'YRThree_Medium',
        marginVertical: 20
    },
    center: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    disciplineContainer: {
        backgroundColor: '#15000f', 
        borderBottomWidth: 0.5,
        borderBottomColor: '#fbf7f7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 15
    },
    disciplineText: {
        alignSelf: 'center',
    },
    calendar: {
        paddingTop: 5,
        marginHorizontal: 15
      },
  });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15000f', 
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


