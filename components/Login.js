import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View, Dimensions, ImageBackground, Image } from 'react-native';
import SignUp from './SignUp';


let deviceHeight = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width;
export default function Login({navigation}) {
    
  const [username, setName] = useState('John Doe'); /*declaring const object with useState function*/
  const [password, setPassword] = useState('John Doe'); /*declaring const object with useState function*/
  const callComponent = () => {
    alert('You clicked sign up')
    console.log('you clicked sign up')
  }
  
  return (

    <ImageBackground style ={styles.backgroundIMG} source={require('../assets/background-image.jpg')}>
    <View style={styles.container}>
        <Image style= {styles.title} source={require('../assets/welcome-back-title.png')}></Image> 

        <TextInput style={styles.userCredentials}
          placeholder='Username' 
          onChangeText={(username) => setName(username)}/>

        <TextInput style={styles.userCredentials}
          placeholder='Password' 
          onChangeText={(password) => setPassword(password)}/>

        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => {navigation.navigate('Wallet') 
        alert('Logging in '+ username)
        }}>
                  <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableHighlight style={styles.forgotPassword}

          onPress={() => {

          alert('Please check your inbox.')
          }}>

          <Text style={styles.forgotPassword}>Forgot password?</Text>

        </TouchableHighlight>
    </View>

    
   

      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    height: deviceHeight/4,
    width: deviceWidth,
    marginTop: -150,
    marginBottom: 30,
    marginLeft: -100,
},
  userCredentials: {
    width: deviceWidth/1.4,
    height: deviceHeight/10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#368208',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    paddingLeft: 15,
    color: '#8B8989'
  },
  backgroundIMG: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: deviceWidth/1.4,
    height: deviceHeight/8.5,
    justifyContent: 'center',
    backgroundColor: '#368208',
    borderRadius: 20,
    marginVertical: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: deviceHeight/26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: deviceHeight/30,
    marginLeft: 5,
    marginTop: 10,
    color: "#1A3E04",
    marginRight: -85,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
  });