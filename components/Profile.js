import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Profile() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>User Email: {userEmail ? userEmail : 'Loading...'}</Text>
      <Button title="Logout" onPress={handleLogout} color="#FF5733" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff', // Background color
  },
  emailText: {
    marginBottom: 20,
    fontSize: 18,
    color: '#333', // Text color
    fontWeight: 'bold',
  },
});
