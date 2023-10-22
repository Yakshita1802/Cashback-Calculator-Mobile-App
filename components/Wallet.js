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
                        <TouchableHighlight style ={styles.addButton}
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
                </View>
                <View style={styles.bottomBox}>
                    
                    
                    <TouchableHighlight style ={styles.walletButton}
                        onPress={() => {
                        alert('You clicked on wallet')
                    }}>
                    <Text style={styles.buttonText}>
                        Wallet
                    </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style ={styles.profileButton}
                        onPress={() => {
                        alert('You clicked on profile')
                    }}>
                    <Text style={styles.buttonText}>
                        Profile
                    </Text>
                    </TouchableHighlight>
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
        backgroundColor: 'green',
        flexDirection: 'column',
    },
    topBox: {
        width: 300,
        height: 200,
        borderColor: 'white',
        borderWidth: 3,
        marginBottom: 10,
        paddingTop: 30,  
    },
    addButton: {
        width: 100,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        //marginTop: 5,
        //marginLeft: 5,
        marginRight:50,
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
        //marginLeft: 5,
        marginRight:50,
    },
    creditButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 200,
        marginLeft: 120,
        //marginRight:50,
    },
    bottomBox: {
        width: 300,
        height: 300,
        borderColor: 'white',
        borderWidth: 3,
    },
    walletButton: {
        width: 80,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        //marginTop: 5,
        //marginLeft: 5,
        marginRight:50,
    },
    profileButton: {
        width: 75,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 200,
        marginLeft: 120,
        //marginRight:50,
    },
    
});
