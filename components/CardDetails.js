import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase/app'; // Import Firebase
import 'firebase/database';

export default function CardDetails({ route }) {
  const { cardData } = route.params;
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    // Reference to the 'Sheet1' node in the Realtime Database
    const sheet1Ref = firebase.database().ref('Sheet1');

    // Query the database to find the card by 'Card Name'
    sheet1Ref
      .orderByChild('Card Name')
      .equalTo(cardData['Card Name'])
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          // Card data found, update the state
          setCardDetails(snapshot.val());
        } else {
          console.log('Card not found in the database');
        }
      });

    // Clean up the database reference when the component unmounts
    return () => {
      sheet1Ref.off();
    };
  }, [cardData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Details:</Text>
      <View style={styles.cardDetails}>
        {cardDetails ? (
          Object.entries(cardDetails).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))
        ) : (
          <Text>Card details are loading...</Text>
        )}
      </View>
    </View>
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
  cardDetails: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
});
