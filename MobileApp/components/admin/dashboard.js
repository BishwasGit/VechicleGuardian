import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Alert } from "react-native";
import {
  List,
  IconButton,
  Tooltip,
  Portal,
  Modal,
  Button,
  Searchbar,
} from "react-native-paper";
import { WebView } from "react-native-webview";

const AdminDash = ({ route, navigation }) => {
  const admin_id = route.params;
  const [repairCenters, setRepairCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  // Check if admin_id is available
  if (!admin_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate("MainScreen");
    return null; // Render nothing if redirecting
  }

  useEffect(() => {
    // Fetch repair centers when the component mounts
    fetchRepairCenters();
  }, []);

  const fetchRepairCenters = async () => {
    try {
      // Send a request to the server to get the list of repair centers
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getUnverifiedRepairCentersList`
      );
      const data = await response.json();

      // Update the state with the received repair centers
      setRepairCenters(data.repairCenters); // Replace 'repairCenters' with the actual key in your response
    } catch (error) {
      console.error("Error fetching repair centers:", error);
      // Handle error as needed
    }
  };

  const handleViewDetails = (centerId) => {
    // Navigate to the details screen for the selected repair center using centerId
    // You can implement this navigation logic based on your app's structure
    // Example: navigation.navigate('RepairCenterDetails', { centerId });
  };

  const handleVerifyCenter = (center) => {
    setSelectedCenter(center);
    setModalVisible(true);
  };

  const handleConfirmVerification = async () => {
    const repaircenterId = selectedCenter.repaircenters_id;

    try {
      // Send a request to the server to update the verification status
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/verifyRepairCenter/${repaircenterId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as needed
          },
          body: JSON.stringify({ repaircenterId }),
        }
      );

      if (response.ok) {
        // If the server responds with a success status (2xx), you can handle it accordingly
        // For example, you may want to re-fetch the list of repair centers
        fetchRepairCenters();
        setRepairCenters((prevRepairCenters) =>
          prevRepairCenters.filter(
            (center) => center.repaircenters_id !== repaircenterId
          )
        );
        // Show an alert indicating verification success
        Alert.alert(
          "Verification Successful",
          `Repair center "${selectedCenter.repaircenter_fname}" has been verified.`
        );
      } else {
        // Handle the case where the server responds with an error status
        console.error("Verification failed:", response.statusText);
        Alert.alert(
          "Verification Failed",
          "Failed to verify the repair center. Please try again."
        );
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error during verification:", error);
      Alert.alert(
        "Network Error",
        "An error occurred. Please check your network connection and try again."
      );
    }

    // Close the modal and reset the selectedCenter
    setModalVisible(false);
    setSelectedCenter(null);
  };

  const handleCancelVerification = () => {
    // Close the modal and reset the selectedCenter
    setModalVisible(false);
    setSelectedCenter(null);
  };

  const handleSearch = (query) => {
    // Perform search logic here, e.g., filter repair centers based on the query
    setSearchQuery(query);
    // You can implement your own search logic based on your data structure
    // For example, filter repairCenters array based on the 'query' value
    const filteredCenters = repairCenters.filter((center) =>
      center.repaircenter_fname.toLowerCase().includes(query.toLowerCase())
    );
    setRepairCenters(filteredCenters);
  };
  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search Repair Centers"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <List.Section>
        <List.Subheader style={styles.heading}>
          Repair Centers List
        </List.Subheader>
        {repairCenters.map((center) => {
          const latitude = parseFloat(center.map.split(",")[0]);
          const longitude = parseFloat(center.map.split(",")[1]);
          const mapUrl = `https://www.google.com/maps/embed/v1/view?center=${latitude},${longitude}&zoom=15`;

          return (
            <List.Accordion
              key={center.repaircenters_id}
              style={styles.accordian}
              title={center.repaircenter_fname}
              titleStyle={styles.accordianTitle}
              expanded={expanded[center.repaircenters_id]}
              left={(props) => <List.Icon {...props} icon="folder" />}
              onPress={() => handlePress(center.repaircenters_id)} // Update this line
            >
              {/* Display vehicle details */}
              {[
                "repaircenters_id",
                "repaircenter_fname",
                "address",
                "map",
                "contact",
              ].map((detail) => (
                <View key={detail}>
                  <Text style={styles.mappedDetailsText}>
                    {detail.replace(/_/g, " ")}:{" "}
                    <Text style={{ paddingLeft: 20 }}>{center[detail]}</Text>
                  </Text>
                </View>
              ))}
              <View style={styles.iconButtonsContainer}>
                <Tooltip title="Mark as Verified" style={styles.iconButtons}>
                  <IconButton
                    icon="check"
                    onPress={() => handleVerifyCenter(center)}
                  />
                </Tooltip>
                <Tooltip title="View Details" style={styles.iconButtons}>
                  <IconButton
                    icon="eye"
                    onPress={() => handleViewDetails(center.repaircenters_id)}
                  />
                </Tooltip>
              </View>
            </List.Accordion>
          );
        })}
      </List.Section>

      {/* Verification Modal */}
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to verify this details?
            </Text>
            <Button mode="contained" onPress={handleConfirmVerification}>
              Yes, Verify
            </Button>
            <Button onPress={handleCancelVerification}>Cancel</Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000000",
  },
  detailsContainer: {
    alignItems: "center",
    backgroundColor: "#e6ccb2",
  },
  itemText: {
    marginRight: 16,
    backgroundColor: "#e6ccb2",
  },
  iconButtonsContainer: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  iconButtons: {
    backgroundColor: "#e6ccb2",
    padding: 5,
  },
  modalContainer: {
    padding: 16,
    backgroundColor: "#e6ccb2",
    margin: 16,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  accordian: {
    width: "100%",
    color: "white",
    backgroundColor: "#ddb892",
    padding: 10,
    paddingBottom: 10,
  },
  accordianTitle: {
    fontSize: 16, // Adjust the font size if necessary
  },
  mappedDetailsText: {
    width: "100%",
    color: "black",
    padding: 5,
    textAlign: "Left",
  },
  searchBar: {
    marginVertical: 16,
  },
});

export default AdminDash;
