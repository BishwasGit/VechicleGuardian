import React, { useState } from "react";
import { View, Text, TextInput, Picker, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddVehicleScreen = ({ route, navigation }) => {
  const { customer_id } = route.params;
  const [vehicleType, setVehicleType] = useState("Two Wheeler");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleLot, setVehicleLot] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [createdDate, setCreatedDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isExpiryPickerVisible, setExpiryPickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setCreatedDate(date);
    hideDatePicker();
  };

  const showExpiryPicker = () => {
    setExpiryPickerVisibility(true);
  };

  const hideExpiryPicker = () => {
    setExpiryPickerVisibility(false);
  };

  const handleExpiryConfirm = (date) => {
    setExpiryDate(date);
    hideExpiryPicker();
  };

  const handleAddVehicle = async () => {
    // Validate form data before sending to the server
    if (
      !customer_id ||
      !vehicleType ||
      !vehicleNumber ||
      !vehicleLot ||
      !vehicleCompany||
      !vehicleModel||
      !createdDate ||
      !expiryDate ||
      !ownerName ||
      !contactNumber
    ) {
      Alert.alert("Error", "Please fill in all the details.");
      return;
    }

    try {
      // Construct the bill book details as a JSON object
      const billBookDetails = {
        createdDate,
        expiryDate,
        ownerName,
        contactNumber,
      };

      // Send the form data to your server to handle table creation
      const response = await axios.post(
        "your-server-endpoint",
        {
          customer_id,
          vehicleType,
          vehicleNumber,
          vehicleLot,
          billBookDetails, // Include the bill book details
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Handle success, e.g., navigate to another screen
        navigation.navigate("ListVehicle");
      } else {
        // Handle server error
        Alert.alert("Error", "Failed to add vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Add your vehicle details below</Text>
      {/* Form for collecting vehicle details */}
      <View>
        <Text>Vehicle Details</Text>
        {/* Dropdown for selecting vehicle type */}
        <Picker
          selectedValue={vehicleType}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
        >
          <Picker.Item label="Two Wheeler" value="Two Wheeler" />
          <Picker.Item label="Four Wheeler" value="Four Wheeler" />
          <Picker.Item label="Cycle" value="Cycle" />
        </Picker>
        {/* Input for vehicle number */}
        <TextInput
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={(text) => setVehicleNumber(text)}
        />
        {/* Input for vehicle lot */}
        <TextInput
          placeholder="Vehicle Lot"
          value={vehicleLot}
          onChangeText={(text) => setVehicleLot(text)}
        />
        <TextInput
          placeholder="Vehicle Company"
          value={vehicleLot}
          onChangeText={(text) => setVehicleCompany(text)}
        />
        <TextInput
          placeholder="Vehicle Model"
          value={vehicleLot}
          onChangeText={(text) => setVehicleModel(text)}
        />
        {/* Bill Book details */}
        <Text>Bill Book Details</Text>
        <Button title="Select Created Date" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Button title="Select Expiry Date" onPress={showExpiryPicker} />
        <DateTimePickerModal
          isVisible={isExpiryPickerVisible}
          mode="date"
          onConfirm={handleExpiryConfirm}
          onCancel={hideExpiryPicker}
        />
        <TextInput
          placeholder="Owner Name"
          value={ownerName}
          onChangeText={(text) => setOwnerName(text)}
        />
        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
        {/* Button to submit the form */}
        <Button title="Add Vehicle" onPress={handleAddVehicle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    padding: 5,
    textAlign: "center",
  },
});

export default AddVehicleScreen;
