import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';

const AddVehicleScreen = ({ route }) => {
  const { customer_id } = route.params;
  const [vehicleType, setVehicleType] = useState("Two Wheeler");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleLot, setVehicleLot] = useState("");
  const [vehicleCompany, setVehicleCompany] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState(null);

  const handleAddVehicle = async () => {
    // Validate form data before sending to the server
    if (
      !customer_id ||
      !vehicleType ||
      !vehicleNumber ||
      !vehicleLot ||
      !vehicleCompany ||
      !vehicleModel ||
      !ownerName ||
      !contactNumber
    ) {
      Alert.alert("Error", "Please fill in all the details.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(createdDate) || !dateRegex.test(expiryDate)) {
      setMessage('Error: Date format should be yyyy-mm-dd');
      return;
    }
  
    // Validate contactNumber
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      setMessage('Error: Contact number should be 10 digits');
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
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/storeVehicleDetails`,
        {
          customer_id,
          vehicleType,
          vehicleNumber,
          vehicleLot,
          vehicleCompany,
          vehicleModel,
          billBookDetails, // Include the bill book details
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        // Update the message state for success
        setMessage(response.data.message);
        setVehicleType("Two Wheeler");
        setVehicleNumber("");
        setVehicleLot("");
        setVehicleCompany("");
        setVehicleModel("");
        setCreatedDate("");
        setExpiryDate("");
        setOwnerName("");
        setContactNumber("");
      } else {
        // Update the message state for error
        setMessage(response.data.error || "Failed to store vehicle details.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      // Update the message state for error
      setMessage(
        "Something went wrong. Please try again.Maybe Vehicle Number already exists"
      );
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Add your vehicle details below</Text>
      {/* Display message */}
      {message && (
        <Text
          style={
            message.startsWith("Success")
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message}
        </Text>
      )}
      {/* Form for collecting vehicle details */}
      <View style={styles.container}>
        <Text style={styles.heading}>Vehicle Details</Text>
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
          value={vehicleCompany}
          onChangeText={(text) => setVehicleCompany(text)}
        />
        <TextInput
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={(text) => setVehicleModel(text)}
        />
        {/* Bill Book details */}
        <Text style={styles.heading}>Bill Book Details</Text>

        <TextInput
          placeholder="yyyy-mm-dd"
          value={createdDate}
          onChangeText={(text) => setCreatedDate(text)}
        />
     <TextInput
          placeholder="yyyy-mm-dd"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
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
        <Button
          title="Add Vehicle"
          onPress={handleAddVehicle}
          style={styles.submit}
          color="#1E6738"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
  },
  heading: {
    padding: 5,
    textAlign: "center",
  },
  submit: {
    padding: 5,
    textAlign: "center",
    backgroundColor: "green",
  },
  successMessage: {
    color: "green",
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
    marginVertical: 10,
  },
});

export default AddVehicleScreen;
