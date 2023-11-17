import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig'; 
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (userData) {
      navigation.navigate('Wallet', { userData });
    }
  }, [userData, navigation]);

  const handleLogin = async () => {
    try {
      const auth = getAuth(); // Use getAuth without passing firebaseApp
      const emailToLowerCase = email.toLowerCase(); // Convert email to lowercase
      await signInWithEmailAndPassword(auth, emailToLowerCase, password);

      console.log('Attempting to log in with email:', emailToLowerCase);

      const db = getFirestore(); 
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('email', '==', emailToLowerCase));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size === 0) {
        console.log('No user found in Firestore');
        Alert.alert('Error', 'User does not exist. Please sign up first.');
      } else {
        console.log('User data found:', querySnapshot.docs[0].data());
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
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
