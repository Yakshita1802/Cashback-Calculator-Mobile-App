import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/cashback-wallet-icon-concept-with-smartphone-banknotes-coins-credit-card-finance-saving-online-payment-investment-money-transfer-purple-background-illustration-3d-rendering_598821-35.avif')}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Cashback Calculator</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.loginBox}>
          <Button
            title="Login"
            color="white"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        <View style={styles.signupBox}>
          <Button
            title="Sign Up"
            color="white"
            onPress={() => {
              navigation.navigate('Signup');
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
   
    marginBottom: 20,
    alignItems: 'center', // Center the buttons horizontally
  },
  loginBox: {
    width: 200,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  signupBox: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
});
