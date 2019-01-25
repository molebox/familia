import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import {Text, Spinner, Container} from 'native-base';

import _ from 'lodash';

import { database } from '../../../config/config';
import CustomIcon from '../../mainApp/utilities/CustomIcon';
import Button from './../../mainApp/utilities/Button';


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
            eventSelected: false
        }
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

    acceptEvents = () => {
        // firebase accept that shit
        console.lof('accepted');
        this.setState({})
    }

    deleteEvents = () => {
        // firebase accept that shit
        console.lof('deleted');
    }

    handleAccept = () => this.setState({acceptChecked: !this.state.acceptChecked});

    handleDelete = () => this.setState({deleteChecked: !this.state.deleteChecked});

    handleItemPress = () => this.setState({eventSelected: !this.state.eventSelected});

    onSubmit = (formData) => {
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
                    <Text style={styles.title}>Select to Accept</Text>
                    <View>
                        <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        data={this.state.listData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item}) => (
                            <View style={styles.sectionListItemContainer}>
                            <TouchableOpacity 
                            style={this.state.eventSelected ? styles.itemContainerPressed : styles.itemContainer} 
                            onPress={this.handleItemPress}>
                                <View style={styles.info}>
                                    <Text style={styles.eventName}>{item.eventName.toUpperCase()}</Text>
                                    <Text style={styles.creatorsName}>Coached by {item.creatorsName}</Text>
                                    <Text style={styles.location}>{item.location}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {!!item.discipline ? (item.discipline.map((discipline, index) => {
                                        return <View key={index} style={styles.iconMargin}><CustomIcon name={discipline} size={20} style={styles.iconStyle}/></View>
                                    })) : null}
                                </View>
                            </TouchableOpacity>
                        </View>
                        )}
                        />
                    </View>  
                </View>     
                <View style={styles.acceptDeleteButtons}>
                        <Button customBtnStyle={styles.acceptBtnStyle} onPress={() => this.acceptEvents} text='ACCEPT SELECTED'/>
                        <Button customBtnStyle={styles.deleteBtnStyle} onPress={() => this.deleteEvents} text='DELETE THE REST'/>
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
        flex:1,
        width: '90%',
        height: '80%',
        margin: 10,
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
    },
    itemContainerPressed: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#ffc400',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        fontFamily: 'YRThree_Medium',
        color: '#faf9f9',
        marginVertical: 10
    },
    acceptDeleteButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 50,
        alignItems: 'center',
        alignContent: 'center',
    },
    acceptBtnStyle:{
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        width: 150,
        borderRadius: 20,
        borderColor: '#FFC300',
        borderWidth: 1,
    },
    deleteBtnStyle: {
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        width: 150,
        borderRadius: 20,
        borderColor: '#581845',
        borderWidth: 1.5,
    }

});


