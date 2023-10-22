import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';
import Wallet from './components/Wallet';

export default function App() {

  return(
    <View style={styles.container}>
      <Wallet/>
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
