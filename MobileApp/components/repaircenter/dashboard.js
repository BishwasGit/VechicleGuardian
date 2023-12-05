import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

const RepariCenterDashboard = ({ route }) => {
  const [RepairCenterDetails, setRepairCenterDetails] = useState(null);

  // Fetch customer details based on repaircenter_id when the component mounts
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
      const repaircenter_id = route.params.repaircenter_id;

      // Make a request to your server to get customer details based on repaircenter_id
      // Example using fetch:
      try {
        const response = await fetch(`http://localhost:3000/api/RepairCenterDetails/${repaircenter_id}`);
        const data = await response.json();

        // Assuming the server response contains customer details
        setRepairCenterDetails(data.RepairCenterDetails);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchRepairCenterDetails();
  }, [route.params.repaircenter_id]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text>Welcome to the user dashboard</Text>
          {RepairCenterDetails && (
            <View>
              <Text>User ID: {RepairCenterDetails.repaircenter_id}</Text>
              <Text>Username: {RepairCenterDetails.username}</Text>
              {/* Add more details as needed */}
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '80%',
    marginVertical: 10,
    padding: '5px',
  },
});

export default RepariCenterDashboard;
