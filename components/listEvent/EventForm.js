import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatePicker, Picker, Form, TextInput } from 'react-native-form-idable';
import Collapsible from 'react-native-collapsible';
import Button from '../utilities/Button';
import moment from 'moment';
import CustomIcon from '../utilities/CustomIcon';

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
        fontSize: 17,
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
        padding: 5,
        height: 250,
    },
    textArea: {
        // height: 450,
        // justifyContent: "flex-start",
        color: 'white',
        fontSize: 17,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        
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
        fontSize: 17,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    inputContainerStyle: {

    },
    inputLabelContainer: {

    },
    inputLabel: {
        // color: '#81e6fc',
    },
    placeholderAndSelectionColors: '#81e6fc',
    activePlaceholderAndSelectionColors: '#6be0f9'

};

let today = moment();
let now = today.format("YYYY-MM-DD");

export default class EventForm extends React.Component {

    state = {
        descriptionCollapsed: true
    };

    toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

    onSubmit = formData => console.log(formData);

render() {
    return (
    <View style={styles.container}>
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
        {/* <TextInput name="description" placeholder="DESCRIPTION" type="text" required /> */}
        <TextInput name="location" placeholder="LOCATION" type="text" required />

        <View>
        <TouchableOpacity onPress={this.toggleDescription}>
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>DESCRIPTION (in 100 words)</Text>
        </View>
        </TouchableOpacity>
            <Collapsible collapsed={this.state.descriptionCollapsed}>
            <View style={styles.textAreaContainer} >
                <TextInput
                required={true}
                name="description"
                type="text"
                style={styles.textArea}
                placeholder="Describe the event..."
                placeholderTextColor="#81e6fc"
                numberOfLines={20}
                multiline={true}
                />
            </View>
            </Collapsible>;
        </View>

        <View style={styles.submitButton}>
            <Button type='submit' text='LIST EVENT'/>
        </View>
        </Form>
    </View>
    );
}
}