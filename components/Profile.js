import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Profile() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check the authentication state to determine the user's email
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        // User is not authenticated, handle it as needed (e.g., redirect to login)
        navigation.navigate('Login');
      }
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Sign the user out from Firebase

      // After logging out, navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>User Email: {userEmail ? userEmail : 'Loading...'}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
