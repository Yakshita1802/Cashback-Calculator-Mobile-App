import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function CardDetails({ route }) {
  const { cardId } = route.params;
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const cardRef = ref(database, 'cards', cardId); /*importing cards by ID from Friebase*/
        const cardSnapshot = await get(cardRef);

        if (cardSnapshot.exists()) {
          setCardDetails(cardSnapshot.val()[cardId]);
        } else {
          console.log('Card not found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching detailed card data:', error);
      }
    };

    fetchCardDetails();
  }, [cardId]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      {cardDetails && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardName}>{`Card Name: ${cardDetails.CardName}`}</Text>
          <Text>{`Issuer: ${cardDetails.Issuer}`}</Text>
          <Text>{`Network: ${cardDetails.Network}`}</Text>
          <Text>{`Air Travel Percentage: ${cardDetails.AirTravelPercentage}`}</Text>
          <Text>{`Dining Percentage: ${cardDetails.DiningPercentage}`}</Text>
          <Text>{`Drugstores Percentage: ${cardDetails.DrugstoresPercentage}`}</Text>
          <Text>{`Hotels Percentage: ${cardDetails.HotelsPercentage}`}</Text>
          <Text>{`Lyft Percentage: ${cardDetails.LyftPercentage}`}</Text>
          <Text>{`Everything Else Percentage: ${cardDetails.EverythingElsePercentage}`}</Text>
          {/* Add more Text components for other properties if needed */}
        </View>
      )}
    </ScrollView>
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
    textAlign: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
