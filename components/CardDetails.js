import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig'; // Import your Realtime Firebase configuration
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';

export default function CardDetail({ route }) {
  const { cardData } = route.params;
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const cardRef = ref(database, 'cards', cardData.id); 
        const cardSnapshot = await get(cardRef);

        if (cardSnapshot.exists()) {
          const detailedCardData = cardSnapshot.val();
          setCardDetails(detailedCardData);
        } else {
          console.log('Card not found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching detailed card data:', error);
      }
    };

    fetchCardDetails();
  }, [cardData.id]);

  const handleSomeAction = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', 'someUserId'); // Adjust the path based on your Firestore structure
      await setDoc(userRef, { someField: 'someValue' }, { merge: true });
      Alert.alert('Success', 'Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Error', 'Failed to update data.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      {cardDetails && (
        <View>
          <Text>{`Card Name: ${cardDetails.CardName}`}</Text>
          {/* Display other card details here */}
        </View>
      )}
      <Button title="Perform Some Action" onPress={handleSomeAction} />
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
  },
});
