import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPercentageCards, setMaxPercentageCards] = useState([]);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const cardsRef = ref(database, 'cards');
        const cardsSnapshot = await get(cardsRef);

        if (cardsSnapshot.exists()) {
          const cardsData = cardsSnapshot.val();
          // Extract categories from the card details
          const uniqueCategories = Object.keys(cardsData[Object.keys(cardsData)[0]])
            .filter(key => key !== 'CardName' && key !== 'Issuer' && key !== 'Network' && key !== 'id');
          setCategories(uniqueCategories);
        } else {
          console.log('No cards found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardDetails();
  }, []);

  const findMaxPercentageCards = (category) => {
    setSelectedCategory(category);
    const cardsRef = ref(database, 'cards');
    get(cardsRef).then((cardsSnapshot) => {
      if (cardsSnapshot.exists()) {
        const cardsData = cardsSnapshot.val();
        const sortedCards = Object.values(cardsData)
          .filter(card => card[category] !== undefined)
          .sort((a, b) => b[category] - a[category])
          .map(card => ({ ...card, id: card.CardName }));
        setMaxPercentageCards(sortedCards);
      } else {
        console.log(`No cards found for category: ${category}`);
        setMaxPercentageCards([]);
      }
    }).catch((error) => {
      console.error(`Error fetching cards for category ${category}:`, error);
      setMaxPercentageCards([]);
    });
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <Text style={styles.title}>Categories</Text>
      }
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => findMaxPercentageCards(item)}>
          <Text style={styles.category}>{item}</Text>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        selectedCategory && (
          <>
            <Text style={styles.title}>Max Percentage Cards for {selectedCategory}</Text>
            <FlatList
              data={maxPercentageCards}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cardContainer}>
                  <Text>{`Card Name: ${item.CardName}`}</Text>
                  <Text>{`${selectedCategory} Percentage: ${item[selectedCategory]}`}</Text>
                  {/* Display other card details if needed */}
                </View>
              )}
            />
          </>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});