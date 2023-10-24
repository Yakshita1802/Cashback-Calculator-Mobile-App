import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import App from '../App';

let deviceHeight = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width;

const WelcomeScreen = ({navigation}) => {
    return (
        <ImageBackground style ={styles.backgroundIMG} source={require('../assets/background-image.jpg')}>
            <Image style= {styles.title} source={require('../assets/app-title-three.png')}></Image>  
            <Text style= {styles.text}>
            Pick the right card. Start earning money today.
            </Text>   
                <TouchableOpacity style={styles.buttonContainer}onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    title: {
        height: deviceHeight/4,
        width: deviceWidth,
        marginTop: -150,
        marginBottom: 30,
        marginLeft: -60,
    },
    buttonContainer: {
        width: deviceWidth/1.4,
        height: deviceHeight/8.5,
        justifyContent: 'center',
        backgroundColor: '#368208',
        borderRadius: 20,
        marginVertical: 10,
    },
    text: {
        fontStyle: 'italic',
        marginBottom: 60,
    },
    buttonText: {
        color: 'white',
        fontSize: deviceHeight/26,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    backgroundIMG: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WelcomeScreen;


