import React from "react";
import {
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Text, Icon, Spinner } from "native-base";
import Collapsible from "react-native-collapsible";
import Modal from "react-native-modal";
import DateRangePicker from "./DateRangePicker";
import { Dropdown } from "react-native-material-dropdown";
import { Slider } from "react-native-elements";

import _ from "lodash";
import CustomIcon from "../utilities/CustomIcon";
import CustomDivider from "./CustomDivider";
import IconButton from "../utilities/IconButton";
import Button from "../utilities/Button";

import Month from "./Month";
import moment from "moment";
import { extendMoment } from "moment-range";
const extendedMoment = extendMoment(moment);
import Day from "./Day";
import { database } from "../../../config/config";

let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month("MMM");
let currentYear = today.year();

// Display each date there is an event
export class SectionListItem extends React.Component {
  state = {
    descriptionCollapsed: true
  };

  toggleDescription = () => {
    this.setState({ descriptionCollapsed: !this.state.descriptionCollapsed });
  };

  render() {
    let fullDay = moment(this.props.item.date);
    fullDay.day();
    const day = fullDay.format("DD");
    return (
      <View style={styles.sectionListItemContainer}>
        <View style={styles.eventInfoContainer}>
          <View>
            <Day day={day} />
          </View>
          <TouchableOpacity onPress={this.toggleDescription}>
            <View style={styles.info}>
              <Text style={styles.eventName}>
                {this.props.item.eventName.toUpperCase()}
              </Text>
              <Text style={styles.creatorsName}>
                Coached by {this.props.item.creatorsName}
              </Text>
              <Text style={styles.location}>{this.props.item.location}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={this.state.descriptionCollapsed}>
          <EventDescription
            description={this.props.item.description}
            discipline={this.props.item.discipline}
          />
        </Collapsible>
      </View>
    );
  }
}

class EventDescription extends React.Component {
  render() {
    return (
      <View style={styles.descriptionDropdown}>
        <View>
          <Icon name="arrow-up" type="SimpleLineIcons" style={styles.upArrow} />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
        <View style={styles.iconContainer}>
          {!!this.props.discipline
            ? this.props.discipline.map((item, index) => {
                return (
                  <View key={index} style={styles.iconMargin}>
                    <CustomIcon
                      name={item}
                      size={20}
                      style={styles.iconStyle}
                    />
                  </View>
                );
              })
            : null}
        </View>
      </View>
    );
  }
}

