import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const RepairProcessScreen = ({ route, navigation }) => {
  const repaircenter_id = route.params;
  const [vehicleList, setVehicleList] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(""); // Initialize with an empty string

  useEffect(() => {
    const fetchVehicleList = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/fetchVehicleList`
        );
        const data = await response.json();

        // Update state with the fetched vehicle list
        setVehicleList(data);
      } catch (error) {
        console.error("Error fetching vehicle list:", error);
      }
    };

    fetchVehicleList();
  }, []);

  // Check if customer_id is available
  if (!repaircenter_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate("Vehicle Guardian Landing Page");
    return null; // Render nothing if redirecting
  }
  console.log(vehicleList);
  return (
    <View>
      {vehicleList && (
        <Picker
          selectedValue={selectedVehicleId}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedVehicleId(itemValue)
          }
        >
          {vehicleList.map((vehicle) => (
            <Picker.Item
              key={vehicle.vehicleDetails_id}
              label={vehicle.vehicle_number}
              value={vehicle.vehicle_lot_number}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default RepairProcessScreen;
