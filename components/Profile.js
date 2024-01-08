import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);

        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid); // Assuming your users' collection is named 'users'
        const userSnapshot = await getDoc(userRef);
        
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        } else {
          console.log('User data not found in Firestore');
        }
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
      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>First Name: {userData.firstName}</Text>
          <Text style={styles.userData}>Last Name: {userData.lastName}</Text>
          <Text style={styles.userData}>Date of Birth: {userData.dateOfBirth}</Text>
        </View>
      )}
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
  userDataContainer: {
    marginVertical: 20,
  },
  userData: {
    fontSize: 16,
    marginBottom: 8,
  },
});
