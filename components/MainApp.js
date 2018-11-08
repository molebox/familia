import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import TopBarNav from 'top-bar-nav';
import Schedule from './schedule/Schedule';
import Filter from './Filter';
import Share from './Share';
import Merch from './Merch';

const Scene = ({ index }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{index}</Text>
  </View>
);

const ROUTES = {
  Scene,
  Schedule,
  Filter,
  Share,
  Merch
  // ideally you would have a ROUTES object with multiple React component scenes
};

// There are three types of labels (image, text, and element)
const ROUTESTACK = [
  { text: 'schedule', title: 'Schedule' },
  { text: 'filter', title: 'Filter' },
  { text: 'share', title: 'Share' },
  { text: 'merch', title: 'Merch' }
];

export default class MainApp extends Component {
  render() {
    return (
      <View style={styles.container}>
      <TopBarNav
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
          imageStyle={styles.imageStyle}
          sidePadding={40} // Can't set sidePadding in headerStyle because it's needed to calculate the width of the tabs
          inactiveOpacity={1}
          fadeLabels={true}
      />
  </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15000f',
  },
  headerStyle: {
      borderBottomWidth: 1,
      borderColor: '#15000f',
      backgroundColor: '#15000f'
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white'
},
  underlineStyle: {
      height: 3.6,
      backgroundColor: '#ffc300',
      width: 50
  }
});
