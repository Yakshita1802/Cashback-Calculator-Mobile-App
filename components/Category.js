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
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => findMaxPercentageCards(item)} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedCategory && (
        <>
          <Text style={styles.title}>Max Percentage Cards for {selectedCategory}</Text>
          <FlatList
            data={maxPercentageCards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Text style={styles.cardName}>{item.CardName}</Text>
                <Text>{`${selectedCategory} Percentage: ${item[selectedCategory]}`}</Text>
                {/* Display other card details if needed */}
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue',
  },
});

