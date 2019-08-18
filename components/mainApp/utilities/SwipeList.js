import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import ListItem from "./ListItem";

export default class SwipeList extends React.Component {
  state = {
    isScrollable: true,
    data: this.props.data
  };

  setScrollEnabled(isScrollable) {
    this.setState({
      isScrollable
    });
  }

  success(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data
    });
  }

  renderItem(item) {
    return (
      <ListItem
        text={item.key}
        success={this.success}
        setScrollEnabled={isScrollable => this.setScrollEnabled(isScrollable)}
      />
    );
  }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => this.renderItem(item)}
        scrollEnabled={this.state.isScrollable}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  separatorStyle: {
    height: 1,
    backgroundColor: "#000"
  }
});
