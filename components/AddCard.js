import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ref, get } from 'firebase/database';
import { database, db } from '../firebaseConfig'; // Import your Realtime Firebase configuration
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore methods

export default function AddCard({ route }) {
  const { issuer } = route.params;
  const userUID = route.params.userUID;

  const [cards, setCards] = useState([]);
  const [selectedCardKeys, setSelectedCardKeys] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardDataRef = ref(database, 'cards');
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

  const filteredCards = cards.filter(
    (card) =>
      card['CardName'].toLowerCase().includes(searchText.toLowerCase()) ||
      card['Issuer'].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Cards</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Cards"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <ScrollView style={styles.cardList}>
        {filteredCards.map((card) => (
          <TouchableOpacity
            key={card.key}
            style={styles.cardContainer}
            onPress={() => handleToggleCardSelection(card.key)}
          >
            <View style={styles.cardInfo}>
              <Image
                source={{ uri: card.imageUrl }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>{card['CardName']}</Text>
              <Text style={styles.cardText}>{card['Issuer']}</Text>
              {/* Add more details as needed */}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addToWalletButton} onPress={handleAddToWallet}>
        <Text style={styles.addToWalletText}>Add to Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardList: {
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    marginRight: 10, // Add margin between the text and image
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  addToWalletButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  addToWalletText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    paddingLeft: 8,
    marginBottom: 10,
  },
});
