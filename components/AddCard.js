import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDoc } from 'firebase/firestore';

function AddCard({ route }) {
  const { issuer } = route.params;
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // To store selected cards
  const [searchText, setSearchText] = useState('');
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheet1Ref = ref(database, 'Sheet1');
        const dataSnapshot = await get(sheet1Ref);

        if (dataSnapshot.exists()) {
          const cardsData = [];
          dataSnapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Issuer === issuer) {
              cardsData.push(childSnapshot.val()['Card Name']);
            }
          });

          setCards(cardsData);
        } else {
          console.log('No data found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching data from Realtime Database:', error);
      }
    };

    fetchData();
  }, [issuer]);

  const filteredCards = cards.filter(
    (card) =>
      card.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
  );

  const handleAddToWallet = async () => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);

      // Fetch the user's current wallet cards
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      const currentWallet = userData.wallet || [];

      // Filter out the selected cards that are already in the wallet
      const cardsToAdd = selectedCards.filter((selectedCard) => !currentWallet.includes(selectedCard));

      if (cardsToAdd.length === 0) {
        Alert.alert('Info', 'All selected cards are already in your wallet.');
        return;
      }

      // Add the selected cards to the user's wallet
      const updatedWallet = [...currentWallet, ...cardsToAdd];

      // Update the user's wallet in Firestore
      await setDoc(userRef, { wallet: updatedWallet }, { merge: true });

      // Clear the selected cards
      setSelectedCards([]);

      // Provide feedback to the user
      Alert.alert('Success', 'Selected cards added to your wallet.');
    } else {
      console.log('User is not authenticated.');
    }
  };

  const toggleCardSelection = (card) => {
    // Toggle the card's selection status
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Card</Text>
      <Text style={styles.subtitle}>Issuer: {issuer}</Text>
      <Text style={styles.subtitle}>Available Cards:</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Card"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={filteredCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCardSelection(item)}>
            <View style={styles.cardItem}>
              <Text style={styles.cardText}>{item}</Text>
              {selectedCards.includes(item) ? (
                <Text style={styles.selectedText}>Selected</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
      {filteredCards.length > 0 && (
        <Button title="Add Selected to Wallet" onPress={handleAddToWallet} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    paddingLeft: 8,
    width: '100%',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderColor: 'blue', // Add a blue border
    borderWidth: 1, // Set the border width
    borderRadius: 5, // Add some border radius for rounded corners
    padding: 8, // Add padding to make it look better
  },
  cardText: {
    fontSize: 18,
  },
  selectedText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default AddCard;
