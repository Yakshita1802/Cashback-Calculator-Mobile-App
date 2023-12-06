import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Custom Header component for the top bar
const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);
export default function Wallet({ route, navigation }) {
  const { userUID, userData } = route.params;

  const [userCards, setUserCards] = useState([]);
  const [savedRewards, setSavedRewards] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);

  const backFunction = () => {
    navigation.navigate("Login");
  }

  const fetchUserCards = async () => {
    try {
      const firestore = getFirestore();
      const userWalletRef = collection(firestore, 'users', userUID, 'Wallet');
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

  const fetchSavedRewards = async () => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userUID);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setSavedRewards(userData.reward || 0);
        setRewardBalance(userData.rewardBalance || 0);
      }
    } catch (error) {
      console.error('Error fetching saved rewards:', error);
    }
  };

  useEffect(() => {
    if (typeof fetchUserCards === 'function') {
      fetchUserCards();
    }
    if (typeof fetchSavedRewards === 'function') {
      fetchSavedRewards();
    }
  }, [fetchUserCards, fetchSavedRewards]);
  const handleCardPress = async (cardId) => {
    try {
      console.log('Clicked card key:', cardId);
      navigation.navigate('CardDetails', { cardId });
    } catch (error) {
      console.error('Error navigating to CardDetails:', error);
    }
  };

  const handleRewardCalculation = () => {
    try {
      // Your logic for handling reward calculation or navigation
      navigation.navigate('RewardsCalculation', { userUID }); // Pass userUID to RewardsCalculation screen
    } catch (error) {
      console.error('Error handling reward calculation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={backFunction} title="Back"/>
      <Text style={styles.title}>Welcome to Your Wallet</Text>

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

      {/* Displaying Saved Rewards and Reward Balance */}
      <Text style={styles.savedRewardsText}>Saved Rewards: ${savedRewards}</Text>
      

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
      <Button
        title="Reward Calculation"
        onPress={handleRewardCalculation}
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
  savedRewardsText: {
    fontSize: 18,
    marginTop: 20,
  },
});
