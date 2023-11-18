import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function CardIssuerSelector({ route }) {
  const navigation = useNavigation();
  const userUID = route.params.userUID; // Access userUID from route.params

  const [issuers, setIssuers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchIssuers = async () => {
      try {
        const cardDataRef = ref(database, 'cards'); // Assuming you have a 'cards' node in Realtime Firebase
        const dataSnapshot = await get(cardDataRef);

        if (dataSnapshot.exists()) {
          const cardData = dataSnapshot.val();
          const uniqueIssuers = [...new Set(Object.values(cardData).map(card => card.Issuer))];

          setIssuers(uniqueIssuers);
        } else {
          console.log('No card data found in Realtime Firebase');
        }
      } catch (error) {
        console.error('Error fetching issuers from Realtime Firebase:', error);
      }
    };

    fetchIssuers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Issuer</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Issuer"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={issuers.filter(
          (issuer) => issuer.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.issuerItem}>
            <Button
              title={item}
              onPress={() => {
                navigation.navigate('AddCard', {
                  userUID: userUID,
                  issuer: item,
                });
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    paddingLeft: 8,
    width: '100%',
  },
  issuerItem: {
    marginBottom: 10,
  },
});
