import React, { useState, Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Button,
  Alert,
} from "react-native";
import Constants from "expo-constants";

export default class App extends Component {
  _handleButtonPress = () => {
    Alert.alert("Button pressed!", "You did it!");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBox}>
          <View style={styles.buttonContainer}>
            <View style={styles.jcontainer}>
              <TouchableHighlight
                style={[styles.addButton, styles.actBtn]}
                onPress={() => {
                  alert("Card Added");
                }}
              >
                <Text style={styles.buttonText}>Add Cards</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.kcontainer}>
              <TouchableHighlight
                style={[styles.rewardsButton, styles.actBtn]}
                onPress={() => {
                  alert("Your total Rewards is: ");
                }}
              >
                <Text style={styles.buttonText}>Rewards</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.creditButton, styles.actBtn]}
                onPress={() => {
                  alert("Available Credit is: ");
                }}
              >
                <Text style={styles.buttonText}>Available Credit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.mcontainer}>
          <TouchableHighlight
            style={[styles.walletButton, styles.actBtn]}
            onPress={() => {
              alert("You clicked on wallet");
            }}
          >
            <Text style={styles.buttonText}>Wallet</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.profileButton, styles.actBtn]}
            onPress={() => {
              alert("You clicked on profile");
            }}
          >
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "space-between",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "green",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  topBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: 30,
  },
  kcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actBtn: {
    maxWidth: 100,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    textWrap: "no-wrap",
    textAlign: "center",
  },
  mcontainer: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
});