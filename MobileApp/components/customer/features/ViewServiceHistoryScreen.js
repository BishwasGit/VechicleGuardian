import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const ViewServiceHistoryScreen = ({ route, navigation }) => {
  const {customer_id} = route.params;
  console.log(customer_id)
  // State to store repair history data
  const [repairHistory, setRepairHistory] = useState([]);

  useEffect(() => {
    // Function to fetch repair history data for the given customer_id
    const fetchRepairHistory = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairHistory/${customer_id}`
        );
        const data = await response.json();
        console.log(data);        // Set the fetched repair history data to the state
        setRepairHistory(data);
      } catch (error) {
        console.error('Error fetching repair history:', error);
      }
    };

    // Call the fetch function
    fetchRepairHistory();
  }, [customer_id]); // Trigger the fetch when customer_id changes

  // Render each item in the repair history
// Assuming item.changes_made is a JSON string representing an array like ["Brake Oil Changed", "Mobil Changed"]
const renderRepairItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text>{`Vehicle ID : ${item.vehicleDetails_id}`}</Text>
    <Text>{`Date: ${item.repair_date}`}</Text>
    <Text>{`Total Cost: ${item.total_cost} Rupees`}</Text>
    <Text>{`Total Time: ${item.total_estimatedtime} Minutes`}</Text>
    <Text>{`Completed Date and Time: ${item.completed_time}`}</Text>
    
    {/* Changes made as a list */}
    <View style={styles.changeItemContainer}>
      <Text style={styles.changeItemLabel}>Changes Made:</Text>
      {JSON.parse(item.changes_made).map((change, index) => (
        <Text key={index}>{`- ${change}`}</Text>
      ))}
    </View>
  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Repair History</Text>
      <FlatList
        data={repairHistory}
        keyExtractor={(item) => item.repairData_id}
        renderItem={renderRepairItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  
  changeItemContainer: {
    marginTop: 8,
  },

  changeItemLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});


export default ViewServiceHistoryScreen;
