import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Wallet() {
  const route = useRoute();
  const { userUID, userData } = route.params; // Destructuring from route.params
  const navigation = useNavigation(); // Get navigation object

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const db = getFirestore();
        const userWalletRef = collection(db, 'users', userUID, 'Wallet');

        const querySnapshot = await getDocs(userWalletRef);

        const cards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Issuer: doc.data().Issuer,
          CardName: doc.data().CardName,
        }));

        setUserCards(cards);
      } catch (error) {
        console.error('Error fetching user cards:', error);
      }
    };

    fetchUserCards();
  }, [userUID]);

  const handleCardPress = async (cardData) => {
  try {
    // Assuming cardData.id is the key in the Realtime Database
    const cardKey = cardData.id;

    // Fetch detailed card data from the Realtime Database
    const realtimeDBRef = firebase.database().ref('cards/' + cardKey);
    const snapshot = await realtimeDBRef.once('value');
    const detailedCardData = snapshot.val();

    // Navigate to CardDetails and pass detailedCardData
    navigation.navigate('CardDetails', { cardData: detailedCardData });
  } catch (error) {
    console.error('Error fetching detailed card data:', error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Wallet, {userData.username}!</Text>

      <Text style={styles.subtitle}>Your Cards:</Text>
      <FlatList
        data={userCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.cardItem}>
              <Text style={styles.cardIssuer}>Issuer: {item.Issuer}</Text>
              <Text style={styles.cardName}>Card Name: {item.CardName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Add Card"
        onPress={() => {
          // Navigate to CardIssuerSelector and pass userUID
          navigation.navigate('CardIssuerSelector', { userUID });
        }}
      />
      <Button title="Category" onPress={() => {/* Navigate to Category screen */}} />
      <Button title="Profile" onPress={() => {/* Navigate to Profile screen */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardIssuer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 18,
  },
});
