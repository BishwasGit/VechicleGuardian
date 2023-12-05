import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

const CustomerDashboard = ({ route }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  // Fetch customer details based on customer_id when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const customer_id = route.params.customer_id;

      // Make a request to your server to get customer details based on customer_id
      // Example using fetch:
      try {
        const response = await fetch(`http://localhost:3000/api/customerDetails/${customer_id}`);
        const data = await response.json();

        // Assuming the server response contains customer details
        setCustomerDetails(data.customerDetails);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [route.params.customer_id]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text>Welcome to the customer dashboard</Text>
          {customerDetails && (
            <View>
              <Text>Customer ID: {customerDetails.customer_id}</Text>
              <Text>Username: {customerDetails.username}</Text>
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

export default CustomerDashboard;
