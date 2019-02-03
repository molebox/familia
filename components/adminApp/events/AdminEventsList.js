import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Text, Spinner, CheckBox, ListItem, Body, Icon } from 'native-base';
import Modal from "react-native-modal";

import _ from 'lodash';

import { database } from '../../../config/config';
import CustomIcon from '../../mainApp/utilities/CustomIcon';
import Button from './../../mainApp/utilities/Button';

import { SwipeListView } from 'react-native-swipe-list-view';


export default class AdminEventsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loading: true,
            refreshing: false,
            acceptedEvents: [],
            deletedEvents: [],
            acceptChecked: false,
            deleteChecked: false,
            eventSelected: false,
            descriptionVisible: false
        };
    }

    componentDidMount() {
        this.loadEvents();
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.loadEvents();
    }
    
    loadEvents = async() => {
        this.setState({listData: []});
        const that = this;

        database.ref('tempEvents').once('value').then((snapshot) => {
            const exists = (snapshot.val() !== null);
            if (exists) {
                data = snapshot.val();
            }
            const listData = that.state.listData;

            for(var event in data) {
                const eventObj = data[event]; 

                    listData.push(
                        {
                            id: event,
                            eventName: eventObj.eventName,
                            location: eventObj.location,
                            description: eventObj.description,
                            creatorsName: eventObj.creatorsName,
                            date: eventObj.date,
                            discipline: eventObj.discipline,
                        }
                    );
            }
              that.setState({loading: false, refreshing: false});

        }).catch(error => console.log('error: ', error));
    }

    handleAccept = (event) => {
        this.state.acceptedEvents.push(event)
        this.setState({eventSelected: !this.state.eventSelected});
    }

    handleDelete = (event, rowKey, rowMap) => {
        console.log('event: ', event.item);
        this.state.deletedEvents.push(event.item);

        // const cleanList = _.remove(this.state.listData, {id: event.item.id});

        // const index = _.findIndex(this.state.listData, { id: event.id })
        // const cleanList = this.state.listData.splice(index, 1);

        // console.log('cleanList: ', cleanList);

        this.closeRow(event, rowKey);
        const newData = [...this.state.listData];
        const prevIndex = this.state.listData.findIndex(item => item.id === event.item.id);
		newData.splice(prevIndex, 1);
		this.setState({listData: newData});
    }

    handleItemPress = () => this.setState({eventSelected: !this.state.eventSelected});

    toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

    closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
    }

    onSubmit = (formData) => {
        console.log('data: ', formData);
        const {skySelected, baseSelected, wingSelected, coachSelected, date} = this.state;

        let fullDate = moment(date);
        const chosenDate = fullDate.format('YYYY-MM-DD');

        const values = {
            eventName: formData.eventTitle,
            date: chosenDate,
            location: formData.location,
            creatorsName: formData.organiser,
            creatorsEmail: formData.email,
            description: formData.description,
            discipline: []
        };

        if (skySelected) {
            values.discipline.push('sky02');
        }
        if (baseSelected) {
            values.discipline.push('Base02');
        }
        if (wingSelected) {
            values.discipline.push('Wing02');
        }
        if (coachSelected) {
            values.discipline.push('Coach02');
        }

        // PUSH DATA TO DATBASE...
        const newPostKey = f.database().ref().child('events').push().key;
        //Set user events object
        const userId = f.auth().currentUser.uid;
        database.ref("/users/" + userId + "/usersEvents/" + newPostKey).set(values);
  
        const updates = {};
        updates['/events/' + newPostKey] = values;

        return f.database().ref().update(updates);
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
            <SafeAreaView style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.title}>Queued Events</Text>
                    <View>
                        <SwipeListView
                        useFlatList
                        tension={60}
                        friction={10}
                        disableRightSwipe={true}
                        closeOnRowBeginSwipe={true}
                        directionalDistanceChangeThreshold={1}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={this.state.listData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item}) => (                  
                            <View 
                            style={this.state.eventSelected ? styles.itemContainerPressed : styles.itemContainer} 
                            >
                                <View style={styles.info}>
                                    <Text style={styles.eventName}>{item.eventName.toUpperCase()}</Text>
                                    <Text style={styles.creatorsName}>Coached by {item.creatorsName}</Text>
                                    <Text style={styles.location}>{item.location}</Text>
                                    <Text style={styles.location}>{item.date}</Text>

                                    <TouchableOpacity onPress={() => this.setState({descriptionVisible: true})}>
                                        <View style={{marginTop: 10}}>
                                            <Text style={styles.viewDescription}>VIEW DESCRIPTION</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <Modal
                                    isVisible={this.state.descriptionVisible}
                                    onBackdropPress={() => this.setState({ descriptionVisible: false })}
                                    onSwipe={() => this.setState({ descriptionVisible: false })}
                                    swipeDirection="left"
                                    backdropOpacity={1}
                                    animationIn="zoomInDown"
                                    animationOut="zoomOutUp"
                                    animationInTiming={1000}
                                    animationOutTiming={1000}
                                    backdropTransitionInTiming={1000}
                                    backdropTransitionOutTiming={1000}
                                    style={styles.model}
                                    >
                                        <View style={styles.textAreaContainer}>
                                            <View style={{alignItems: 'center'}}>
                                                <Text style={{color: 'white', fontSize: 20, marginBottom: 10}}>Event Description</Text>
                                            </View>
                                            <Text style={styles.description}>{item.description}</Text>
                                        </View>
                                    </Modal>

                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {!!item.discipline ? (item.discipline.map((discipline, index) => {
                                        return <View key={index} style={styles.iconMargin}><CustomIcon name={discipline} size={20} style={styles.iconStyle}/></View>
                                    })) : null}
                                </View>
                                
                            </View>                                      
                        )}
                        renderHiddenItem={ (data, secId, rowId, rowMap) => (  
                            <View style={styles.rowBack}>
                                <TouchableOpacity onPress={() => this.handleDelete(data, `${secId}${rowId}`, rowMap)}><Icon style={styles.removeEvent} type="MaterialIcons" name="remove"/></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.handleAccept(data)}><Icon style={styles.addEvent} type="MaterialIcons" name="add"/></TouchableOpacity>
                            </View>
                        )}
                        // leftOpenValue={75}
                        rightOpenValue={-150}
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey].closeRow()
                            }, 2000)
                        }}
                        previewRowKey={'1'}
						previewOpenValue={-150}
						previewOpenDelay={1000}
                        />
                    </View>  
                </View>     
                    <View style={styles.confirmButton}>
                        <Button customBtnStyle={styles.acceptBtnStyle} onPress={() => this.onSubmit} text='CONFIRM'/>
                    </View> 
            </SafeAreaView>
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
        fontFamily: 'YRThree_Medium',
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
        flex: 3,
        width: '90%',
        height: '75%',
        margin: 10,
        // marginTop: 50
    },
    descriptionContainer: {
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'center',
        marginLeft: 35
    },
    description: {
        fontSize: 15,
        fontWeight: '300',
        color: 'white',
    },
    viewDescription: {
        fontSize: 15,
        fontWeight: '300',
        color: 'white',
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
        alignSelf: 'center',
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
    spinner: {
        flex: 1,
        justifyContent: 'center',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#81e6fc',
        borderRadius: 10,
        padding: 20,
        marginTop: 2,
        marginBottom: 12,
        backgroundColor: '#15000f', 
    },
    itemContainerPressed: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#ffc400',
        borderRadius: 10,
        padding: 20,
        marginTop: 2,
        marginBottom: 12,
        backgroundColor: '#15000f', 
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        fontFamily: 'YRThree_Medium',
        color: '#faf9f9',
        marginVertical: 10
    },
    confirmButton: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    acceptBtnStyle:{
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 8,
        width: 120,
        borderRadius: 20,
        borderColor: '#FFC300',
        borderWidth: 1,
    },
    addEvent: {
        fontSize: 50,
        color: '#FFC300',
    },
    removeEvent: {
        fontSize: 50,
        color: '#581845',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#15000f',
        flex: 1,
        flexDirection: 'row-reverse',
        // justifyContent: 'space-between',
        // paddingLeft: 15,
      },
    modal: {
        borderWidth: 0.5
    },
    textAreaContainer: {
        marginTop: 20,
        borderColor: '#81e6fc',
        borderRadius: 20,
        borderWidth: 0.5,
        height: 300,
        padding: 15,
        backgroundColor: '#15000f', 
    },


});


