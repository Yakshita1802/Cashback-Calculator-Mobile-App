import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { database } from '../firebaseConfig'; // Import your Firebase configuration

export default function UserWallet() {
  const [userWallet, setUserWallet] = useState([]);
  const user = getAuth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const userUid = user.uid;
      const userWalletRef = ref(database, 'users', userUid, 'wallet');

      const fetchUserWallet = async () => {
        try {
          const snapshot = await get(userWalletRef);

          if (snapshot.exists()) {
            const walletData = snapshot.val();
            const walletArray = Object.values(walletData);
            setUserWallet(walletArray);
          }
        } catch (error) {
          console.error('Error fetching user wallet:', error);
        }
      };

      fetchUserWallet();
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
              navigation.navigate('CardDetails', { cardKey: item });
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
