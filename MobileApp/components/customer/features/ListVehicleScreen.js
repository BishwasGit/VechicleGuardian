import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { DataTable, Modal, Portal, Button } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ListVehicleScreen = ({ route, navigation }) => {
  const [vehicleData, setVehicleData] = useState([]);
  const { customer_id } = route.params;
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = (vehicleDetails_id) => {
    const selected = vehicleData.find(
      (vehicle) => vehicle.vehicleDetails_id === vehicleDetails_id
    );
    setSelectedVehicle(selected);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  const handleTrashIconPress = async (vehicleDetails_id) => {
    try {
      // Send a request to change the status to 0 for the selected vehicleDetails_id
      // Assuming you have an API endpoint for updating the status
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/updateVehicleStatus/${vehicleDetails_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 0 }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the local state to reflect the change
      setVehicleData((prevData) =>
        prevData.map((vehicle) =>
          vehicle.vehicleDetails_id === vehicleDetails_id
            ? { ...vehicle, status: 0 }
            : vehicle
        )
      );

      // Show a success message or perform any additional actions
      Alert.alert("Success", "Vehicle status updated successfully.");
    } catch (error) {
      console.error("Error updating vehicle status:", error);
      // Handle errors as needed
    }
  };
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

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={styles.container}>
      <Text style={styles.firstTitle}> Vechile List</Text>
      <DataTable style={styles.table}>
        {vehicleData.map((vehicle) => (
          <DataTable.Row key={vehicle.vehicleDetails_id}>
            <List.Section style={styles.accordian}>
              <List.Accordion
                style={styles.accordian}
                title={`${vehicle.vehicle_number}, ${
                  JSON.parse(vehicle.bill_book_details).ownerName
                }`}
                left={(props) => <List.Icon {...props} icon="folder" />}
                expanded={expanded[vehicle.vehicleDetails_id]}
                onPress={handlePress}
              >
                <View>
                  <Text style={styles.mappedDetailsText}>
                    Vehicle ID :
                    <Text style={{ paddingLeft: 20 }}>
                      {vehicle.vehicleDetails_id}
                    </Text>
                  </Text>
                </View>

                <View>
                  <Text style={styles.mappedDetailsText}>
                    Vehicle Type :
                    <Text style={{ paddingLeft: 20 }}>
                      {vehicle.vehicle_type}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.mappedDetailsText}>
                    Vehicle Number :{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {vehicle.vehicle_number}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.mappedDetailsText}>
                    Vehicle Lot Number :{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {vehicle.vehicle_lot_number}
                    </Text>
                  </Text>
                </View>

                <View>
                  <Text style={styles.mappedDetailsText}>
                    Created On:{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {JSON.parse(vehicle.bill_book_details).createdDate}
                    </Text>
                  </Text>
                  <Text style={styles.mappedDetailsText}>
                    Expired On:{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {JSON.parse(vehicle.bill_book_details).expiryDate}
                    </Text>
                  </Text>
                  <Text style={styles.mappedDetailsText}>
                    Owner Name:{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {" "}
                      {JSON.parse(vehicle.bill_book_details).ownerName}
                    </Text>
                  </Text>
                  <Text style={styles.mappedDetailsText}>
                    Contact Number:{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {JSON.parse(vehicle.bill_book_details).contactNumber}
                    </Text>
                  </Text>
                </View>
              </List.Accordion>
            </List.Section>

            <DataTable.Cell style={styles.iconCell}>
              <TouchableOpacity
                onPress={() => showModal(vehicle.vehicleDetails_id)}
              >
                <Icon name="eye" size={20} color="#000" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTrashIconPress(vehicle.vehicleDetails_id)}
              >
                <Icon
                  name="trash-can-outline"
                  size={20}
                  color="#FF0000"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {/* Modal */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Vehicle Details</Text>
          {selectedVehicle && (
            <View>
              {/* Display additional details from selectedVehicle */}
              <Text>Vehicle ID: {selectedVehicle.vehicleDetails_id}</Text>
              <Text>Type: {selectedVehicle.vehicle_type}</Text>
              <Text>Modal: {selectedVehicle.vehicle_modal}</Text>
              <Text>Company: {selectedVehicle.vehicle_company}</Text>
              <Text>Number: {selectedVehicle.vehicle_number}</Text>
              <Text>Lot: {selectedVehicle.vehicle_lot_number}</Text>
              <Text style={styles.modalTitle}>Bill Book Details</Text>
              <Text>{JSON.parse(vehicle.bill_book_details).createdDate}</Text>
              <Text>{JSON.parse(vehicle.bill_book_details).expiryDate}</Text>
              <Text>{JSON.parse(vehicle.bill_book_details).ownerName}</Text>
              <Text>{JSON.parse(vehicle.bill_book_details).contactNumber}</Text>
            </View>
          )}
          <Button onPress={hideModal}>Close</Button>
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  firstTitle: {
    paddingTop: 10,
    color: "#bc6c25",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 0,
  },
  table: {
    paddingTop: 30,
  },
  tableHeader: {
    backgroundColor: "#1e6091", // Adjust the color to your liking
  },

  billBookCell: {
    flex: 2, // Adjust the flex to control the width of the cell
  },
  billBookText: {
    marginBottom: 5,
    fontSize: 12,
    textAlign: "center",
  },
  mappedDetailsText: {
    width: "100%",
    color: "black",
    padding: 10,
    textAlign: "Left",
  },

  icon: {
    marginRight: 10,
  },
  iconCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accordian: {
    width: "100%",
    color: "white",
    backgroundColor: "#bc6c25",
  },
});
export default ListVehicleScreen;
