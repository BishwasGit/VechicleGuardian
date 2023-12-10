import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomerDashboard = ({ route }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  // Fetch customer details based on customer_id when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const { customer_id } = route.params;

      try {
        const response = await fetch(
          `http://localhost:3000/api/customerDetails/${customer_id}`
        );
        const data = await response.json();

        setCustomerDetails(data.customerDetails);
        console.log("Customer Details:", data.customerDetails);
        
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [route.params.customer_id]);

  // Function to handle button press
  const handleButtonPress = (buttonType) => {
    // Implement logic for each button type
    console.log(`Button pressed: ${buttonType}`);
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {customerDetails && (
          <Title style={styles.welcomeText}>
            Welcome to the customer dashboard, {customerDetails[0].username}
          </Title>
        )}
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          {/* Grid Layout with 3 Buttons and Icons */}
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleButtonPress("addVehicle")}
            >
              <Icon name="directions-car" size={30} color="#333" />
              <Text style={styles.buttonText}>Add Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleButtonPress("listVehicleDetails")}
            >
              <Icon name="format-list-bulleted" size={30} color="#333" />
              <Text style={styles.buttonText}>List Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleButtonPress("viewServiceHistory")}
            >
              <Icon name="history" size={30} color="#333" />
              <Text style={styles.buttonText}>View Service History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleButtonPress("locateRepairCenters")}
            >
              <Icon name="location-pin" size={30} color="#333" />
              <Text style={styles.buttonText}>Locate Repair Centers</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18, // Add fontSize to adjust the text size
  },
  card: {
    width: "80%",
    marginVertical: 10,
    padding: 10,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    backgroundColor: "#eee",
    margin: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    padding: 10,
  },
});
export default CustomerDashboard;
