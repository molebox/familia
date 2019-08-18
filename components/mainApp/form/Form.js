import React, { Component } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { Button, FormLabel } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import Input from "./Input";
import Date from "./Date";

const date = new Date();
// const date = moment().format('MMMM Do YYYY, h:mm:ss a');

const initialValues = {
  eventName: "",
  location: "",
  date: date,
  creatorsName: "",
  contactNumber: ""
};

export default class Form extends Component {
  state = {
    isDateTimePickerVisible: false
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleSubmit = async (value, bag) => {
    try {
      await Alert.alert(JSON.stringify(value)); // firebase call here
    } catch (error) {
      bag.SetSubmitting(false);
      bag.setErrors(error);
    }
  };

  _closeDatePicker = closePicker => {
    this.setState({ isDateTimePickerVisible: closePicker });
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={this._handleSubmit}
          validationSchema={Yup.object().shape({
            eventName: Yup.string().required("event name is required"),
            location: Yup.string().required("location is required"),
            date: Yup.date().required("date is required"),
            creatorsName: Yup.string().required("your name is required"),
            contactNumber: Yup.number().required("your number is required")
          })}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting
          }) => (
            <React.Fragment>
              <Input
                label="Event Name"
                autoCapitalize="none"
                value={values.eventName}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="eventName"
                error={touched.eventName && errors.eventName}
              />
              <Input
                label="Location"
                autoCapitalize="none"
                value={values.location}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="location"
                error={touched.location && errors.location}
              />
              <Button
                raised
                fontWeight="500"
                fontSize={20}
                buttonStyle={styles.button}
                title="Select Date"
                onPress={this._showDateTimePicker}
                disabled={false}
              />
              <Date
                isVisible={this.state.isDateTimePickerVisible}
                showDatePicker={this._closeDatePicker}
                onChange={setFieldValue}
                error={touched.date && errors.date}
                onCancel={this._hideDateTimePicker}
                name="date"
                value={values.date}
              />
              <Input
                label="Creators Name"
                autoCapitalize="none"
                value={values.creatorsName}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="creatorsName"
                error={touched.creatorsName && errors.creatorsName}
              />
              <Input
                label="Contact Number"
                autoCapitalize="none"
                value={values.contactNumber}
                onChange={setFieldValue}
                onTouch={setFieldTouched}
                name="contactNumber"
                error={touched.contactNumber && errors.contactNumber}
              />
              <Button
                raised
                fontWeight="500"
                fontSize={20}
                buttonStyle={styles.button}
                title="SUBMIT"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </React.Fragment>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#15000f"
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: "#ffc300",
    borderColor: "#ffc300",
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white"
  }
});
