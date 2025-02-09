import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import { DataTable, Button, List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ListVehicleScreen = ({ route, navigation }) => {
  const {customer_id}  = route.params;
  const [vehicleData, setVehicleData] = useState([]);
  const [expanded, setExpanded] = useState({}); // Add this line
  const handleTrashIconPress = async (vehicleDetails_id) => {
    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/updateVehicleStatus/${vehicleDetails_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: 0 }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      setVehicleData((prevData) =>
        prevData.map((vehicle) =>
          vehicle.vehicleDetails_id === vehicleDetails_id
            ? { ...vehicle, status: 0 }
            : vehicle
        )
      );

      Alert.alert("Success", "Vehicle status updated successfully.");
    } catch (error) {
      console.error("Error updating vehicle status:", error);
    }
  };

  useEffect(() => {
    if (!customer_id) {
      navigation.navigate("MainScreen");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/vehicleDetails/${customer_id}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        setVehicleData(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();
  }, [customer_id, navigation]);

  const handlePress = (vehicleDetails_id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [vehicleDetails_id]: !prevExpanded[vehicleDetails_id],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.firstTitle}> Vehicle Lists</Text>
      <DataTable style={styles.table}>
        {vehicleData.map((vehicle) => (
          <List.Section
            style={styles.accordian}
            key={vehicle.vehicleDetails_id}
          >
            <List.Accordion
              style={styles.accordian}
              title={`${vehicle.vehicle_number}, ${
                JSON.parse(vehicle.bill_book_details).ownerName
              }`}
              titleStyle={styles.accordianTitle}
              left={(props) => (
                <List.Icon {...props} icon="folder" color="#c1121f" />
              )}
              expanded={expanded[vehicle.vehicleDetails_id]}
              onPress={() => handlePress(vehicle.vehicleDetails_id)} // Update this line
              color="white"
            >
              {/* Display vehicle details */}
              {[
                "vehicleDetails_id",
                "vehicle_type",
                "vehicle_model",
                "vehicle_company",
                "vehicle_number",
                "vehicle_lot_number",
              ].map((detail) => (
                <View key={detail}>
                  <Text style={styles.mappedDetailsText}>
                    {detail.replace(/_/g, " ")}:{" "}
                    <Text style={{ paddingLeft: 20 }}>{vehicle[detail]}</Text>
                  </Text>
                </View>
              ))}

              {/* Display bill book details */}
              <View>
                {[
                  "createdDate",
                  "expiryDate",
                  "ownerName",
                  "contactNumber",
                ].map((detail) => (
                  <Text key={detail} style={styles.mappedDetailsText}>
                    {detail.replace(/([A-Z])/g, " $1").trim()}:{" "}
                    <Text style={{ paddingLeft: 20 }}>
                      {JSON.parse(vehicle.bill_book_details)[detail]}
                    </Text>
                  </Text>
                ))}
              </View>
              {parseInt(vehicle.vehicle_for_income) === 1 && (
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate('VehicleIncomeExpenses', {
                      vehicleDetailsId: vehicle.vehicleDetails_id,
                    });
                  }}
                  style={styles.button}
                  icon={() => (
                    <Icon
                      name="plus"
                      size={20}
                      color="#FFFFFF"
                      style={styles.icon}
                    />
                    )}
                    labelStyle={{ color: "#FFFFFF" }}
                >
                  Manage Expenses
                </Button>
              )}
              <Button
                mode="contained"
                onPress={() => handleTrashIconPress(vehicle.vehicleDetails_id)}
                style={styles.button}
                icon={() => (
                  <Icon
                    name="trash-can-outline"
                    size={20}
                    color="#FFFFFF"
                    style={styles.icon}
                  />
                )}
                labelStyle={{ color: "#FFFFFF" }}
              >
                Delete Vehicle
              </Button>
            </List.Accordion>
          </List.Section>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 25,
  },
  firstTitle: {
    marginTop: "10%",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 25,
  },
  table: {
    marginTop: "10%",
  },

  mappedDetailsText: {
    width: "100%",
    color: "white",
    padding: 20,
    textAlign: "Left",
  },

  icon: {
    marginRight: 10,
    color: "white",
  },
  iconCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  accordian: {
    width: "100%",
    color: "white",
    backgroundColor: "#0d5563",
    padding: 10,
    paddingBottom: 10,
  },
  accordianTitle: {
    color: "white",
    fontSize: 16, // Adjust the font size if necessary
  },
  button: {
    margin: 20,
    padding: 5,
    color: "white",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#c1121f",
  },
});
export default ListVehicleScreen;
