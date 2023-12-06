import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
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
      <View style={styles.imageContainer}>
        {/* Image */}
        <Image
          source={require('../assets/istockphoto-1343295525-612x612.jpg')}
          style={styles.image}
        />

        {/* Add Card Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CardIssuerSelector', { userUID })}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        {/* Available Credit Box */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Available Credit</Text>
          <Text style={styles.boxContent}>${savedRewards}</Text>
        </View>
      </View>

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

      <View style={styles.iconRow}>
        {/* Category Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Category')}>
          <Image source={require('../assets/download.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Category</Text>
        </TouchableOpacity>

        {/* Profile Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/user-icon.jpeg')} style={styles.iconImage} />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>

        {/* Reward Calculator Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={handleRewardCalculation}>
          <Image source={require('../assets/images.png')} style={styles.iconImage} />
          <Text style={styles.iconText}>Reward Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '110%',
    height: 200,
    marginBottom: 10,
    resizeMode:'cover',
  },
  addButton: {
    position: 'absolute',
    top:20,
    left: 10,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxContent: {
    fontSize: 16,
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    width:'100%',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 10,
  },
});