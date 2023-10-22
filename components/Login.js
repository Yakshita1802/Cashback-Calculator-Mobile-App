import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, View } from 'react-native';
import Constants from 'expo-constants';
import Signup from './Signup';

export default class App extends Component{
    state = {
      username: 'John Doe',
      password: 'John Doe',
    }

    verifyUsername = text => {
      this.setState({ username: text});
    };

    verifyPassword = text => {
      this.setState({ password: text});
    };
    
    callComponent = () => {
      alert('you clicked sign up')
      console.log('you clicked sign up')
    };

  render(){
    
    return (

      <View style={styles.container}>
  
        <View style={styles.firstBox}>
          <Text style={styles.appTitle}>Welcome to Cashback App!</Text>
        </View>
  
        <View style={styles.secondBox}>
  
          <Text style={styles.appInfo}>Enter credentials to log in</Text>
  
            <TextInput style={styles.userCredentials}
              placeholder='username' 
              onChangeText={this.verifyUsername}
              value={this.state.username}/>
  
            <TextInput style={styles.userCredentials}
              placeholder='password' 
              onChangeText={this.verifyPassword}
              value={this.state.password}/>
  
          <TouchableHighlight style={styles.loginFunction}
            onPress={() => {
              alert('Welcome '+this.state.username)
            }}>
              <Text style={styles.loginButton}>LOG IN</Text>
          </TouchableHighlight>
  
          <TouchableHighlight style={styles.forgotPassword}
          
              onPress={() => {
              {this.updateCredentials}
              alert('check your inbox')
              }}>
  
              <Text style={styles.loginButton}>forgot password?</Text>
  
          </TouchableHighlight>
  
          <TouchableHighlight style={styles.signinFunction}
          
              onPress={this.callComponent}>
              <Text style={styles.signinButton}>SIGN UP</Text>
  
          </TouchableHighlight>
  
        </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  
    firstBox: {
      width: 300,
      height: 100,
      borderColor: 'white',
      borderWidth: 3,
      marginBottom: 10,
      paddingTop: 30,  
    },
  
    appTitle: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
  
    appInfo: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 20,
      marginBottom: 30,
    },
  
    loginButton: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 30,
    },
    signinButton: {

        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
    },
    secondBox: {
      width: 300,
      height: 400,
      borderColor: 'white',
      borderWidth: 3,   
    },
  
    userCredentials: {
      width: 150,
      height: 30,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      borderRadius: 10,
      marginLeft: 75,
      marginRight: 75,
      marginTop: 10,
    },
  
  });