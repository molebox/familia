import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import CustomIcon from "../utilities/CustomIcon";
import UserContext from "../utilities/UserContext";

import Button from "../utilities/Button";

import { auth } from "../../../config/config";

export default class UserProfile extends React.Component {
  state = {
    error: "",
    hasError: false
  };

  getUsername = context => {
    console.log("CONTEXT: ", context);
    if (!!context.user.displayName)
      return <Text style={styles.username}>{context.user.displayName}</Text>;
    if (!!context.user.name)
      return <Text style={styles.username}>{context.user.name}</Text>;
    return <Text style={styles.username}>No name found</Text>;
  };

  // checkLogoutStatus = (context) => {
  //     if (context.state.loggedIn === false) return <LoginPage/>;
  // }

  signUserOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logged out...");
      })
      .catch(error => {
        this.setState({ error: error.message, hasError: true });
      });
  };

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <View style={styles.container}>
            <View style={styles.userInfo}>
              {this.getUsername(context)}
              <Text style={styles.email}>{context.user.email}</Text>
            </View>
            <TouchableOpacity style={styles.descriptionContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>EDIT/DELETE MY EVENT</Text>
              </View>
              <View style={styles.iconContainer}>
                <CustomIcon name="edit" size={30} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.descriptionContainer}
              onPress={this.signUserOut}
            >
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>LOGOUT</Text>
              </View>
              <View style={styles.iconContainer}>
                <CustomIcon name="Logout" size={30} style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            {/* {this.checkLogoutStatus(context)} */}
            <View style={styles.closeBtn}>
              <Button onPress={this.props.closeModel} text="Close" />
            </View>
          </View>
        )}
      </UserContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: 15,
    fontWeight: "300",
    color: "white",
    fontFamily: "YRThree_Light"
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: '#15000f',
    borderBottomWidth: 0.5,
    borderBottomColor: "#81e6fc"
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "300",
    fontFamily: "YRThree_Light",
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "white"
  },
  userInfo: {
    marginBottom: 50
  },
  username: {
    color: "#FFC300",
    fontSize: 30,
    fontWeight: "300",
    fontFamily: "YRThree_Medium"
  },
  email: {
    color: "#81e6fc",
    fontSize: 12,
    fontWeight: "300",
    fontFamily: "YRThree_Light"
  },
  iconContainer: {
    alignSelf: "center"
  },
  iconStyle: {
    color: "#faf9f9"
  },
  closeBtn: {
    marginVertical: 20,
    alignItems: "center"
  },
  checkboxText: {
    fontSize: 10,
    fontWeight: "300",
    color: "#81e6fc",
    fontFamily: "YRThree_Light"
  }
});
