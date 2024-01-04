import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const CustomerDashboard = ({ route }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repairCenterProfile, setRepairCenterProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const { customer_id } = route.params;
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
        );
        const data = await response.json();

        setCustomerDetails(data.customerDetails);

        const repairCenterCheckResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterUsername/${data.customerDetails[0].username}`
        );
        const repairCenterCheckData = await repairCenterCheckResponse.json();

        if (repairCenterCheckData.exists) {
          setRepairCenterProfile({
            repaircenter_id: repairCenterCheckData.repaircenter_id,
          });
        }

        console.log(repairCenterProfile);
        const repairCenterSellerCheckResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.customerDetails[0].username}`
        );
        const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json();

        if (repairCenterSellerCheckData.exists) {
          setRepairCenterSellerProfile({
            repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
          });
        }

      } catch (error) {
        // console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [route.params.customer_id]);

  const handleButtonPress = (buttonType) => {
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

      case "switchToRepairCenterProfile":
        navigation.navigate("RepairCenterDashboard", {
          repaircenter_id: repairCenterProfile.repaircenter_id,
        });
        break;
      case "switchToRepairCenterSellerProfile":
        navigation.navigate("RepairCenterPartsSeller", {
          repaircenter_id: repairCenterSellerProfile.repair_parts_seller_users_id,
        });
        break;

      default:
        console.log(`Button Pressed : ${buttonType}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          {repairCenterProfile && (
            <TouchableOpacity
              style={[styles.gridItem, styles.switchButton]}
              onPress={() => handleButtonPress("switchToRepairCenterProfile")}
            >
              <Icon name="build" size={30} color="#0d5563" />
              <Text style={styles.buttonText}>Switch to Repair Center Profile</Text>
            </TouchableOpacity>
          )}
          {repairCenterSellerProfile && (
            <TouchableOpacity
              style={[styles.gridItem, styles.switchButton]}
              onPress={() => handleButtonPress("switchToRepairCenterSellerProfile")}
            >
              <Icon name="sell" size={30} color="#0d5563" />
              <Text style={styles.buttonText}>Switch to Seller Profile</Text>
            </TouchableOpacity>
          )}
          {/* Other service buttons */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    paddingVertical: 5,
    paddingHorizontal : 20,
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
  switchButton:{
    marginHorizontal : 5
  }
});

export default CustomerDashboard;
