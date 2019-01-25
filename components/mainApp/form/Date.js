import React, { Component } from 'react'
import {FormValidationMessage} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class Date extends Component {

  _handleChange = (date) => {
    this.setState({date: date});
    this.props.onChange(this.props.name, date.value);
    this.props.showDatePicker(false);
}

  render(){
    const {error, onCancel, isVisible} = this.props;
    return (
      <React.Fragment>   
        <DateTimePicker
         isVisible={isVisible}
         onConfirm={this._handleChange}
         onCancel={onCancel}
        />
        {!!error && <FormValidationMessage>{error}</FormValidationMessage>}
    </React.Fragment>
    )
  }
}