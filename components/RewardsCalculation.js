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
      // ... (Your existing code remains the same)

      // Rest of your function remains unchanged
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
    backgroundColor: '#fff', // Background color
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
    borderRadius: 8, // Rounded corners for input fields
  },
  rewardText: {
    fontSize: 18,
    marginTop: 20,
  },
});


