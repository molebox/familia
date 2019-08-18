import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DatePicker, Picker, Form, TextInput } from "react-native-form-idable";
import Button from "../utilities/Button";
import moment from "moment";
import { f, auth, database } from "../../config/config";

import Modal from "react-native-modal";
import IconButton from "../utilities/IconButton";

const MAX_COUNT = 100;

let today = moment();
let now = today.format("YYYY-MM-DD");

export default class EventForm extends React.Component {
  state = {
    formSubmitted: false,
    descriptionVisible: false,
    descriptionCount: "",
    skySelected: false,
    baseSelected: false,
    wingSelected: false,
    coachSelected: false,
    thanksMessageVisible: false,
    // eventTitle: '',
    // location: '',
    // organiser: '',
    // email: '',
    date: new Date(),
    formValues: {},
    hasError: false,
    errors: null
  };

  toggleDescription = () => {
    this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
  };

  onSubmit = formData => {
    console.log("SUBMIT HIT!: ", formData);
    const {
      skySelected,
      baseSelected,
      wingSelected,
      coachSelected
    } = this.state;
    const fullDate = moment(formData.date);
    const date = fullDate.format("YYYY-MM-DD");

    const values = {
      eventName: formData.eventTitle,
      date,
      location: formData.location,
      creatorsName: formData.organiser,
      creatorsEmail: formData.creatorsEmail,
      description: this.state.descriptionCount,
      discipline: []
    };

    if (skySelected) {
      values.discipline.push("sky02");
    }
    if (baseSelected) {
      values.discipline.push("Base02");
    }
    if (wingSelected) {
      values.discipline.push("Wing02");
    }
    if (coachSelected) {
      values.discipline.push("Coach02");
    }

    this.setState({
      descriptionCount: "",
      skySelected: false,
      baseSelected: false,
      wingSelected: false,
      coachSelected: false,
      date: new Date(),
      formSubmitted: true,
      eventTitle: "",
      location: "",
      organiser: "",
      email: ""
    });

    // PUSH DATA TO DATBASE...
    const newPostKey = f
      .database()
      .ref()
      .child("events")
      .push().key;

    const updates = {};
    updates["/events/" + newPostKey] = values;

    return f
      .database()
      .ref()
      .update(updates);
  };

  formSummary = () => {
    return (
      <Modal
        isVisible={this.state.formSubmitted}
        onBackdropPress={() => this.setState({ formSubmitted: false })}
        onSwipe={() => this.setState({ formSubmitted: false })}
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
        <View>
          <View>
            <Text style={styles.thankYouTitle}>Thanks.</Text>
          </View>
          <View style={styles.thankYouTextContainer}>
            <Text style={styles.thankYouText}>So that's now with us.</Text>
            <Text style={styles.thankYouText}>
              Approval time will be anything between 2 and 24hrs depending on
              how busy we are.
            </Text>
            <Text style={styles.thankYouText}>
              We'll pop you a confirmation via email once your event is live.
            </Text>
            <Text style={styles.thankYouText}>FAMILIA</Text>
          </View>
          <View style={styles.signUpBtn}>
            <Button
              onPress={() => this.setState({ formSubmitted: false })}
              text="CLOSE"
            />
          </View>
        </View>
      </Modal>
    );
  };

  setSkydivingState = () =>
    this.setState({ skySelected: !this.state.skySelected });

  setBaseState = () =>
    this.setState({ baseSelected: !this.state.baseSelected });

  setWingState = () =>
    this.setState({ wingSelected: !this.state.wingSelected });

  setCoachState = () =>
    this.setState({ coachSelected: !this.state.coachSelected });

