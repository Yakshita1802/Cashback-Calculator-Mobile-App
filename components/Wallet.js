// WalletScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WalletScreen() {
  const navigation = useNavigation();

  const handleNavigateToUserWallet = () => {
    navigation.navigate('UserWallet'); // Navigate to the UserWallet screen
  };

  const handleNavigateToCategory = () => {
    navigation.navigate('Category'); // Navigate to the Category screen
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile'); // Navigate to the Profile screen
  };

  const handleNavigateToAddCard = () => {
    navigation.navigate('CardIssuerSelector'); // Navigate to the CardIssuerSelector screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Reward Balance:</Text>
        {/* Add your reward balance content here */}
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.card} onPress={handleNavigateToAddCard}>
          <Text>Add Card</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Button title="User Wallet" onPress={handleNavigateToUserWallet} />
        <Button title="Category" onPress={handleNavigateToCategory} />
        <Button title="Profile" onPress={handleNavigateToProfile} />
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
  topContainer: {
    justifyContent: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
