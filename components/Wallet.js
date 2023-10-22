import React, {useState} from 'react';
import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

export default class App extends Component {
    _handleButtonPress = () => {
        Alert.alert(
            'Button pressed!',
            'You did it!',
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBox}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.addButton}
                            onPress={() => {
                                alert('Card Added')
                            }}>
                            <Text style={styles.buttonText}>
                                Add Cards
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.rewardsButton}
                            onPress={() => {
                                alert('Your total Rewards is: ')
                            }}>
                            <Text style={styles.buttonText}>
                                Rewards
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.creditButton}
                            onPress={() => {
                                alert('Available Credit is: ')
                            }}>
                            <Text style={styles.buttonText}>
                                Available Credit
                            </Text>
                        </TouchableHighlight>
                        <View style={styles.walletProfileContainer}>
                            <TouchableHighlight style={styles.walletButton}
                                onPress={() => {
                                    alert('You clicked on wallet')
                                }}>
                                <Text style={styles.buttonText}>
                                    Wallet
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.profileButton}
                                onPress={() => {
                                    alert('You clicked on profile')
                                }}>
                                <Text style={styles.buttonText}>
                                    Profile
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBox: {
        width: 300,
        height: 200,
        flex: 2,
        backgroundColor: 'green',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: 215,
        height: 165,
        marginLeft: 40,
        marginTop: 10,
        borderRadius: 10,
    },
    addButton: {
        width: 100,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 50,
    },
    buttonText: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    rewardsButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 30,
        marginRight: 50,
    },
    creditButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 90, // Adjust this value to create space for Wallet and Profile buttons
        marginLeft: 120,
    },
    walletProfileContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    walletButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 60, // Move Wallet button to the bottom
    },
    profileButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 100,
        marginBottom: 10,
    },
});
