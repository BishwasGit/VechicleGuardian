import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Button, TextInput } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
<<<<<<< HEAD
import Icon from "react-native-vector-icons/MaterialIcons";
import { encode as base64Encode, decode as base64Decode } from "base-64";
=======
import { encode as base64Encode, decode as base64Decode } from 'base-64';
import { useNavigation } from '@react-navigation/native';

>>>>>>> dbd86c80d47af607adec7602378a29dd4bfcb4c4

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
      navigation.navigate('RepairProcessScreen',{repaircenter_id : route.params.repaircenter_id});
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

<<<<<<< HEAD
      <View style={styles.containerTwo}>
        <View style={styles.head}>
          <Title style={{ fontSize: 20, color: "#073b4c" }}>
            Welcome!{"\n"}
            <Title style={{ fontSize: 14, color: "#073b4c" }}>
              Let's get started with our services.
            </Title>
          </Title>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.headTwo}>
            <Title style={{ fontSize: 14, color: "#073b4c" }}>
              Let's get started with our services.
            </Title>
          </View>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setShowForm(true)}
          >
            <Icon name="directions-car" size={30} color="#1e6091" />
            <Text style={styles.addButton}>Add Repair Center Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setShowVacancyForm(true)}
          >
            <Icon name="format-list-bulleted" size={30} color="#1e6091" />
            <Text style={styles.addButton}>Add Vacancy</Text>
          </TouchableOpacity>
        </View>
        {showForm && (
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                style={styles.field}
                label="Full name"
                value={newDetails.fullname}
                onChangeText={(text) =>
                  setNewDetails({ ...newDetails, fullname: text })
                }
              />
              <TextInput
                style={styles.field}
                label="Address"
                value={newDetails.address}
                onChangeText={(text) =>
                  setNewDetails({ ...newDetails, address: text })
                }
              />
              <TextInput
                style={styles.field}
                label="Contact"
                value={newDetails.contact}
                onChangeText={(text) =>
                  setNewDetails({ ...newDetails, contact: text })
                }
              />
              <TextInput
                style={styles.field}
                label="Map Link"
                value={newDetails.map}
                placeholder="https://maps.app.goo.gl/boxNWUPhqfcUEGk77"
                onChangeText={(text) =>
                  setNewDetails({ ...newDetails, map: text })
                }
              />
              <Button mode="contained" onPress={handleAddDetails}>
                Add Details
              </Button>

              {showVacancyForm && (
                <Card style={styles.card}>
                  <Card.Content>
                    <TextInput
                      style={styles.field}
                      label="Position"
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
                      value={vacancyDetails.salary}
                      placeholder="10k-20k"
                      onChangeText={(text) =>
                        setNewVacancyDetails({
                          ...vacancyDetails,
                          salary: text,
                        })
                      }
                    />
                  </Card.Content>
                </Card>
              )}
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
=======
      <TouchableOpacity onPress={() => setShowForm(true)}>
        <Text style={styles.addButton}>Add Repair Center Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowVacancyForm(true)}>
        <Text style={styles.addButton}>Add Vacancy</Text>
      </TouchableOpacity>
      <Button mode="contained" onPress={handleStartRepairing}>
        Start Repairing
      </Button>
      {showForm && (
        <Card style={styles.card}>
          <Card.Content>
          <TextInput
              label="Full name"
              value={newDetails.fullname}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, fullname: text })
              }
            />
            <TextInput
              label="Address"
              value={newDetails.address}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, address: text })
              }
            />
            <TextInput
              label="Contact"
              value={newDetails.contact}
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, contact: text })
              }
            />
            <TextInput
              label="Map Link"
              value={newDetails.map}
              placeholder='https://maps.app.goo.gl/boxNWUPhqfcUEGk77'
              onChangeText={(text) =>
                setNewDetails({ ...newDetails, map: text })
              }
            />
            <Button mode="contained" onPress={handleAddDetails}>
              Add Details
            </Button>
            {showVacancyForm && (
              <Card style={styles.card}>
                <Card.Content>
                  <TextInput
                    label="Position"
                    value={vacancyDetails.position}
                    onChangeText={(text) =>
                      setNewVacancyDetails({
                        ...vacancyDetails,
                        position: text,
                      })
                    }
                  />
                  <TextInput
                    label="Number of person"
                    value={vacancyDetails.noOfPerson}
                    onChangeText={(text) =>
                      setNewVacancyDetails({
                        ...vacancyDetails,
                        noOfPerson: text,
                      })
                    }
                  />
                  <TextInput
                    label="Salary"
                    value={vacancyDetails.salary}
                    placeholder="10k-20k"
                    onChangeText={(text) =>
                      setNewVacancyDetails({ ...vacancyDetails, salary: text })
                    }
                  />
                  {/* Add more TextInput components for additional fields */}
                </Card.Content>
              </Card>
            )}
          </Card.Content>
        </Card>
      )}
    </View>
>>>>>>> dbd86c80d47af607adec7602378a29dd4bfcb4c4
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
  head: {
    width: "90%",
    marginVertical: 10,
    padding: 20,
    borderColor: "#1e6091",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  gridContainer: {
    padding: 20,
    paddingTop: 35,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderColor: "#1e6091",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    width: "95%",
    padding: 15,
    paddingBottom: 155,
  },
  field: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "#bc6c25",
    marginVertical: 10,
    textDecoration: "none",
  },
  addButton: {
    fontWeight: "bold",
    padding: 10,
  },
});

export default RepariCenterDashboard;
