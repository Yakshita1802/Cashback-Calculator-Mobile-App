import React, {useState} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';
import Wallet from './components/Wallet';

export default function App() {

  return(
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

const navigator = createStackNavigator(
  {
  Login : Login,
  SignUp : SignUp,
  Wallet : Wallet,
  },
  {
      initialRouteName: 'Login',
      defaultNavigationOptions:{
          title : 'App'
      }
  }
);