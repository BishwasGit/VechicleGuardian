import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListVehicleScreen = ({ route, navigation }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const { customer_id } = route.params;

  const renderActionCell = () => (
    <DataTable.Cell style={styles.actionCell}>
      <Icon name="eye" size={20} color="#000" style={styles.icon} />
      <Icon name="trash-can-outline" size={20} color="#FF0000" style={styles.icon} />
    </DataTable.Cell>
  );
  useEffect(() => {
    // Check if customer_id is available
    if (!customer_id) {
      // Redirect to the main landing page or any other desired screen
      navigation.navigate("Vechicle Guardian Landing Page");
      return;
    }

    // Fetch vehicle data from the Node.js server
    const fetchData = async () => {
      // Check if customer_id is available
      if (!customer_id) {
        // Redirect to the main landing page or any other desired screen
        navigation.navigate("Vehicle Guardian Landing Page");
        return;
      }

      try {
        // Fetch vehicle data from the Node.js server
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/vehicleDetails/${customer_id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Update the state with the fetched data
        setVehicleData(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        // Handle errors as needed
      }
    };

    fetchData();
  }, [customer_id, navigation]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Vehicle ID</DataTable.Title>
          <DataTable.Title>Type</DataTable.Title>
          <DataTable.Title>Number</DataTable.Title>
          <DataTable.Title>LOT</DataTable.Title>
          <DataTable.Title>Company</DataTable.Title>
          <DataTable.Title>Model</DataTable.Title>
          <DataTable.Title>Bill Book Details</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {vehicleData.map((vehicle) => (
          <DataTable.Row
            key={vehicle.vehicleDetails_id}
            style={styles.tableRow}
          >
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicleDetails_id}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicle_type}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicle_number}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicle_lot_number}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicle_company}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.mappedDetailsText}>
                {vehicle.vehicle_model}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.billBookCell}>
              <View>
                <Text style={styles.billBookText}>
                  Created On:{" "}
                  {JSON.parse(vehicle.bill_book_details).createdDate}
                </Text>
                <Text style={styles.billBookText}>
                  Expired On: {JSON.parse(vehicle.bill_book_details).expiryDate}
                </Text>
                <Text style={styles.billBookText}>
                  Owner Name: {JSON.parse(vehicle.bill_book_details).ownerName}
                </Text>
                <Text style={styles.billBookText}>
                  Contact Number:{" "}
                  {JSON.parse(vehicle.bill_book_details).contactNumber}
                </Text>
              </View>
            </DataTable.Cell>
            {renderActionCell()}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    backgroundColor: "#D672F4", // Adjust the color to your liking
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#1C0744",
  },
  billBookCell: {
    flex: 2, // Adjust the flex to control the width of the cell
  },
  billBookText: {
    marginBottom: 5,
    fontSize: 12,
    textAlign : 'center'
  },
  mappedDetailsText: {
    color: "#000",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});
export default ListVehicleScreen;
