import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableO, Dimensions, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

let deviceHeight = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width;

export default class SignUp extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    _handleUsernameChange = text => {
        this.setState({ username: text });
    };

    _handlePasswordChange = text => {
        this.setState({ password: text });
    };

    _handleConfirmPasswordChange = text => {
        this.setState({ confirmPassword: text });
    };

    render() {
        return (
            <ImageBackground style ={styles.backgroundIMG} source={require('../assets/background-image.jpg')}>
                <View style={styles.container}>
                    <Image style= {styles.title} source={require('../assets/join-today-title.png')}></Image>
        
                        <TextInput
                            style={styles.userCredentials}
                            placeholder='Username'
                            onChangeText={this._handleUsernameChange}
                            value={this.state.username} // Bind the value to the state variable
                        />
                        <TextInput
                            style={styles.userCredentials}
                            placeholder='Password'
                            onChangeText={this._handlePasswordChange}
                            value={this.state.password} // Bind the value to the state variable
                        />
                        <TextInput
                            style={styles.userCredentials}
                            placeholder='Confirm Password'
                            onChangeText={this._handleConfirmPasswordChange}
                            value={this.state.confirmPassword} // Bind the value to the state variable
                        />

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress=
                        {()=> alert('You are successfully signed up!')}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    </View>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        height: deviceHeight/4,
        width: deviceWidth,
        marginTop: -150,
        marginBottom: 20,
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
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      }
});
