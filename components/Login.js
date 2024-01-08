import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Initialize Firestore collection reference
  const usersCollection = collection(getFirestore(), 'users'); // Replace 'users' with your actual collection name

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const emailToLowerCase = email.toLowerCase();
      await signInWithEmailAndPassword(auth, emailToLowerCase, password);

      const userCredential = auth.currentUser;
      const userUID = userCredential.uid;

      if (!userUID || typeof userUID !== 'string' || userUID.trim() === '') {
        throw new Error('Invalid user identification');
      }

      const userDocRef = doc(usersCollection, userUID);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        // Pass functions to fetch user cards and rewards to Wallet screen
        navigation.navigate('Wallet', {
          userUID,
          userData,
        });

        // Update Wallet screen options after navigation
        navigation.setOptions({
          fetchUserCards: () => fetchUserCards(userUID),
          fetchSavedRewards: () => fetchSavedRewards(userUID),
        });
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  const fetchUserCards = async (userUID) => {
    try {
      const db = getFirestore();
      const userWalletRef = collection(db, 'users', userUID, 'Wallet');
      const querySnapshot = await getDocs(userWalletRef);

      // Retrieve user cards and update state
      const cards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Issuer: doc.data().Issuer,
        CardName: doc.data().CardName,
      }));
      // Handle state update (e.g., store it in context or send it as props)
      console.log('User cards:', cards);
    } catch (error) {
      console.error('Error fetching user cards:', error);
    }
  };

  const fetchSavedRewards = async (userUID) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', userUID);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        // Update state with saved rewards
        console.log('Saved rewards:', userData.reward || 0);
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth();
      const emailToLowerCase = email.toLowerCase();

      // Send password reset email
      await sendPasswordResetEmail(auth, emailToLowerCase);

      Alert.alert('Password Reset Email Sent', 'Please check your email for further instructions.');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="white" />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Button
            title="Forgot Password?"
            onPress={handleForgotPassword}
            color="blue"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: 200,
    height: 50,
    backgroundColor: '#6A0572',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
