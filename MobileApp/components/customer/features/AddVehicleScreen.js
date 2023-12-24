import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

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
      alert("Error", "Please fill in all the details.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(createdDate) || !dateRegex.test(expiryDate)) {
      setMessage("Error: Date format should be yyyy-mm-dd");
      return;
    }

    // Validate contactNumber
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      setMessage("Error: Contact number should be 10 digits");
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
    <ScrollView style={styles.card}>
      <Text style={styles.heading}>Add your vehicle details</Text>
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
        {/* Dropdown for selecting vehicle type */}
        <Picker
          selectedValue={vehicleType}
          label="vehicleType"
          style={styles.pickerContain}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
        >
          <Picker.Item
            style={styles.contain}
            label="Two Wheeler"
            value="Two Wheeler"
          />
          <Picker.Item
            style={styles.contain}
            label="Four Wheeler"
            value="Four Wheeler"
          />
          <Picker.Item style={styles.contain} label="Cycle" value="Cycle" />
        </Picker>

        <Text style={styles.text}>Vehicle Number :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={(text) => setVehicleNumber(text)}
        />
        {/* Input for vehicle lot */}
        <Text style={styles.text}>Vehicle Lot :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Lot"
          value={vehicleLot}
          onChangeText={(text) => setVehicleLot(text)}
        />
        <Text style={styles.text}>Vehicle Company :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="vehicle Company"
          value={vehicleCompany}
          onChangeText={(text) => setVehicleCompany(text)}
        />
        <Text style={styles.text}>Vehicle Model :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={(text) => setVehicleModel(text)}
        />
        {/* Bill Book details */}

        <Text style={styles.headingTo}>Bill Book Details</Text>
        <Text style={styles.text}>Created Date :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="yyyy-mm-dd"
          value={createdDate}
          onChangeText={(text) => setCreatedDate(text)}
        />
        <Text style={styles.text}>Expiry Date :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="yyyy-mm-dd"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
        />
        <Text style={styles.text}>Owner Name :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Owner Name"
          value={ownerName}
          onChangeText={(text) => setOwnerName(text)}
        />
        <Text style={styles.text}>Contact Number :</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />

        <TouchableOpacity
          onPress={handleAddVehicle}
          style={{
            backgroundColor: "#1e6091",
            marginTop: 40,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Add Vehicle
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
    marginBottom: 55,
  },
  pickerContain: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    color: "black",
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contain: {
    padding: 40,
    color: "black",
  },
  heading: {
    paddingTop: 30,
    paddingLeft: 20,
    color: "#1e6091",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
  headingTo: {
    paddingTop: 80,
    paddingLeft: 20,
    color: "#1e6091",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: -25,
    textAlign: "left",
  },
  textinput: {
    height: 45,
    backgroundColor: "#dee2e6",
    marginVertical: 10,
    borderColor: "#1e6091",
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 30,
  },
  submit: {
    color: "white",
    alignItems: "center",
    marginTop: 80,
    backgroundColor: "black",
  },
  successMessage: {
    color: "green",
    marginVertical: 10,
  },
  errorMessage: {
    color: "red",
    marginVertical: 10,
  },
  button: {
    color: "white",
    alignItems: "center",
    marginTop: 60,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "red",
    width: "100%",
  },
});

export default AddVehicleScreen;
