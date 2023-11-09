import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WalletScreen() {
  const navigation = useNavigation();

  const handleNavigateToCategory = () => {
    navigation.navigate('Category');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Cool-Nature-Wallpapaer-for-Download.jpg')} style={styles.image} />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleNavigateToCategory}>
          <Image source={require('../assets/user-icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.iconSeparator} /> 
        <TouchableOpacity onPress={handleNavigateToCategory}>
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
  imageContainer: {
    position: 'relative',
  width: '110%',
  marginBottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: 300, // Adjust the height as needed
  marginBottom: 10,
  overflow: 'hidden', // To clip the child views within the container
  marginTop: 5,
  padding: 10,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  borderRadius: 10,
  position: 'relative',
  // Add other styles as needed
  },
  image: {
    width: '120%',
    height: '120%',
    resizeMode: 'cover',
  },
  balanceContainer: {
    flex: 1,
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
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 350, // Increase the marginTop to adjust the space
  },
  icon: {
    width: 60,
    height: 60,
  },
  iconSeparator: {
    width: 160,
  },
});