import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Snackbar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const PartsManagementPage = ({ route }) => {
  const { repaircenter_id } = route.params;
  const navigation = useNavigation();
  const [partsName, setPartsName] = useState("");
  const [partsImage, setPartsImage] = useState("");
  const [partsNumber, setPartsNumber] = useState("");
  const [partsQuantity, setPartsQuantity] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (!repaircenter_id) navigation.navigate("MainScreen");
  }, [navigation, repaircenter_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getUsersRepairCenters/${repaircenter_id}`
        );
        const data = await response.json();
        setDropdownData(data);
        if (data.length > 0) setSelectedItem(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [repaircenter_id]);

  const handleCloseForm = () => {
  navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      // Validate the form fields here before submitting
      if (
        !partsName ||
        !partsImage ||
        !partsNumber ||
        !partsQuantity ||
        !selectedItem
      ) {
        setSnackbarMessage("Please fill in all fields");
        setSnackbarVisible(true);
        return;
      }

      // Prepare the data to be submitted
      const formData = {
        repaircenter_id: repaircenter_id,
        partsName: partsName,
        partsImage: partsImage,
        partsNumber: partsNumber,
        partsQuantity: partsQuantity,
        selectedRepairCenterId: selectedItem,
      };


      // Send the data to the server
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addRepairParts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Form data submitted successfully:", data);
        setSnackbarMessage("Parts details added successfully");
        setSnackbarVisible(true);
        // Optionally, perform any actions after successful submission
      } else {
        console.error("Error submitting form data:", data);
        setSnackbarMessage("Failed to add parts details");
        setSnackbarVisible(true);
        // Optionally, handle the error (e.g., show an error message to the user)
      }

      // Optionally, you can reset the form fields after submission
      setPartsName("");
      setPartsImage("");
      setPartsNumber("");
      setPartsQuantity("");
      setSelectedItem(null);
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title style={styles.firstTitle}>
          Add your Parts

        </Title>
        <IconButton
            icon="close"
            size={20}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseForm}
          />
        <View style={styles.card}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue) => setSelectedItem(itemValue)}
              style={styles.pickerContain}
            >
              <Picker.Item label="Select Data" value={null} />
              {dropdownData.map((item) => (
                <Picker.Item
                  style={styles.contain}
                  key={item.repaircenters_id}
                  label={`${item.repaircenter_fname} - ${item.address}`}
                  value={item.repaircenters_id}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            label="Parts Name"
            style={styles.textinput}

            underlineColor="transparent"
            value={partsName}
            onChangeText={(text) => setPartsName(text)}

          />
          <TextInput
            label="Parts Image URL"
            style={styles.textinput}
            underlineColor="transparent"
            value={partsImage}
            onChangeText={(text) => setPartsImage(text)}

          />
          <TextInput
            label="Parts Number"
            style={styles.textinput}

            underlineColor="transparent"
            value={partsNumber}
            onChangeText={(text) => setPartsNumber(text)}

          />
          <TextInput
            label="Parts Quantity"
            style={styles.textinput}
            underlineColor="transparent"
            value={partsQuantity}
            onChangeText={(text) => setPartsQuantity(text)}
            keyboardType="numeric"

          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{
              padding: 8,
              color: 'white',
              alignItems: 'center',
              marginTop: '13%',
              backgroundColor: '#808000',
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Submit
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f5f5f5",
    paddingTop:60,
  },
  card: {
    paddingTop:60,
    padding: 30,
  },
  firstTitle: {
    marginTop: "13%",
    paddingLeft: "10%",
    alignItems: "left",
    color: "black",
    fontSize: 18,
  },
  pickerContainer:{
    marginBottom:30,

  },
  pickerContain: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    color: "white",
    backgroundColor: "#808000",
  },
  textinput: {
    marginBottom: 15,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 10,
    textDecorationLine: 'none',
    backgroundColor: 'white',
    elevation:2,
  },
  contain: {
    padding: 40,

  },
  closeIcon: {
    position: 'absolute',
    top: 105,
    right: 25,
    zIndex: 1,
  },
});

export default PartsManagementPage;
