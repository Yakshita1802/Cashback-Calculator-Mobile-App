import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function CardDetails({ route }) {
  const { cardId } = route.params;
  const [cardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const cardRef = ref(database, 'cards', cardId);
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
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{`Card Name: ${cardDetails.CardName}`}</Text>
            <Text>{`Issuer: ${cardDetails.Issuer}`}</Text>
          </View>
          {cardDetails.imageUrl && (
            <Image
              source={{ uri: cardDetails.imageUrl }}
              style={styles.cardImage}
              resizeMode="contain"
            />
          )}
          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>Rewards</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Air Travel:</Text>
              <Text>{`${cardDetails.AirTravelPercentage}%`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Dining:</Text>
              <Text>{`${cardDetails.DiningPercentage}%`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Drugstores:</Text>
              <Text>{`${cardDetails.DrugstoresPercentage}%`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Hotels:</Text>
              <Text>{`${cardDetails.HotelsPercentage}%`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Lyft:</Text>
              <Text>{`${cardDetails.LyftPercentage}%`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Everything Else:</Text>
              <Text>{`${cardDetails.EverythingElsePercentage}%`}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  cardInfo: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 16,
    paddingBottom: 16,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsSection: {
    marginTop: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsLabel: {
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 10,
  },
});
