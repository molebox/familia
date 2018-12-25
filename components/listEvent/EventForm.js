import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Textarea, Card, CardItem} from 'native-base';
import { DatePicker, Picker, Form, TextInput } from 'react-native-form-idable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Collapsible from 'react-native-collapsible';
import Button from '../utilities/Button';
import moment from 'moment';

import ColourBars from '../colourBars/ColourBars';
import Modal from "react-native-modal";

const MAX_COUNT = 100;

let today = moment();
let now = today.format("YYYY-MM-DD");

export default class EventForm extends React.Component {

    state = {
        descriptionVisible: false,
        descriptionCount: ''
    };

    toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

    onSubmit = formData => console.log(formData);

    // onSubmit = formData => {
    //     const {discipline, eventTitle, date, location, organiser} = formData;

    //     return (
    //         <Modal
    //         isVisible={this.state.descriptionVisible}
    //         onBackdropPress={() => this.setState({ descriptionVisible: false })}
    //         onSwipe={() => this.setState({ descriptionVisible: false })}
    //         swipeDirection="left"
    //         backdropOpacity={1}
    //         animationIn="zoomInDown"
    //         animationOut="zoomOutUp"
    //         animationInTiming={1000}
    //         animationOutTiming={1000}
    //         backdropTransitionInTiming={1000}
    //         backdropTransitionOutTiming={1000}
    //         style={styles.model}
    //         >
    //         <View style={styles.textAreaContainer}>
    //             <Card>
    //                 <CardItem>
    //                     <Text>{discipline}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{eventTitle}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{date}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{location}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{organiser}</Text>
    //                 </CardItem>
    //             </Card>                   
    //         </View>

    //         </Modal>
    //     )
    // }

render() {

    return (
    <View
    style={{flex: 1, marginTop: 100, backgroundColor: '#15000f'}}
    >
        <Form
        formStyles={formStyles}
        onSubmit={this.onSubmit}
        toastErrors
        style={styles.form}
        onValidationError={errors => console.log(errors)}
        >
        <Picker name="discipline" type="icon" placeholder="DISCIPLINE" formStyles={formStyles}>
            <Picker.Item label="Skydiving" value="skydiving" />
            <Picker.Item label="Base Jumping" value="base" />
            <Picker.Item label="Wingsuit" value="wingsuit" />
            <Picker.Item label="Coaching" value="coaching" />
        </Picker>
        <TextInput name="eventTitle" placeholder="EVENT TITLE" type="text" required />
        <DatePicker
            name="date"
            type="date"
            placeholder="DATE"
            minimumDate={new Date(2018, 1, 1)}
            date={new Date(2017, 8, 1)}
            maximumDate={new Date(2030, 1, 1)}
        />
        <TextInput name="organiser" placeholder="ORGANISER" type="text" required />
        <View>
            <TouchableOpacity onPress={() => this.setState({descriptionVisible: true})}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{this.state.descriptionCount ? 'Press to view description' : 'DESCRIPTION'}</Text>
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
                    <TextInput
                    required
                    name="description"
                    type="text"
                    formStyles={formStyles}
                    placeholder={this.state.descriptionCount ? this.state.descriptionCount : 'describe the event...'}
                    placeholderTextColor="#81e6fc"
                    numberOfLines={200}
                    multiline={true}
                    maxLength={700}
                    onChangeText={(value) => this.setState({descriptionCount: value})}
                    />
                    <View style={styles.counterContainer}>
                        <Text style={styles.counter}>{this.state.descriptionCount.split(" ").length}/100</Text>
                    </View>
                </View>

            </Modal>

        </View>
        <TextInput name="location" placeholder="LOCATION" type="text" required />

        <View style={styles.submitButton}>
            <Button type='submit' text='LIST EVENT'/>
        </View>
        </Form>
            <View style={styles.coloursContainer}>
                <ColourBars/>   
            </View>
    </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        margin: 20,
        backgroundColor: '#15000f', 
    },
    form: {
        // borderTopWidth: 1,
        // borderTopColor: '#ddd',
    },
    submitButton: {
        marginTop: 50,
        alignItems: 'center'
    },
    descriptionContainer: {
        backgroundColor: '#15000f', 
        borderBottomWidth: 0.5,
        borderBottomColor: '#81e6fc',
    },
    descriptionText: {
        fontSize: 15,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingHorizontal: 20,
        paddingVertical: 12,
        color: '#81e6fc',
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
    textArea: {
        color: '#81e6fc',  
        fontSize: 15,
        fontWeight: '300',
        // fontFamily: 'YRThree_Light',  
    },
    counterContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 10
    },
    counter: {
        color: 'white',
        fontFamily: 'YRThree_Medium',
        fontSize: 15,
        alignSelf: 'center'
    },
    coloursContainer: {
        alignContent: 'center',
        alignItems: 'center',
        height: 100
    },
    modal: {
        borderWidth: 0.5
    }
});

const formStyles = {
    fieldContainer: {
        backgroundColor: '#15000f', 
        borderBottomWidth: 0.5,
        borderBottomColor: '#81e6fc',
    },
    fieldText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    inputContainerStyle: {

    },
    inputLabelContainer: {

    },
    activeFieldText: {
        color: '#81e6fc',
    },
    placeholderAndSelectionColors: '#81e6fc',
    activePlaceholderAndSelectionColors: '#6be0f9'

};