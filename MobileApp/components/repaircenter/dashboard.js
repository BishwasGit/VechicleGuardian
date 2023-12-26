import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { encode as base64Encode, decode as base64Decode } from "base-64";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const RepariCenterDashboard = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [repairCenterDetails, setRepairCenterDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();

  const [newDetails, setNewDetails] = useState({
    // Initialize with default values or leave empty
    fullname: "",
    address: "",
    contact: "",
    map: "",
    // Add more fields as needed
  });

  const [vacancyDetails, setNewVacancyDetails] = useState({
    // Initialize with default values or leave empty
    position: "",
    noOfPerson: "",
    salary: "",
    // Add more fields as needed
  });

  const handleCloseForm = () => {
    setShowForm(false);
    setNewDetails({
      fullname: "",
      address: "",
      contact: "",
      map: "",
    });
  };
  const handleCloseVacancyForm = () => {
    setShowVacancyForm(false);
    setNewVacancyDetails({
      position: "",
      noOfPerson: "",
      salary: "",
    });
  };

  // Fetch customer details based on repaircenter_id when the component mounts
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
      const { repaircenter_id } = route.params;

      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/RepairCenterDetails/${repaircenter_id}`
        );
        const data = await response.json();
        setRepairCenterDetails(data.repairCenterDetails);
      } catch (error) {
        console.error("Error fetching Repair Center details:", error);
      }
    };

    fetchRepairCenterDetails();
  }, [route.params.repaircenter_id]);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const { repaircenter_id } = route.params;
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkVerificationStatus/${repaircenter_id}`
        );
        const data = await response.json();
        setIsVerified(Boolean(data.verified));
      } catch (error) {
        console.error("Error fetching verification status:", error);
      }
    };

    checkVerificationStatus();
  }, [route.params.repaircenter_id]);

  const handleAddDetails = async () => {
    const mapBase64 = base64Encode(newDetails.map);
    //console.log(originalMap);
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(newDetails.contact)) {
      alert("Invalid contact number. Please enter a 10-digit number.");
      return;
    }

    // Validation for noOfPerson field
    const noOfPersonRegex = /^\d+$/;
    if (!noOfPersonRegex.test(vacancyDetails.noOfPerson)) {
      alert("Invalid number of persons. Please enter a valid number.");
      return;
    }
    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addRepairCenterDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repaircenter_id: repaircenter_id,
            fname: newDetails.fullname,
            address: newDetails.address,
            map: mapBase64,
            contact: newDetails.contact,
            vacancy: {
              position: vacancyDetails.position,
              noOfPerson: vacancyDetails.noOfPerson,
              salary: vacancyDetails.salary,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        // Show success alert
        alert(data.message);
      } else {
        // Show error alert
        alert(`Error: ${data.message}`);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding Repair Center details:", error);
    }
  };

  const handleStartRepairing = () => {
    console.log("Is Verified:", isVerified);
    if (isVerified) {
      // Add logic to navigate to the repair process screen or perform other actions
      navigation.navigate("RepairProcessScreen", {
        repaircenter_id: route.params.repaircenter_id,
      });
    } else {
      alert("Repair Center Verification Pending");
    }
  };

  //code to reterive map
  // const decodedIframe = Buffer.from(encodedIframe, 'base64').toString('utf-8');
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        {repairCenterDetails && (
          <Title style={styles.welcomeText}>
            Hi {repairCenterDetails[0].username}!{"\n"}
            <Title style={{ fontWeight: "normal", fontSize: 17 }}>
              Good Morning
            </Title>
          </Title>
        )}
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={() => setShowForm(true)}
        >
          <Icon name="directions-car" size={30} color="white" />
          <Text style={{ color: "white", padding: 10 }}>
            Add Repair Center Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={() => setShowVacancyForm(true)}
        >
          <Icon name="directions-car" size={30} color="white" />
          <Text style={{ color: "white", padding: 10 }}>Add Vacancy</Text>
        </TouchableOpacity>
      </View>

      <Button
        style={styles.addButton}
        mode="contained"
        onPress={handleStartRepairing}
      >
        <Text style={{ color: "white" }}>Start Repairing </Text>
      </Button>
      {showForm && (
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: "normal",
              fontSize: 17,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            Repair Center Form
          </Title>
          <IconButton
            icon="close"
            size={20}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseForm}
          />
          <Card.Content>
            <TextInput
              style={styles.field}
              label="Full name"
              underlineColor="transparent"
              value={newDetails.fullname}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, fullname: text })
              }
            />
            <TextInput
              style={styles.field}
              label="Address"
              underlineColor="transparent"
              value={newDetails.address}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, address: text })
              }
            />
            <TextInput
              style={styles.field}
              label="Contact"
              underlineColor="transparent"
              value={newDetails.contact}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, contact: text })
              }
            />
            <TextInput
              style={styles.field}
              label="Map Link"
              underlineColor="transparent"
              value={newDetails.map}
              placeholder="27.68899461302774, 85.28788243117607"
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, map: text })
              }
            />
            <Button style={styles.addButton} onPress={handleAddDetails}>
              <Text style={{ color: "white" }}>Add Details </Text>
            </Button>
          </Card.Content>
        </Card>
      )}
      {showVacancyForm && (
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: "normal",
              fontSize: 17,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            Add Vacancy Form
          </Title>
          <IconButton
            icon="close"
            size={20}
            color="black"
            style={styles.closeIcon}
            onPress={handleCloseVacancyForm}
          />
          <Card.Content>
            <TextInput
              style={styles.field}
              label="Position"
              underlineColor="transparent"
              value={vacancyDetails.position}
              onChangeText={(text) =>
                setNewVacancyDetails({
                  ...vacancyDetails,
                  position: text,
                })
              }
            />
            <TextInput
              style={styles.field}
              label="Number of person"
              underlineColor="transparent"
              value={vacancyDetails.noOfPerson}
              onChangeText={(text) =>
                setNewVacancyDetails({
                  ...vacancyDetails,
                  noOfPerson: text,
                })
              }
            />
            <TextInput
              style={styles.field}
              label="Salary"
              underlineColor="transparent"
              value={vacancyDetails.salary}
              placeholder="10k-20k"
              onChangeText={(text) =>
                setNewVacancyDetails({ ...vacancyDetails, salary: text })
              }
            />
            <Button
              style={styles.addButton}
              mode="contained"
              onPress={handleAddDetails}
            >
              <Text style={{ color: "white" }}>Add Details </Text>
            </Button>

            {/* Add more TextInput components for additional fields */}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#1e6091",
    marginVertical: 20,
    fontSize: 25,
    paddingBottom: -60,
  },

  gridItemActive: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#1e6091",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  gridContainer: {
    height: "100%",
    flex: 1,
    padding: 20,
    paddingTop: 35,
    paddingBottom: 285,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    justifyContent: "center",
    width: "100%",
    padding: 30,
    paddingTop: 50,
    position: "absolute",
    top: 1,
    backgroundColor: "#e6ccb2",
  },
  field: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#1e6091",
    marginVertical: 10,
    textDecoration: "none",
    backgroundColor: "#ede0d4",
  },
  addButton: {
    padding: 5,
    width: "80%",
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: 30,
    color: "white",
    backgroundColor: "#1e6091",
  },
  closeIcon: {
    position: "absolute",
    top: -30,
    right: -20,
    zIndex: 1,
  },
});

export default RepariCenterDashboard;
