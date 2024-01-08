import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/cashback-wallet-icon-concept-with-smartphone-banknotes-coins-credit-card-finance-saving-online-payment-investment-money-transfer-purple-background-illustration-3d-rendering_598821-35.avif')}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Cashback Calculator</Text>
          <Text style={styles.description}>
            Discover the best card rewards! Find out which credit cards offer the maximum rewards for various categories and calculate your rewards all in one place. Start maximizing your savings today!
          </Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: 60, // Corrected from paddingup to paddingTop
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 130,
    color: 'white',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#490256', // Light purple color
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginBox: {
    width: '40%',
    height: 50,
    backgroundColor: '#6A0572', // Purple
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  signupBox: {
    width: '40%',
    height: 50,
    backgroundColor: '#6A0572', 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
});