// Display the header for each section - the month - JAN/FAB etc
export class SectionHeader extends React.Component {
  render() {
    return (
      <View style={styles.monthHeader}>
        <Month month={this.props.section.title} />
      </View>
    );
  }
}

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      loading: true,
      refreshing: false,
      skySelected: false,
      baseSelected: false,
      wingSelected: false,
      coachSelected: false,
      filterOpen: false,
      selectedDates: [],
      filterApplied: false,
      locations: [],
      eventLocations: undefined,
      selectedLocation: undefined,
      locationRange: 0,
      deviceLocation: null,
      platformErrorMessage: null
    };
  }

  componentDidMount() {
    this.loadEvents();
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        platformErrorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        platformErrorMessage: 'Permission to access location was denied',
      });
    }

    let deviceLocation = await Location.getCurrentPositionAsync({});
    console.log(deviceLocation.coords.longitude, deviceLocation.coords.latitude);
    this.setState({ deviceLocation });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadEvents();
  };

  onFilter = () => {
    // this.setState({refreshing: true});
    this.filterSearch();
  };

  formatDateToMonth(date) {
    let fullDate = moment(date);
    fullDate.month();
    const month = fullDate.format("MMM");
    return month.toUpperCase();
  }

  formatDateToYear(date) {
    let fullDate = moment(date);
    fullDate.year();
    return fullDate.format("YYYY");
  }

  setSkydivingState = () =>
    this.setState({
      skySelected: !this.state.skySelected,
      filterCollapsed: false,
      filterApplied: true
    });

  setBaseState = () =>
    this.setState({
      baseSelected: !this.state.baseSelected,
      filterCollapsed: false,
      filterApplied: true
    });

  setWingState = () =>
    this.setState({
      wingSelected: !this.state.wingSelected,
      filterCollapsed: false,
      filterApplied: true
    });

  setCoachState = () =>
    this.setState({
      coachSelected: !this.state.coachSelected,
      filterCollapsed: false,
      filterApplied: true
    });

  loadEvents = async () => {
    this.setState({ listData: [] });
    const that = this;

    database
      .ref("events")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) {
          data = snapshot.val();
        }
        const listData = that.state.listData;
        const eventLocations = [];
        eventLocations.push({id: 'USER_LOCATION', value: 'Current Location'});
        const holding = [];

        for (var event in data) {
          const eventObj = data[event];

          const month = this.formatDateToMonth(eventObj.date);
          const year = this.formatDateToYear(eventObj.date);
          eventLocations.push({ id: event, value: String(eventObj.location) });

          let title;

          getCurrentMonth.month();
          const currentMonth = getCurrentMonth.format("MMM");

          if (month === currentMonth.toUpperCase()) {
            title = "THIS MONTH";
          } else if (currentYear !== parseInt(year, 10)) {
            title = `${month} - ${year}`;
          } else {
            title = month;
          }

          if (
            moment(eventObj.date).isAfter(now, "month") ||
            moment(eventObj.date).isSame(now, "month")
          ) {
            holding.push({
              data: [
                {
                  id: event,
                  eventName: eventObj.eventName,
                  location: eventObj.location,
                  description: eventObj.description,
                  creatorsName: eventObj.creatorsName,
                  date: eventObj.date,
                  discipline: eventObj.discipline
                }
              ],
              title,
              eventDate: eventObj.date
            });
          }
        }

        holding.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));

        const groupNames = Array.from(new Set(holding.map(k => k.title)));

        let groups = {};

        groupNames.forEach(k => {
          groups[k] = [];
        });

        holding.forEach(k => {
          const month = k.title;
          groups[month].push(k.data[0]);
        });

        groupNames.map(name => {
          let eventInfo = { title: "", eventDate: "", data: [] };
          for (let key in groups) {
            if (name === key) {
              eventInfo.title = name;
              eventInfo.data = groups[key];
              listData.push(eventInfo);
            }
          }
        });

        that.setState({
          loading: false,
          refreshing: false,
          eventLocations: _.uniqBy(eventLocations, "value")
        });
      })
      .catch(error => console.log("error: ", error));
  };

  toggleFilter = () => {
    this.setState({ filterCollapsed: !this.state.filterCollapsed });
    console.log("EVENT LOCATIONS: ", this.state.eventLocations);
  };

  getSelectedDates = (fromDate, toDate) =>
    this.setState({ selectedDates: [fromDate, toDate], filterApplied: true });

    getLocationSelection = (value) => {
      console.log({value});
      this.setState({selectedLocation: value});
    }

  filterSearch = async () => {
    const {
      skySelected,
      baseSelected,
      wingSelected,
      coachSelected,
      selectedDates,
      selectedLocation
    } = this.state;
    const selectedDiscipline = [];

    if (skySelected) {
      selectedDiscipline.push("sky02");
    }
    if (baseSelected) {
      selectedDiscipline.push("Base02");
    }
    if (wingSelected) {
      selectedDiscipline.push("Wing02");
    }
    if (coachSelected) {
      selectedDiscipline.push("Coach02");
    }

    this.setState({ listData: [] });
    const that = this;

    if (_.isEmpty(selectedDates) && _.isEmpty(selectedDiscipline)) {
      this.setState({ filterApplied: false });
      this.onRefresh();
    }

    database
      .ref("events")
      .once("value")
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) {
          data = snapshot.val();
        }
        const listData = that.state.listData;
        const holding = [];

        for (var event in data) {
          const eventObj = data[event];
          const eventsDate = extendedMoment(eventObj.date);
          const month = this.formatDateToMonth(eventObj.date);
          const year = this.formatDateToYear(eventObj.date);
          const range = extendedMoment.range(
            selectedDates[0],
            selectedDates[1]
          );
          let title;

          getCurrentMonth.month();
          const currentMonth = getCurrentMonth.format("MMM");

          if (month === currentMonth.toUpperCase()) {
            title = "THIS MONTH";
          } else if (currentYear !== parseInt(year, 10)) {
            title = `${month} - ${year}`;
          } else {
            title = month;
          }

          if (
            moment(eventObj.date).isAfter(now, "month") ||
            moment(eventObj.date).isSame(now, "month")
          ) {
            // if the selected disciplines are a match
            if (_.isEqual(eventObj.discipline, selectedDiscipline)) {
              holding.push({
                data: [
                  {
                    id: event,
                    eventName: eventObj.eventName,
                    location: eventObj.location,
                    description: eventObj.description,
                    creatorsName: eventObj.creatorsName,
                    date: eventObj.date,
                    discipline: eventObj.discipline
                  }
                ],
                title,
                eventDate: eventObj.date
              });

              // if the selected dates are a match
            } else if (!_.isEmpty(selectedDates) && eventsDate.within(range)) {
              holding.push({
                data: [
                  {
                    id: event,
                    eventName: eventObj.eventName,
                    location: eventObj.location,
                    description: eventObj.description,
                    creatorsName: eventObj.creatorsName,
                    date: eventObj.date,
                    discipline: eventObj.discipline
                  }
                ],
                title,
                eventDate: eventObj.date
              });
            }
          }
        }

        holding.sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));

        const groupNames = Array.from(new Set(holding.map(k => k.title)));

        let groups = {};

        groupNames.forEach(k => {
          groups[k] = [];
        });

        holding.forEach(k => {
          const month = k.title;
          groups[month].push(k.data[0]);
        });

        groupNames.map(name => {
          let eventInfo = { title: "", eventDate: "", data: [] };
          for (let key in groups) {
            console.log("KEY:", key);
            if (name === key) {
              eventInfo.title = name;
              eventInfo.data = groups[key];
              listData.push(eventInfo);
            }
          }
        });

        // function sortByMonth(arr) {
        //     arr.sort(function(a, b){
        //         return monthOrder.indexOf(a.title)
        //              - monthOrder.indexOf(b.title);
        //     });
        //   };
        //   sortByMonth(listData);
        that.setState({
          loading: false,
          refreshing: false,
          filterOpen: false,
          selectedDates: [],
          filterApplied: true,
          skySelected: false,
          baseSelected: false,
          wingSelected: false,
          coachSelected: false
        });
      })
      .catch(error => console.log("error: ", error));
  };

  render() {
    const {
      skySelected,
      baseSelected,
      wingSelected,
      coachSelected,
      platformErrorMessage
    } = this.state;

    if (!!this.state.loading) {
      return (
        <View style={styles.spinner}>
          <Spinner color="#81e6fc" />
        </View>
      );
    }
    if (platformErrorMessage) {
      <View style={styles.error}>
          <ErrorsAndWarnings error={platformErrorMessage} />
      </View>
    }

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.filterTextContainer}
            onPress={() => this.setState({ filterOpen: true })}
          >
            <Text style={styles.filterText}>FILTER</Text>
          </TouchableOpacity>

          <Modal
            isVisible={this.state.filterOpen}
            onBackdropPress={() => this.setState({ filterOpen: false })}
            backdropOpacity={1}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            style={styles.model}
          >
            <View style={filterStyles.filterAreaContainer}>
              <View style={{ flex: 1 }}>
                {/* <View style={filterStyles.center}>
                  <Text style={filterStyles.textStyle}>LOCATION</Text>
                </View> */}

                <View style={filterStyles.location}>
                  <View style={filterStyles.center}>
                    <Dropdown
                      label="LOCATION"
                      textColor="#81e6fc"
                      baseColor="#ffc300"
                      itemColor="white"
                      selectedItemColor="#ffc300"
                      containerStyle={filterStyles.locationContainer}
                      pickerStyle={filterStyles.locationPickerStyle}
                      data={this.state.eventLocations}
                      onChangeText={(value) => this.getLocationSelection(value)}
                    />
                  </View>
                 
                  <View style={filterStyles.sliderContainer}>
                    <View style={filterStyles.center}>
                      <Text style={filterStyles.locationRadiusTextStyle}>
                        Show events in a{" "}
                        <Text style={filterStyles.radiusText}>
                          {this.state.locationRange}km
                        </Text>{" "}
                        radius
                      </Text>
                    </View>
                    <Slider
                      value={this.state.locationRange}
                      maximumValue={100}
                      step={10}
                      animateTransitions={true}
                      thumbTintColor="#ffc300"
                      thumbTouchSize={{ width: 80, height: 80 }}
                      onValueChange={value =>
                        this.setState({ locationRange: value })
                      }
                    />
                  </View>
                </View>

                {/* <CustomDivider /> */}
              </View>
              <View style={{ flex: 1 }}>
                <View style={filterStyles.center}>
                  <Text style={filterStyles.textStyle}>FILTER by</Text>
                </View>
                <View>
                  <View style={filterStyles.disciplineContainer}>
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
                </View>
              </View>
              <View style={{ flex: 3 }}>
                <View style={filterStyles.center}>
                  <Text style={filterStyles.textStyle}>FROM DATE</Text>
                </View>
                <DateRangePicker
                  initialRange={[now, now]}
                  onSuccess={(s, e) => this.getSelectedDates(s, e)}
                  theme={{
                    markColor: "#ffc300",
                    markTextColor: "#15000f",
                    calendarBackground: "#15000f",
                    textSectionTitleColor: "white",
                    monthTextColor: "white",
                    selectedDayBackgroundColor: "#ffc300",
                    selectedDayTextColor: "#15000f",
                    todayTextColor: "#ff5733",
                    dayTextColor: "white",
                    textDisabledColor: "grey",
                    arrowColor: "#81e6fc",
                    textDayFontFamily: "YRThree_Medium",
                    textMonthFontFamily: "YRThree_Light",
                    textDayHeaderFontFamily: "YRThree_Medium",
                    textDayFontSize: 12
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                <Button
                  onPress={this.onFilter}
                  text={this.state.filterApplied ? "FILTER" : "CLOSE"}
                />
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.list}>
          <SectionList
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            renderItem={({ item, index }) => {
              return <SectionListItem item={item} index={index} />;
            }}
            renderSectionHeader={({ section }) => {
              return <SectionHeader section={section} />;
            }}
            sections={this.state.listData}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15000f"
  },
  filterAreaContainer: {
    flex: 1,
    marginTop: 20,
    borderColor: "#81e6fc",
    borderRadius: 20,
    borderWidth: 0.5,
    height: "90%",
    padding: 5,
    backgroundColor: "#15000f"
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
    fontFamily: "YRThree_Medium",
    marginVertical: 20
  },
  underConstruction: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffc300",
    fontFamily: "YRThree_Medium",
    marginVertical: 20
  },
  center: {
    alignSelf: "center",
    justifyContent: "center"
  },
  disciplineContainer: {
    backgroundColor: "#15000f",
    borderBottomWidth: 0.5,
    borderBottomColor: "#fbf7f7",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 15
  },
  disciplineText: {
    alignSelf: "center"
  },
  calendar: {
    paddingTop: 5,
    marginHorizontal: 15
  },
  signUpBtn: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  location: {
    marginHorizontal: 10
  },
  locationContainer: {
    backgroundColor: "#15000f",
    width: 170
  },
  locationPickerStyle: {
    backgroundColor: "#15000f",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  locationRadiusTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
    fontFamily: "YRThree_Medium",
    marginVertical: 10
  },
  radiusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ffc300",
    fontFamily: "YRThree_Medium"
  },
  sliderContainer: {
    marginBottom: 30
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15000f"
  },
  eventName: {
    fontSize: 15,
    fontWeight: "300",
    color: "#81e6fc"
  },
  creatorsName: {
    fontSize: 13,
    fontWeight: "300",
    color: "#faf9f9"
  },
  location: {
    fontSize: 12,
    fontWeight: "300",
    color: "#898688"
  },
  list: {
    width: "80%",
    height: "85%",
    margin: 20,
    marginTop: 50
  },
  descriptionContainer: {
    flex: 1,
    flexWrap: "wrap",
    alignContent: "center",
    marginLeft: 35
  },
  description: {
    fontSize: 12,
    fontWeight: "300",
    color: "white"
  },
  descriptionDropdown: {
    marginTop: 15
  },
  monthHeader: {
    marginBottom: 15
  },
  sectionListItemContainer: {
    marginTop: 2,
    marginBottom: 12
  },
  eventInfoContainer: {
    flex: 1,
    flexDirection: "row"
  },
  info: {
    marginLeft: 35
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center"
  },
  iconStyle: {
    color: "#faf9f9"
  },
  iconMargin: {
    padding: 5
  },
  upArrow: {
    color: "#81e6fc",
    fontSize: 20,
    alignSelf: "center",
    padding: 10
  },
  filterTextContainer: {
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center"
  },
  filterText: {
    color: "#ffc400",
    fontSize: 19,
    fontWeight: "300",
    fontFamily: "YRThree_Medium"
  },
  spinner: {
    flex: 1,
    justifyContent: "center"
  },
  error: {
    marginVertical: 3,
    alignItems: "center"
  }
});