  render() {
    const {
      skySelected,
      baseSelected,
      wingSelected,
      coachSelected
    } = this.state;

    return (
      <View
        style={{
          flex: 1,
          marginTop: 100,
          margin: 10,
          backgroundColor: "#15000f",
          width: "90%"
        }}
      >
        <Form
          formStyles={formStyles}
          onSubmit={this.onSubmit}
          toastErrors
          style={styles.form}
          onValidationError={errors => {
            console.log("errors: ", errors);
            this.setState({ errors, hasError: true });
          }}
        >
          <View style={styles.disciplineContainer}>
            <View style={styles.disciplineText}>
              <Text style={styles.descriptionText}>DISCIPLINE</Text>
            </View>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.setSkydivingState}
            >
              <IconButton
                discipline="sky02"
                selected={skySelected}
                disciplineText="skydiving"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.setWingState}
            >
              <IconButton
                discipline="Wing02"
                selected={wingSelected}
                disciplineText="wingsuit"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.setBaseState}
            >
              <IconButton
                discipline="Base02"
                selected={baseSelected}
                disciplineText="base"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={this.setCoachState}
            >
              <IconButton
                discipline="Coach02"
                selected={coachSelected}
                disciplineText="coaching"
              />
            </TouchableOpacity>
          </View>
          <TextInput
            name="eventTitle"
            placeholder="EVENT TITLE"
            type="text"
            required
            autoCorrect={false}
            value={this.state.eventTitle}
            onChangeText={value => this.setState({ eventTitle: value })}
            // ref={input => { this.eventTitleInput = input }}
          />
          <DatePicker
            name="date"
            type="date"
            placeholder="DATE"
            minimumDate={new Date()}
            date={this.state.date}
            maximumDate={new Date(2030, 1, 1)}
            onChangeText={value => this.setState({ date: value })}
          />
          <TextInput
            name="organiser"
            placeholder="ORGANISER"
            type="text"
            autoCorrect={false}
            value={this.state.organiser}
            required
            onChangeText={value => this.setState({ organiser: value })}
            // ref={input => { this.organiserInput = input }}
          />
          <TextInput
            name="creatorsEmail"
            placeholder="EMAIL"
            type="email"
            autoCorrect={false}
            required
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
            // ref={input => { this.emailInput = input }}
          />
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ descriptionVisible: true })}
            >
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {!!this.state.descriptionCount
                    ? "Press to view description"
                    : "DESCRIPTION"}
                </Text>
              </View>
            </TouchableOpacity>

            <Modal
              isVisible={this.state.descriptionVisible}
              onBackdropPress={() =>
                this.setState({ descriptionVisible: false })
              }
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
                  value={
                    !!this.state.descriptionCount
                      ? this.state.descriptionCount
                      : null
                  }
                  onChangeText={value =>
                    this.setState({ descriptionCount: value })
                  }
                />
                <View style={styles.counterContainer}>
                  <Text style={styles.counter}>
                    {this.state.descriptionCount.split(" ").length}/100
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
          <TextInput
            name="location"
            placeholder="LOCATION"
            type="text"
            autoCorrect={false}
            required
            value={this.state.location}
            onChangeText={value => this.setState({ location: value })}
            // ref={input => { this.locationInput = input }}
          />

          <View style={styles.submitButton}>
            <Button type="submit" text="LIST EVENT" />
          </View>
        </Form>
        {!!this.state.hasError ? (
          <View style={styles.error}>
            <ErrorsAndWarnings error={this.state.errors} />
          </View>
        ) : null}
        {!!this.state.formSubmitted ? (
          <Modal
            isVisible={this.state.formSubmitted}
            onBackdropPress={() => this.setState({ formSubmitted: false })}
            onSwipe={() => this.setState({ formSubmitted: false })}
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
            <View>
              <View>
                <Text style={styles.thankYouTitle}>Thanks.</Text>
              </View>
              <View style={styles.thankYouTextContainer}>
                <Text style={styles.thankYouText}>So that's now with us.</Text>
                <Text style={styles.thankYouText}>
                  Approval time will be anything between 2 and 24hrs depending
                  on how busy we are.
                </Text>
                <Text style={styles.thankYouText}>
                  We'll pop you a confirmation via email once your event is
                  live.
                </Text>
                <Text style={styles.thankYouText}>FAMILIA</Text>
              </View>
              <View style={styles.signUpBtn}>
                <Button
                  onPress={() => this.setState({ formSubmitted: false })}
                  text="CLOSE"
                />
              </View>
            </View>
          </Modal>
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
    backgroundColor: "#15000f"
  },
  form: {
    // borderTopWidth: 1,
    // borderTopColor: '#ddd',
  },
  submitButton: {
    marginTop: 50,
    alignItems: "center"
  },
  descriptionContainer: {
    backgroundColor: "#15000f",
    borderBottomWidth: 0.5,
    borderBottomColor: "#81e6fc"
  },
  disciplineContainer: {
    backgroundColor: "#15000f",
    borderBottomWidth: 0.5,
    borderBottomColor: "#81e6fc",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  disciplineText: {
    alignSelf: "center"
  },
  iconStyle: {
    alignSelf: "center"
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "YRThree_Light",
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#81e6fc"
  },
  textAreaContainer: {
    marginTop: 20,
    borderColor: "#81e6fc",
    borderRadius: 20,
    borderWidth: 0.5,
    height: 300,
    padding: 15,
    backgroundColor: "#15000f"
  },
  textArea: {
    color: "#81e6fc",
    fontSize: 15,
    fontWeight: "300"
  },
  counterContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  counter: {
    color: "white",
    fontFamily: "YRThree_Medium",
    fontSize: 15,
    alignSelf: "center"
  },
  modal: {
    borderWidth: 0.5
  },
  signUpBtn: {
    marginTop: 35,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  thankYouText: {
    color: "white",
    fontFamily: "YRThree_Light",
    fontSize: 15,
    paddingVertical: 10
  },
  thankYouTitle: {
    color: "white",
    fontFamily: "YRThree_Medium",
    fontSize: 35,
    fontWeight: "500",
    paddingBottom: 10
  },
  error: {
    marginVertical: 10
  }
});

const formStyles = {
  fieldContainer: {
    backgroundColor: "#15000f",
    borderBottomWidth: 0.5,
    borderBottomColor: "#81e6fc"
  },
  fieldText: {
    color: "white",
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "YRThree_Light",
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  inputContainerStyle: {},
  inputLabelContainer: {},
  activeFieldText: {
    color: "#81e6fc"
  },
  placeholderAndSelectionColors: "#81e6fc",
  activePlaceholderAndSelectionColors: "#6be0f9"
};
