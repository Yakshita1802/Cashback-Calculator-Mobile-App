import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function RewardsCalculation({ route }) {
  const { userUID } = route.params;

  const [amountSpent, setAmountSpent] = useState('');
  const [percentage, setPercentage] = useState('');
  const [reward, setReward] = useState('');

  const calculateReward = () => {
    const spent = parseFloat(amountSpent);
    const percent = parseFloat(percentage);
    const calculatedReward = (spent * percent) / 100;
    setReward(calculatedReward.toFixed(2));
  };

  const handleSaveReward = async () => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userUID);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const userWalletRef = collection(userRef, 'Wallet'); // Reference to the 'Wallet' subcollection
        const userWalletDoc = doc(userWalletRef, userUID); // Reference to the user's wallet document

        // Reference to the 'saveReward' subcollection within the user's wallet document
        const userSaveRewardRef = collection(userWalletDoc, 'saveReward');

        // Add a new document with an auto-generated ID to the 'saveReward' sub-collection
        const newRewardDocumentRef = await addDoc(userSaveRewardRef, { rewardBalance: parseFloat(reward || 0) });

        // Update the reward balance in the user's data
        const updatedReward = parseFloat(userData.reward || 0) + parseFloat(reward || 0);
        await updateDoc(userRef, { reward: updatedReward });

        Alert.alert('Success', 'Reward saved successfully!');
      } else {
        console.error('User data does not exist.');
        Alert.alert('Error', 'User data does not exist.');
      }
    } catch (error) {
      console.error('Error saving reward:', error);
      Alert.alert('Error', 'Failed to save reward.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculate Rewards</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount spent"
        keyboardType="numeric"
        value={amountSpent}
        onChangeText={(text) => setAmountSpent(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Percentage"
        keyboardType="numeric"
        value={percentage}
        onChangeText={(text) => setPercentage(text)}
      />
      <Button title="Calculate Reward" onPress={calculateReward} />
      <Text style={styles.rewardText}>{`Reward: $${reward}`}</Text>
      <Button title="Save Reward" onPress={handleSaveReward} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  rewardText: {
    fontSize: 18,
    marginTop: 20,
  },
  savedRewardsText: {
    fontSize: 18,
    marginTop: 20,
  },
});
