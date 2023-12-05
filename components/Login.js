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
      const emailToLowerCase = email.toLowerCase();
      await signInWithEmailAndPassword(auth, emailToLowerCase, password);

      const db = getFirestore();
      const usersCollection = collection(db, 'users');

      // Retrieve the user document based on the logged-in user's UID
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
      console.error('Error fetching saved rewards:', error);
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
