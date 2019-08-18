import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";

import {
  FormInput,
  FormValidationMessage,
  FormLabel
} from "react-native-elements";

class Input extends PureComponent {
  state = {};

  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { label, error, ...rest } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel labelStyle={styles.labelStyle}>{label}</FormLabel>
        <FormInput
          containerStyle={styles.inputStyle}
          onChangeText={this._handleChange}
          onBlur={this._handleTouch}
          {...rest}
        />
        {!!error && <FormValidationMessage>{error}</FormValidationMessage>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center"
  },
  inputStyle: {
    borderWidth: 0,
    borderBottomColor: "#ff5733",
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "white"
  }
});

export default Input;
