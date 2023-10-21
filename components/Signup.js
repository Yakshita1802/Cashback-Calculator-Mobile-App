import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';

export default class App extends Component {
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
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <Text style={styles.title}>
                        SignUp for Cashback Calculator
                    </Text>
                </View>
                
                <View style={styles.bottomBox}>
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
                </View>
                <TouchableHighlight style={styles.signupFunction}
                    onPress={() => {
                        alert('You are successfully signed up')
                    }}
                >
                
                    <Text style={styles.signupButton}>
                        SignUp
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    topBox: {
        flex: 1,
        width: 300,
        height: 50,
        borderColor: 'white',
        margin: 10,
    },
    title: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    bottomBox: {
        flex: 2,
        alignItems: 'center',
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
    signupFunction: {
        marginTop: 20,
        marginBottom: 60,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 80,
        marginRight: 80,
        paddingVertical: 10,
    },
    signupButton: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
  