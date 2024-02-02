import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import DashboardContent from "./dashboardContent.js";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  return <DashboardContent />;
};

const CustomerDashboard = ({ route }) => {
  const { customer_id } = route.params;
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repairCenterProfile, setRepairCenterProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] =
    useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!customer_id) {
        console.error("customer_id is undefined");
        return;
      }
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
        const repairCenterSellerCheckResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.customerDetails[0].username}`
        );
        const repairCenterSellerCheckData =
          await repairCenterSellerCheckResponse.json();

        if (repairCenterSellerCheckData.exists) {
          setRepairCenterSellerProfile({
            repair_parts_seller_users_id:
              repairCenterSellerCheckData.repair_parts_seller_users_id,
          });
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [customer_id]);

  const handleButtonPress = (buttonType) => {
    switch (buttonType) {
      case "switchToRepairCenterProfile":
        navigation.navigate("RepairCenterDashboard", {
          repaircenter_id: repairCenterProfile?.repaircenter_id,
        });
        break;
      case "switchToRepairCenterSellerProfile":
        navigation.navigate("RepairCenterPartsSeller", {
          repaircenter_id:
            repairCenterSellerProfile?.repair_parts_seller_users_id,
        });
        break;
    }
  };
  const handleMenuNavigation = (screen) => {
    navigation.navigate(screen, customer_id);
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menus"
        children={() => (
          <MenusScreen handleMenuNavigation={handleMenuNavigation} />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileScreen
            repairCenterProfile={repairCenterProfile}
            repairCenterSellerProfile={repairCenterSellerProfile}
            handleButtonPress={handleButtonPress}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="logout" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function MenusScreen({ handleMenuNavigation }) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("AddVehicle")}
      >
        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("ListVehicle")}
      >
        <Text style={styles.buttonText}>List Vehicle Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("ViewServiceHistory")}
      >
        <Text style={styles.buttonText}>View Service History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("LocateRepairCenters")}
      >
        <Text style={styles.buttonText}>Locate Repair Centers</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreen({
  repairCenterProfile,
  repairCenterSellerProfile,
  handleButtonPress,
}) {
  return (
    <View style={styles.container}>
      <Text>Profile Settings</Text>
      <View style={styles.buttonRow}>
        {repairCenterProfile && (
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() => handleButtonPress("switchToRepairCenterProfile")}
          >
            <Text style={styles.buttonText}>Switch to Repair Center</Text>
          </TouchableOpacity>
        )}
        {repairCenterSellerProfile && (
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() =>
              handleButtonPress("switchToRepairCenterSellerProfile")
            }
          >
            <Text style={styles.buttonText}>Switch to Seller Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Logout!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e1ad21",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%", // Adjust width as needed
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  switchprofilebutton: {
    flex: 1, // Add this line
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e1ad21",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Add this line for spacing between buttons
  },
});
export default CustomerDashboard;
