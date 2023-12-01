import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Wallet() {
  const route = useRoute();
  const { userUID, userData } = route.params;
  const navigation = useNavigation();

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

  const handleCardPress = async (cardId) => {
    try {
      console.log('Clicked card key:', cardId);
      navigation.navigate('CardDetails', { cardId });
    } catch (error) {
      console.error('Error navigating to CardDetails:', error);
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
          <TouchableOpacity onPress={() => handleCardPress(item.id)}>
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
          navigation.navigate('CardIssuerSelector', { userUID });
        }}
      />
      <Button
        title="Category"
        onPress={() => {
          navigation.navigate('Category');
        }}
      />
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
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
