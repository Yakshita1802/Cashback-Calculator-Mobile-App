 import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { database, db } from '../firebaseConfig'; // Import your Realtime Firebase configuration
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function AddCard({ route, navigation }) {
  const { issuer } = route.params;
  const userUID = route.params.userUID;

  const [cards, setCards] = useState([]);
  const [selectedCardKeys, setSelectedCardKeys] = useState([]);

  const backFunction = () => {
    navigation.navigate("Login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardDataRef = ref(database, 'cards'); // Use Realtime Firebase reference
        const dataSnapshot = await get(cardDataRef);

        if (dataSnapshot.exists()) {
          const cardData = dataSnapshot.val();
          const cardList = Object.entries(cardData).map(([key, value]) => ({
            key,
            ...value,
          }));

          const issuerCards = cardList.filter((card) => card['Issuer'] === issuer);

          setCards(issuerCards);
        } else {
          console.log('No card data found in Realtime Firebase');
        }
      } catch (error) {
        console.error('Error fetching data from Realtime Firebase:', error);
      }
    };

    fetchData();
  }, [issuer]);

  const handleToggleCardSelection = (cardKey) => {
    setSelectedCardKeys((prevSelectedCardKeys) => {
      if (prevSelectedCardKeys.includes(cardKey)) {
        return prevSelectedCardKeys.filter((key) => key !== cardKey);
      } else {
        return [...prevSelectedCardKeys, cardKey];
      }
    });
  };

  const handleAddToWallet = async () => {
    try {
      if (Array.isArray(selectedCardKeys) && selectedCardKeys.length > 0) {
        const userWalletRef = collection(db, 'users', userUID, 'Wallet'); // Firestore reference

        selectedCardKeys.forEach(async (cardKey) => {
          const selectedCard = cards.find((card) => card.key === cardKey);

          if (selectedCard) {
            const cardDocRef = doc(userWalletRef, selectedCard.key);

            const cardData = {
              CardName: selectedCard.CardName,
              Issuer: selectedCard.Issuer,
              // Add other properties as needed
            };

            await setDoc(cardDocRef, cardData);
          }
        });

        Alert.alert('Success', 'Selected cards added to your wallet.');
      } else {
        Alert.alert('Info', 'Please select cards before adding them to your wallet.');
      }
    } catch (error) {
      console.error('Error adding cards to the wallet:', error);
      Alert.alert('Error', 'An error occurred while adding the cards to your wallet.');
    }
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={backFunction}>
          <View style={styles.backButton}>
            <Text style={styles.buttonStyle}>Back</Text>
          </View>
        </TouchableOpacity>
      <Text style={styles.title}>Add Cards</Text>
      <ScrollView style={styles.cardList}>
        {cards.map((card) => (
          <View key={card.key}>
            <Text style={styles.cardText}>{card['CardName']}</Text>
            <Button
              title={selectedCardKeys.includes(card.key) ? 'Remove from Wallet' : 'Add to Wallet'}
              onPress={() => handleToggleCardSelection(card.key)}
            />
          </View>
        ))}
      </ScrollView>
      <Button title="Add to Wallet" onPress={handleAddToWallet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  backButton:{
    marginTop: 30,
    width: deviceWidth/4,
    height: deviceHeight/20,
    backgroundColor: "red",
  },
  buttonStyle: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardList: {
    width: '100%',
  },
  cardText: {
    fontSize: 18,
  },
});
