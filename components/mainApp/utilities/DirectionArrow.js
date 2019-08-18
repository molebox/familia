import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "native-base";

export default DirectionArrow = props => (
  <Icon name={props.direction} type="AntDesign" style={styles.upArrow} />
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    opacity: 0.5,
    backgroundColor: "#fbf7f7"
  }
});
