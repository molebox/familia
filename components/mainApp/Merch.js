import React from "react";
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image
} from "react-native";
import { Container, Content, Text } from "native-base";

class Merch extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Container style={styles.contentContainer}>
          <Content>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.textStyle}>FAMILIA STORE</Text>
            </View>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://google.com")}
            >
              <Image
                style={{ height: 450, width: 340 }}
                source={require("../../assets/StoreLink.png")}
              ></Image>
            </TouchableOpacity>
          </Content>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15000f"
  },
  image: {
    width: 340,
    height: 450
  },
  contentContainer: {
    marginTop: 100,
    backgroundColor: "#15000f",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  cardStyle: {
    height: 450,
    width: 340
  },
  textStyle: {
    fontSize: 17,
    fontWeight: "900",
    color: "white",
    fontFamily: "YRThree_Light"
  }
});

export default Merch;
