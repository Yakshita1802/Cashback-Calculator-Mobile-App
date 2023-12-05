import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function Wallet() {
  const route = useRoute();
  const { userUID, userData } = route.params;
  const navigation = useNavigation();

  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const db = getFirestore();
        const userWalletRef = collection(db, 'users', userUID, 'Wallet');

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

    fetchUserCards();
  }, [userUID]);

  const handleCardPress = async (cardData) => {
    try {
      const cardKey = cardData.id;
      const realtimeDBRef = firebase.database().ref('cards/' + cardKey);
      const snapshot = await realtimeDBRef.once('value');
      const detailedCardData = snapshot.val();

      navigation.navigate('CardDetails', { cardData: detailedCardData });
    } catch (error) {
      console.error('Error fetching detailed card data:', error);
    }
  };

  const handleAddCardPress = () => {
    navigation.navigate('CardIssuerSelector', { userUID });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/istockphoto-1343295525-612x612.jpg')} style={styles.topImage} />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCardPress}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text>Reward Balance:</Text>
          <Text style={styles.balanceText}></Text>
        </View>
        <View style={styles.balanceBox}>
          <Text>Available Credit:</Text>
          <Text style={styles.balanceText}></Text>
        </View>
      </View>
      <Text style={styles.title}>Welcome to Your Wallet, {userData.username}!</Text>
      <Text style={styles.subtitle}>Your Cards:</Text>
      <FlatList
        data={userCards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.cardItem}>
              <Text style={styles.cardIssuer}>Issuer: {item.Issuer}</Text>
              <Text style={styles.cardName}>Card Name: {item.CardName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => {/* Navigate to User Profile screen */}}>
        <Image source={require('../assets/user-icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {/* Navigate to Wallet screen */}}>
        <Image source={require('../assets/wallet-icon.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
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
  topImage: {
    width: '110%',
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  balanceBox: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    margin: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 1,
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '110%',
    marginTop: 100, 
  },
  icon: {
    width: 40,
    height: 40,
  },
});
