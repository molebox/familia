import React from "react";
import { View, StyleSheet, Text } from "react-native";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={filterStyles.container}>
        <View style={filterStyles.main}>
          <Text style={filterStyles.textStyle}>
            SOME FILTER HERE - SKYDIVING - BASE JUMPING ETC...
          </Text>
        </View>
      </View>
    );
  }
}

const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15000f",
    alignSelf: "stretch"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white"
  }
});

export default Filter;
