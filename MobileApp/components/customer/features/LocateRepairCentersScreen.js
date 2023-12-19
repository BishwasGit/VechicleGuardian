import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';
import { encode as base64Encode, decode as base64Decode } from 'base-64';


const LocateRepairCentersScreen = ({ route, navigation }) => {
  const customer_id = route.params;

  const [repairCenters, setRepairCenters] = useState([]);

  useEffect(() => {
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairCentersList`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRepairCenters(data.repairCenters);
      } catch (error) {
        console.error('Error fetching repair centers:', error);
        // Handle errors as needed
      }
    };

    fetchRepairCenters();
  }, []);
  
  // Check if customer_id is available
  if (!customer_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate('Vechicle Guardian Landing Page');
    return null; // Render nothing if redirecting
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={repairCenters}
        keyExtractor={(item) => item.repaircenters_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.address}</Text>
            <Text style={styles.itemText}>{base64Decode(item.map)}</Text>
            <Text style={styles.itemText}>{item.contact}</Text>
            <Text style={styles.itemText}>{JSON.parse(item.vacancy).position}</Text>
            <Text style={styles.itemText}>{JSON.parse(item.vacancy).noOfPerson}</Text>
            <Text style={styles.itemText}>{JSON.parse(item.vacancy).salary}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1C0744',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default LocateRepairCentersScreen;
