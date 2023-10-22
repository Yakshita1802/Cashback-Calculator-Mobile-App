import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Touchable, TouchableHighlight, View } from 'react-native';

export default function Signup(){

    return (
        <View style={styles.container}>
            <Text>Sign up?</Text>
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
  