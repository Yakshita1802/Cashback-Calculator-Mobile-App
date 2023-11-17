import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function UserWallet() {
  const [userWallet, setUserWallet] = useState([]);
  const user = getAuth().currentUser;
  const navigation = useNavigation(); // Initialize navigation hook

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);

      getDoc(userRef)
        .then((docSnapshot) => {
          const wallet = docSnapshot.data()?.wallet || [];
          setUserWallet(wallet);
        })
        .catch((error) => {
          console.error('Error fetching user wallet:', error);
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet:</Text>
      <FlatList
        data={userWallet}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              // Navigate to CardDetails and pass the card data
              navigation.navigate('CardDetails', { cardData: item });
            }}
          >
            <Text>Card: {item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
});
