import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import * as ImagePicker from 'expo-image-picker';


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
  const [vehicleImage, setVehicleImage] = useState(null);
  const [billBookImage, setBillBookImage] = useState(null);


  
  const handleVehicleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setVehicleImage(result.uri);
      }
    } catch (error) {
      console.error('Error handling vehicle image upload:', error);
    }
  };
  
  const handleBillBookImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setBillBookImage(result.uri);
      }
    } catch (error) {
      console.error('Error handling bill book image upload:', error);
    }
  };


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
      const images = {
        vehicleImage,
        billBookImage,
      };
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
          images,
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

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Vehicle Number"
          value={vehicleNumber}
          onChangeText={(text) => setVehicleNumber(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Vehicle Lot"
          value={vehicleLot}
          onChangeText={(text) => setVehicleLot(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="vehicle Company"
          value={vehicleCompany}
          onChangeText={(text) => setVehicleCompany(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Vehicle Model"
          value={vehicleModel}
          onChangeText={(text) => setVehicleModel(text)}
        />
        {/* Bill Book details */}

        <Text style={styles.headingTo}>Bill Book Details</Text>

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Created Date : yyyy-mm-dd"
          value={createdDate}
          onChangeText={(text) => setCreatedDate(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Expiry Date : yyyy-mm-dd"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Owner Name"
          value={ownerName}
          onChangeText={(text) => setOwnerName(text)}
        />

        <TextInput
          style={styles.textinput}
          mode="outlined"
          underlineColor="transparent"
          label="Contact Number"
          value={contactNumber}
          onChangeText={(text) => setContactNumber(text)}
        />
        <TouchableOpacity
          onPress={handleVehicleImageUpload}
          style={{
            padding: 15,
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#0d5563",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Upload Vehicle Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBillBookImageUpload}
          style={{
            padding: 15,
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#0d5563",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Upload Bill Book Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddVehicle}
          style={{
            padding: 15,
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#0d5563",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Add Vehicle Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* Upload buttons */}

      {/* Display uploaded images */}
      {vehicleImage && (
          <Image
            source={{ uri: vehicleImage }}
            style={{ width: 100, height: 100 }}
          />
        )}

        {billBookImage && (
          <Image
            source={{ uri: billBookImage }}
            style={{ width: 100, height: 100 }}
          />
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f5f1e9",
  },
  container: {
    padding: 35,
    gap: 20,
    marginBottom: 55,
  },
  pickerContain: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    color: "white",
    backgroundColor: "#0d5563",
  },
  contain: {
    padding: 40,
    color: "black",
  },
  heading: {
    marginTop: "10%",
    paddingLeft: "10%",
    alignItems: "left",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 22,
  },
  headingTo: {
    marginTop: "10%",
    alignItems: "left",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 20,
  },

  textinput: {
    height: 50,
    backgroundColor: "#edf2f4",
    width: "100%",
    marginBottom: 10,
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
