import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';

function CardIssuerSelector({ navigation }) {
  const [cardIssuers, setCardIssuers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheet1Ref = ref(database, 'Sheet1');
        const dataSnapshot = await get(sheet1Ref);

        if (dataSnapshot.exists()) {
          const uniqueIssuers = {};

          dataSnapshot.forEach((childSnapshot) => {
            const issuer = childSnapshot.val().Issuer;
            uniqueIssuers[issuer] = true;
          });

          const uniqueIssuersArray = Object.keys(uniqueIssuers);

          setCardIssuers(uniqueIssuersArray);
        } else {
          console.log('No data found in Realtime Database');
        }
      } catch (error) {
        console.error('Error fetching data from Realtime Database:', error);
      }
    };

    fetchData();
  }, []);

  const filteredIssuers = cardIssuers.filter(
    (issuer) =>
      issuer.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
  );

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
        data={filteredIssuers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AddCard', { issuer: item })}>
            <Text style={styles.issuerItem}>{item}</Text>
          </TouchableOpacity>
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
    fontSize: 18,
    marginTop: 8,
    color: 'blue',
    borderWidth: 1, // Add a border
    borderColor: 'blue', // Set the border color to blue
    borderRadius: 5, // Add some border radius for rounded corners
    padding: 8, // Add padding to make it look better
  },
});

export default CardIssuerSelector;
