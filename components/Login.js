import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Touchable, TouchableHighlight, View } from 'react-native';
import SignUp from './SignUp';

export default function Login({navigation}) {
    
  const [username, setName] = useState('John Doe'); /*declaring const object with useState function*/
  const [password, setPassword] = useState('John Doe'); /*declaring const object with useState function*/
  const callComponent = () => {
    alert('you clicked sign up')
    console.log('you clicked sign up')
  }
  return (

    <View style={styles.container}>

      <View style={styles.firstBox}>
        <Text style={styles.appTitle}>Welcome to Cashback App!</Text>
      </View>

      <View style={styles.secondBox}>

        <Text style={styles.appInfo}>Enter credentials to log in</Text>

          <TextInput style={styles.userCredentials}
            placeholder='username' 
            onChangeText={(username) => setName(username)}/>

          <TextInput style={styles.userCredentials}
            placeholder='password' 
            onChangeText={(password) => setPassword(password)}/>

        <TouchableHighlight style={styles.loginFunction}

          onPress={() => {navigation.navigate('Wallet')
            alert('Logging in '+ username)
          }}>
            <Text style={styles.loginButton}>LOG IN</Text>

        </TouchableHighlight>

        <TouchableHighlight style={styles.forgotPassword}
        
            onPress={() => {

            alert('check your inbox')
            }}>

            <Text style={styles.loginButton}>forgot password?</Text>

        </TouchableHighlight>

        <TouchableHighlight style={styles.signinFunction}
        
            onPress={callComponent}>
            <Text style={styles.signinButton}>SIGN UP</Text>

        </TouchableHighlight>

      </View>

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