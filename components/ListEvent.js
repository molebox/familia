import React from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import moment from 'moment';

import t from 'tcomb-form-native';
import * as  _ from 'lodash';

const Form = t.form.Form;

const eventListing = t.struct({
    eventName: t.String,
    location: t.String,
    date: t.Date,
    creatorsName: t.String,
    link: t.maybe(t.String),
    contactNumber: t.Number
});

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderColor = '#ff5733';
stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

stylesheet.textbox.normal.color = 'white';
stylesheet.controlLabel.normal.color = 'white';

stylesheet.datepicker.normal.backgroundColor = '#ffc300';
stylesheet.datepicker.normal.color = 'white';

stylesheet.dateValue.normal.borderWidth = 1;
stylesheet.dateValue.normal.fontSize = 10;
stylesheet.dateValue.normal.color = 'white';




const options = {
    stylesheet: stylesheet,
    fields: {
        date: {
          mode: 'date',
          config: {
            format: (date) => {
              const formatedDate = moment(date).format('DD.MM.YYYY');
              return formatedDate;
            },
          }, // display the Date field as a DatePickerAndroid
        }
      }
}; 


class ListEvent extends React.Component {
    constructor(props) {
        super(props);

    }

    onChange = (value) => {
        this.setState({value});
      }

    clearForm = () => {
        this.setState({eventListing: null})
    }

    onPress = () => {
        // call getValue() to get the values of the form
        const value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
          console.log(value); // value here is an instance of Person
        }
      }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.heading}>LIST YOUR EVENT</Text>
                <Form
                ref="form"
                type={eventListing}
                onChange={this.onChange}
                options={options}
                />
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableHighlight>
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#15000f',
      alignSelf: 'stretch',
      
    },
    textStyle: {
        fontSize: 15,
        fontWeight: '300',
        color: 'white'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#15000f',
        alignSelf: 'center'
      },
      button: {
        height: 40,
        width: 200,
        backgroundColor: '#ffc300',
        borderColor: '#ffc300',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      },
      heading: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        alignSelf: 'center',
        padding: 20
      }
  });
  

export default ListEvent;