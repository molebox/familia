import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatePicker, Picker, Form, TextInput } from 'react-native-form-idable';
import Button from '../utilities/Button';
import moment from 'moment';

import Modal from "react-native-modal";
import IconButton from '../utilities/IconButton';

const MAX_COUNT = 100;

let today = moment();
let now = today.format("YYYY-MM-DD");

export default class EventForm extends React.Component {

    state = {
        summaryVisible: false,
        descriptionVisible: false,
        descriptionCount: '',
        skySelected: false,
        baseSelected: false,
        wingSelected: false,
        coachSelected: false
    };

    toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

    onSubmit = formData => {

        const {skySelected, baseSelected, wingSelected, coachSelected} = this.state;
        const fullDate = moment(formData.date);
        const date = fullDate.format('YYYY-MM-DD');

        const formValues = {
            eventName: formData.eventTitle,
            date,
            location: formData.location,
            creatorsName: formData.organiser,
            description: this.state.descriptionCount,
            discipline: []
        };

        if (skySelected) {
            formValues.discipline.push('sky02');
        }
        if (baseSelected) {
            formValues.discipline.push('Base02');
        }
        if (wingSelected) {
            formValues.discipline.push('Wing02');
        }
        if (coachSelected) {
            formValues.discipline.push('Coach02');
        }

        // this.setState({summaryVisible: true});
        console.log('formValues: ', formValues);
    }

    // formSummary = (formValues) => {
    //     const {discipline, eventName, date, location, creatorsName, description} = formValues;

    //     return (
    //         <Modal
    //         isVisible={this.state.summaryVisible}
    //         onBackdropPress={() => this.setState({ summaryVisible: false })}
    //         onSwipe={() => this.setState({ summaryVisible: false })}
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
    //                     <Text>{eventName}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{creatorsName}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{date}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{location}</Text>
    //                 </CardItem>
    //                 <CardItem>
    //                     <Text>{description}</Text>
    //                 </CardItem>
    //             </Card>                   
    //         </View>

    //         </Modal>
    //     )
    // }

    setSkydivingState = () => {
        if (this.state.skySelected === false) {
            this.setState({skySelected: true});
        } else if (this.state.skySelected === true) {
            this.setState({skySelected: false});
        }
    }
    setBaseState = () => {
        if (this.state.baseSelected === false) {
            this.setState({baseSelected: true});
        } else if (this.state.baseSelected === true) {
            this.setState({baseSelected: false});
        }
    }
    setWingState = () => {
        if (this.state.wingSelected === false) {
            this.setState({wingSelected: true});
        } else if (this.state.wingSelected === true) {
            this.setState({wingSelected: false});
        }
    }
    setCoachState = () => {
        if (this.state.coachSelected === false) {
            this.setState({coachSelected: true});
        } else if (this.state.coachSelected === true) {
            this.setState({coachSelected: false});
        }
    }

render() {
    const {skySelected, baseSelected, wingSelected, coachSelected} = this.state;

    return (
    <View
    style={{flex: 1, marginTop: 100, margin: 10, backgroundColor: '#15000f', width: '90%'}}
    >
        <Form
        formStyles={formStyles}
        onSubmit={this.onSubmit}
        toastErrors
        style={styles.form}
        onValidationError={errors => console.log(errors)}
        >

        <View style={styles.disciplineContainer}>
            <View style={styles.disciplineText}><Text style={styles.descriptionText}>DISCIPLINE</Text></View>
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
        <TextInput name="eventTitle" placeholder="EVENT TITLE" type="text" required />
        <DatePicker
            name="date"
            type="date"
            placeholder="DATE"
            minimumDate={new Date(2019, 1, 1)}
            date={new Date(2019, 1, 1)}
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
                    placeholder="describe the event..."
                    placeholderTextColor="#81e6fc"
                    numberOfLines={200}
                    multiline={true}
                    maxLength={700}
                    value={this.state.descriptionCount ? this.state.descriptionCount : null}
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
    disciplineContainer: {
        backgroundColor: '#15000f', 
        borderBottomWidth: 0.5,
        borderBottomColor: '#81e6fc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    disciplineText: {
        alignSelf: 'center',
    },
    iconStyle: {
        alignSelf: 'center',
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
    },
    counterContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    counter: {
        color: 'white',
        fontFamily: 'YRThree_Medium',
        fontSize: 15,
        alignSelf: 'center'
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

        {/* <Picker name="discipline" type="icon" placeholder="DISCIPLINE" formStyles={formStyles}>
            <Picker.Item label="Skydiving" value="skydiving"/>
            <Picker.Item label="Base Jumping" value="base"/>
            <Picker.Item label="Wingsuit" value="wingsuit"/>
            <Picker.Item label="Coaching" value="coaching"/>
        </Picker> */}