import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";

const PartsManagementPage = ({ route }) => {
  const { repaircenter_id } = route.params;
  const navigation = useNavigation();
  const [partsName, setPartsName] = useState("");
  const [partsImage, setPartsImage] = useState("");
  const [partsNumber, setPartsNumber] = useState("");
  const [partsQuantity, setPartsQuantity] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!repaircenter_id) navigation.navigate("Vechicle Guardian Landing Page");
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

  const handleSubmit = () => {
    // Validate the form fields here before submitting
    if (
      !partsName ||
      !partsImage ||
      !partsNumber ||
      !partsQuantity ||
      !selectedItem
    ) {
      alert("Please fill in all fields");
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

    // Call the onSubmit prop with the form data
    onSubmit(formData);
    console.log(formData);
    // Optionally, you can reset the form fields after submission
    setPartsName("");
    setPartsImage("");
    setPartsNumber("");
    setPartsQuantity("");
    setSelectedItem(null);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Parts Management Page for Repair Center ID: {repaircenter_id}</Title>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue) => setSelectedItem(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Data" value={null} />
            {dropdownData.map((item) => (
              <Picker.Item
                key={item.repaircenters_id}
                label={`${item.repaircenter_fname} - ${item.address}`}
                value={item.repaircenters_id}
              />
            ))}
          </Picker>
        </View>
        <TextInput
          label="Parts Name"
          value={partsName}
          onChangeText={(text) => setPartsName(text)}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Parts Image URL"
          value={partsImage}
          onChangeText={(text) => setPartsImage(text)}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Parts Number"
          value={partsNumber}
          onChangeText={(text) => setPartsNumber(text)}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          label="Parts Quantity"
          value={partsQuantity}
          onChangeText={(text) => setPartsQuantity(text)}
          keyboardType="numeric"
          style={{ marginVertical: 10 }}
        />
        <Button mode="contained" onPress={handleSubmit} style={{ marginVertical: 10 }}>
          Submit
        </Button>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 10,
    },
    picker: {
      height: 40,
      width: "100%",
    },
    card : {
        marginVertical : 10,
    }
  });
  
export default PartsManagementPage;
