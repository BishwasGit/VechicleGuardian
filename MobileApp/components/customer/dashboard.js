import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const CustomerDashboard = ({ route }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const navigation = useNavigation();
  // Fetch customer details based on customer_id when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const { customer_id } = route.params;
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
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
  console.log(route.params.customer_id);

  const handleButtonPress = (buttonType) => {
    // navigating to respective pages using switch statements

    switch (buttonType) {
      case "addVehicle":
        navigation.navigate("AddVehicle", {
          customer_id: route.params.customer_id,
        });
        break;

      case "listVehicleDetails":
        navigation.navigate("ListVehicle", {
          customer_id: route.params.customer_id,
        });
        break;

      case "viewServiceHistory":
        navigation.navigate("ViewServiceHistory", {
          customer_id: route.params.customer_id,
        });
        break;

      case "locateRepairCenters":
        navigation.navigate("LocateRepairCenters", {
          customer_id: route.params.customer_id,
        });
        break;

      default:
        console.log(`Button Pressed : ${buttonType}`);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {customerDetails && (
          <Title style={styles.welcomeText}>
            Hi {customerDetails[0].username}!{"\n"}
            <Title style={{ fontWeight: "normal", fontSize: 17 }}>
              Good Morning
            </Title>
          </Title>
        )}
      </View>

      <View style={styles.containerTwo}>
        <View style={styles.head}>
          <Title style={{ fontSize: 20, color: "#073b4c" }}>
            Welcome!{"\n"}
            <Title style={{ fontSize: 14, color: "#073b4c" }}>
              Let's get started with our services.
            </Title>
          </Title>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.headTwo}>
            <Title
              style={{ fontSize: 18, fontWeight: "bold", color: "#073b4c" }}
            >
              Our Services :
            </Title>
          </View>
          <TouchableOpacity
            style={styles.gridItemActive}
            onPress={() => handleButtonPress("addVehicle")}
          >
            <Icon name="directions-car" size={30} color="white" />
            <Text style={{ color: "white", padding: 10 }}>Add Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("listVehicleDetails")}
          >
            <Icon name="format-list-bulleted" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>List Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("viewServiceHistory")}
          >
            <Icon name="history" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>View Service History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("locateRepairCenters")}
          >
            <Icon name="location-pin" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>Locate Repair Centers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1e9",
  },
  containerTwo: {
    alignItems: "center",
    paddingTop: 20,
  },
  heading: {
    paddingTop: 30,
    paddingLeft: 25,
    alignItems: "left",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#c1121f",
    marginVertical: 20,
    fontSize: 25,
    paddingBottom: -60,
  },
  head: {
    width: "90%",
    marginVertical: 10,
    padding: 20,
    borderColor: "#c1121f",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headTwo: {
    width: "90%",
    paddingLeft: 10,
    paddingBottom: 15,
  },

  gridItemActive: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#0d5563",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  gridContainer: {
    padding: 20,
    paddingTop: 35,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderColor: "#c1121f",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  buttonText: {
    fontWeight: "bold",
    padding: 10,
  },
});
export default CustomerDashboard;
