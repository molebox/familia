import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBarNav from "top-bar-nav";
import ColourBars from "../mainApp/colourBars/ColourBars";
import AdminEventsList from "./events/AdminEventsList";

const Scene = ({ index }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 17 }}>{index}</Text>
  </View>
);

const ROUTES = {
  Scene,
  AdminEventsList
};

// There are three types of labels (image, text, and element)
const ROUTESTACK = [{ text: "", title: "AdminEventsList" }];

export default class AdminApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TopBarNav
            // routeStack and renderScene are required props
            routeStack={ROUTESTACK}
            renderScene={(route, i) => {
                // This is a lot like the now deprecated Navigator component
                let Component = ROUTES[route.title];
                return <Component index={i} />;
            }}
            // Below are optional props
            headerStyle={[styles.headerStyle, { paddingTop: 50 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
            textStyle={styles.textStyle}
            underlineStyle={styles.underlineStyle}
            sidePadding={30} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
            inactiveOpacity={1}
            fadeLabels={true}
        /> */}
        <View style={styles.adminApp}>
          <AdminEventsList />
        </View>
        <View style={styles.coloursContainer}>
          <ColourBars />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15000f"
  },
  headerStyle: {
    borderBottomWidth: 1,
    borderColor: "#15000f",
    backgroundColor: "#15000f"
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "YRThree_Light",
    color: "white"
  },
  underlineStyle: {
    height: 3.6,
    backgroundColor: "#ffc300",
    width: 50
  },
  coloursContainer: {
    alignContent: "center",
    alignItems: "center",
    height: 100
  },
  adminApp: {
    height: "100%"
  }
});
