import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import {Formik} from 'formik';
import Button from '../utilities/Button';
import {Spinner} from 'native-base';
import moment from 'moment';
import { f, auth, database} from '../../config/config';
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-modal-datetime-picker';
import IconButton from '../utilities/IconButton';
import ErrorsAndWarnings from '../utilities/ErrorsAndWarnings';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
    eventTitle: yup.string().required('Event title is required'),
    email: yup.string().email().required('Email is required'),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required'),
    organiser: yup.string().required('Organiser is required'),
    link: yup.string().url(),
    // date: yup.date().required('A date is required')
})

const initialValues = {
    discipline: [],
    eventTitle: '',
    date: Date,
    organiser: '',
    email: '',
    description: '',
    location: '',
    link: ''
}
let today = moment();

export default class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          formData:{},
          skySelected: false,
          baseSelected: false,
          wingSelected: false,
          coachSelected: false,
          descriptionCount: '',
          isDateTimePickerVisible: false,
          date: new Date(),
          formSubmitted: false
        }
      }

      toggleDescription = () => {
        this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
    };

    onSubmit = (formData) => {
        console.log('SUBMIT HIT!: ', formData);
        const {skySelected, baseSelected, wingSelected, coachSelected} = this.state;
        const fullDate = moment(formData.date);
        const formattedDate = fullDate.format('YYYY-MM-DD');

        const values = {
            eventName: formData.eventTitle,
            date: formattedDate,
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

        console.log('FORM VALUES: ', values);

        // PUSH DATA TO DATBASE...
        const newPostKey = f.database().ref().child('events').push().key;
  
        const updates = {};
        updates['/events/' + newPostKey] = values;

        return f.database().ref().update(updates);
    }

    setSkydivingState = () => this.setState({ skySelected: !this.state.skySelected });

    setBaseState = () => this.setState({ baseSelected: !this.state.baseSelected });

    setWingState = () => this.setState({ wingSelected: !this.state.wingSelected });

    setCoachState = () => this.setState({ coachSelected: !this.state.coachSelected });

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({date});
        this._hideDateTimePicker();
      };

      formatDate(date) {
        let fullDate = moment(date);
        const chosenDate = fullDate.format('Do MMMM YYYY');  
        return chosenDate.toUpperCase();
    }

    render() {
        const {skySelected, baseSelected, wingSelected, coachSelected} = this.state;

        return (
            <View style={{flex: 1, marginTop: 100, margin: 10, backgroundColor: '#15000f', width: '90%'}}>
                <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    this.onSubmit(values);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                        this.setState({
                            skySelected: false,
                            baseSelected: false,
                            wingSelected: false,
                            coachSelected: false,
                            formSubmitted: true, 
                            date: new Date
                        });
                        actions.resetForm();
                    }, 2000);
                    
                }}
                validationSchema={validationSchema}
                >
                {({handleChange, handleSubmit, values, isSubmitting, handleBlur, errors, handleReset, setFieldValue, touched, isValid}) => (
                <View>
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
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.fieldText}
                        placeholder="EVENT TITLE" 
                        placeholderTextColor="#81e6fc"
                        value={values.eventTitle || ''}
                        onChangeText={handleChange('eventTitle')}
                        onBlur={handleBlur('eventTitle')}
                        />
                      {!!errors.eventTitle && !!touched.eventTitle ? <View style={styles.error}><ErrorsAndWarnings error={errors.eventTitle}/></View> : null}
                    </View>
                    <View>
                    <TouchableOpacity onPress={() => this.setState({isDateTimePickerVisible: true})}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.descriptionText}>{!!this.state.date ? this.formatDate(this.state.date) : 'DATE'}</Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    minimumDate={new Date()}
                    onDateChange={date => setFieldValue('date', date)}
                    />
                    {!!errors.date && !!touched.date ? <View style={styles.error}><ErrorsAndWarnings error={errors.date}/></View> : null}
                    </View>

        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.fieldText}
            placeholder="ORGANISER" 
            placeholderTextColor="#81e6fc"
            value={values.organiser || ''}
            onChangeText={handleChange('organiser')}
            onBlur={handleBlur('organiser')}
            />
            {!!errors.organiser && !!touched.organiser ? <View style={styles.error}><ErrorsAndWarnings error={errors.organiser}/></View> : null}
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.fieldText}
            placeholder="EMAIL" 
            placeholderTextColor="#81e6fc"
            value={values.email || ''}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            />
            {!!errors.email && !!touched.email ? <View style={styles.error}><ErrorsAndWarnings error={errors.email}/></View> : null}
        </View>
        <View>
            <TouchableOpacity onPress={() => this.setState({descriptionVisible: true})}>
            <View style={styles.inputContainer}>
                <Text style={styles.descriptionText}>{!!values.description ? 'Press to view description' : 'DESCRIPTION'}</Text>
                {!!errors.description && touched.description ? <View style={styles.error}><ErrorsAndWarnings error={errors.description}/></View> : null}
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
                        style={styles.fieldText}           
                        placeholder="describe the event..."
                        placeholderTextColor="#81e6fc"
                        numberOfLines={200}
                        multiline={true}
                        maxLength={700}
                        value={values.description || ''}
                        onChangeText={handleChange('description')}
                        />
                        <View style={styles.counterContainer}>
                            <Text style={styles.counter}>{values.description.split(" ").length}/100</Text>
                        </View>
                    </View>
                </Modal>

        </View>
        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.fieldText}
            placeholder="LOCATION" 
            placeholderTextColor="#81e6fc"
            value={values.location || ''}
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
            />
           {!!errors.location && !!touched.location ? <View style={styles.error}><ErrorsAndWarnings error={errors.location}/></View> : null}
        </View>
        <View style={styles.inputContainer}>
            <TextInput 
            style={styles.fieldText}
            placeholder="LINK" 
            placeholderTextColor="#81e6fc"
            value={values.link || ''}
            onChangeText={handleChange('link')}
            onBlur={handleBlur('link')}
            />
            {!!errors.link && !!touched.link ? <View style={styles.error}><ErrorsAndWarnings error={errors.link}/></View> : null}
        </View>
            {!!isSubmitting ? (
                <Spinner color="#81e6fc"/>
            ) : (
                <View style={styles.submitButton}>
                    <Button type="submit" disabled={!isValid} onPress={handleSubmit} text='LIST EVENT'/>
                </View>
            )}
                <View style={styles.submitButton}>
                    <Button disabled={isSubmitting} onPress={() => handleReset(initialValues)} text='RESET'/>
                </View>
              
        </View>
                )}         
                </Formik>

        {!!this.state.formSubmitted ? (
            <View>
                <Modal
                    isVisible={this.state.formSubmitted}
                    onBackdropPress={() => this.setState({ formSubmitted: false })}
                    onSwipe={() => this.setState({ formSubmitted: false })}
                    swipeDirection="left"
                    backdropOpacity={1}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={2000}
                    animationOutTiming={2000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={2000}
                    style={styles.model}
                    >
                <View>
                    <View>
                        <Text style={styles.thankYouTitle}>Thanks.</Text>
                    </View>    
                    <View style={styles.thankYouTextContainer}>
                        <Text style={styles.thankYouText}>So that's now with us.</Text>
                        <Text style={styles.thankYouText}>Approval time will be anything between 2 and 24hrs depending on how busy we are.</Text>
                        <Text style={styles.thankYouText}>We'll pop you a confirmation via email once your event is live.</Text>
                        <Text style={styles.thankYouText}>FAMILIA</Text>
                    </View>     
                    <View style={styles.signUpBtn}>
                        <Button
                        onPress={() => this.setState({formSubmitted: false})}
                        text="CLOSE"
                        />
                    </View>
                </View>

            </Modal>
            </View>
        ) : null}
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
    submitButton: {
        marginVertical: 20,
        alignItems: 'center'
    },
    inputContainer: {
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
    fieldText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '300',
        fontFamily: 'YRThree_Light',
        paddingHorizontal: 20,
        paddingVertical: 12,
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
    },
    signUpBtn: {
        marginTop: 35,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thankYouText: {
        color: 'white',
        fontFamily: 'YRThree_Light',
        fontSize: 15,
        paddingVertical: 10
    },
    thankYouTitle: {
        color: 'white',
        fontFamily: 'YRThree_Medium',
        fontSize: 35,
        fontWeight: '500',
        paddingBottom: 10
    },
    error: {
        marginVertical: 3,
        alignItems: 'center'
    }
});




