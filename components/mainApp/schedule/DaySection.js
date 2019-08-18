import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Month from "./Month";
import moment from "moment";
import Day from "./Day";

let today = moment();
let now = today.format("YYYY-MM-DD");
let getCurrentMonth = today.month("MMM");

export default class DaySection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let monthToShow;
    let fullMonth = moment(this.props.date);
    fullMonth.month();
    const month = fullMonth.format("MMM");

    let fullDay = moment(this.props.date);
    fullDay.day();
    const day = fullDay.format("DD");

    if (getCurrentMonth === fullMonth.format("MMM")) {
      monthToShow = "This Month";
    } else {
      monthToShow = month;
    }

    return (
      <View>
        <View style={styles.monthDivider}>
          <Month style={styles.itemText} month={monthToShow.toUpperCase()} />
        </View>
        <View style={styles.inLine}>
          <View>
            <Day day={day} />
          </View>
          <View style={[styles.item]}>
            <Text style={styles.type}>{this.props.eventName}</Text>
            <Text style={styles.itemText}>Creator: {this.props.creator}</Text>
            <Text style={styles.itemText}>Location: {this.props.location}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#15000f",
    flex: 3,
    marginRight: 35
  },
  type: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "500"
  },
  itemText: {
    color: "white",
    fontSize: 15,
    fontWeight: "100"
  },
  monthDivider: {
    marginTop: 35,
    marginBottom: 10
  },
  dayStyle: {
    marginTop: 20,
    padding: 10
  },
  inLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
