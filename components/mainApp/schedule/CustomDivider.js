import React from "react";
import { StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

export default CustomDivider = () => <Divider style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    opacity: 0.5,
    backgroundColor: "#fbf7f7"
  }
});
