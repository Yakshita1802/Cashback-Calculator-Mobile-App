import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const emailToLowerCase = email.toLowerCase(); // Convert email to lowercase
      await signInWithEmailAndPassword(auth, emailToLowerCase, password);

      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const userUID = route.params.userUID; // Access userUID from route.params

      // Use getDoc to fetch the user document based on userUID
      const userDocRef = doc(usersCollection, userUID);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        console.log('User data found:', userDocSnapshot.data());
        // Access user data from userDocSnapshot.data()
        const userData = userDocSnapshot.data();

        // After successful login, navigate to the Wallet screen and pass the user UID
        navigation.navigate('Wallet', { userUID, userData });
      } else {
        console.log('No user found in Firestore');
        Alert.alert('Error', 'User does not exist. Please sign up first.');
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Error', 'An error occurred during login.');
    }
  }

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
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
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
