import React, {useState, useEffect} from 'react';
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
import { encode as base64Encode } from "base-64";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const RepairCenterDashboard = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [repairCenterDetails, setRepairCenterDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showVacancyForm, setShowVacancyForm] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();
  const [documentsImage, setDocumentsImage] = useState(null);

  const [newDetails, setNewDetails] = useState ({
    fullname: '',
    address: '',
    contact: '',
    map: '',
  });
  const [vacancyDetails, setNewVacancyDetails] = useState ({
    position: '',
    noOfPerson: '',
    salary: '',
  });

  const handleCloseForm = () => {
    setShowForm (false);
    setNewDetails ({fullname: '', address: '', contact: '', map: ''});
  };
  const handleCloseVacancyForm = () => {
    setShowVacancyForm (false);
    setNewVacancyDetails ({position: '', noOfPerson: '', salary: ''});
  };
  const handleDocumentsImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        // Create a FormData object
        const formData = new FormData();

        // Append the image file to the FormData object
        formData.append("documents", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "documents.jpg",
        });

        console.log(formData);
        // Send the FormData object to the server using fetch or axios
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repaircenterDocuments`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Parse the response
        const responseData = await response.json();

        // Log the Cloudinary response
        console.log("Cloudinary response for Documents Image:", responseData);

        // If you want to store the Cloudinary URL in the state
        setDocumentsImage(responseData.secure_url);
      }
    } catch (error) {
      console.error("Error handling Documents image upload:", error);
    }
  };
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
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

      fetchRepairCenterDetails ();
    },
    [route.params.repaircenter_id]
  );

  useEffect (
    () => {
      const checkVerificationStatus = async () => {
        try {
          const response = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkVerificationStatus/${repaircenter_id}`
          );
          const data = await response.json ();
          setIsVerified (Boolean (data.verified));
        } catch (error) {
          console.error ('Error fetching verification status:', error);
        }
      };

      checkVerificationStatus ();
    },
    [route.params.repaircenter_id]
  );

  const handleAddDetails = async () => {
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test (newDetails.contact)) {
      alert ('Invalid contact number. Please enter a 10-digit number.');
      return;
    }

    try {
      const response = await fetch (
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addRepairCenterDetails`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
            repaircenter_id,
            fname: newDetails.fullname,
            address: newDetails.address,
            map: newDetails.address,
            contact: newDetails.contact,
            documents: documentsImage,
          }),
        }
      );

      const data = await response.json ();
      if (data.success) {
        alert (data.message);
      } else {
        alert (`Error: ${data.message}`);
      }
      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }
    } catch (error) {
      console.error ('Error adding Repair Center details:', error);
    }
  };

  const handleAddVacancyDetails = async () => {
    const noOfPersonRegex = /^\d+$/;
    if (!noOfPersonRegex.test (vacancyDetails.noOfPerson)) {
      alert ('Invalid number of persons. Please enter a valid number.');
      return;
    }

    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addVacancyDetails`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify ({
            repaircenter_id,
            vacancy: {
              position: vacancyDetails.position,
              noOfPerson: vacancyDetails.noOfPerson,
              salary: vacancyDetails.salary,
            },
          }),
        }
      );

      const data = await response.json ();
      if (data.success) {
        alert (data.message);
      } else {
        alert (`Error: ${data.message}`);
      }
      if (!response.ok) {
        throw new Error ('Network response was not ok');
      }
    } catch (error) {
      console.error ('Error adding Vacancy details:', error);
    }
  };

  const handleStartRepairing = () => {
    if (isVerified) {
      navigation.navigate ('AddWorkersScreen', {repaircenter_id});
    } else {
      alert ('Repair Center Verification Pending');
    }
  };

  const handleRepairHistory = () => {
    navigation.navigate ('RepairHistoryScreen', {repaircenter_id});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        {repairCenterDetails &&
          <Title style={styles.welcomeText}>
            Hi {repairCenterDetails[0].username}!{'\n'}
            <Title style={{fontWeight: 'normal', fontSize: 17}}>
              Good Morning
            </Title>
          </Title>}
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={() => setShowForm (true)}
        >
          <Icon
            name="directions-car"
            size={30}
            color="white"
            style={styles.icon}
          />
          <Text style={{color: 'white', padding: 10}}>
            Add Repair Center Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={() => setShowVacancyForm (true)}
        >
          <Icon
            name="directions-car"
            size={30}
            color="white"
            style={styles.icon}
          />
          <Text style={{color: 'white', padding: 10}}>Add Vacancy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={handleRepairHistory}
        >
          <Icon name="history" size={30} color="white" style={styles.icon} />
          <Text style={{color: 'white', padding: 10}}>Repair History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={() =>
            navigation.navigate ('PartsManagement', {repaircenter_id})}
        >
          <Icon name="build" size={30} color="white" style={styles.icon} />
          <Text style={{color: 'white', padding: 10}}>Parts Management</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItemActive}
          onPress={handleStartRepairing}
        >
          <Icon name="people" size={30} color="white" style={styles.icon} />
          <Text style={{color: 'white', padding: 10}}>Add Workers</Text>
        </TouchableOpacity>
      </View>
      {showForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 17,
              paddingTop: 130,
              paddingLeft: 20,
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
              onChangeText={text =>
                setNewDetails ({...newDetails, fullname: text})}
            />
            <TextInput
              style={styles.field}
              label="Address"
              underlineColor="transparent"
              value={newDetails.address}
              onChangeText={text =>
                setNewDetails ({...newDetails, address: text})}
            />
            <TextInput
              style={styles.field}
              label="Contact"
              underlineColor="transparent"
              value={newDetails.contact}
              onChangeText={text =>
                setNewDetails ({...newDetails, contact: text})}
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
            <TouchableOpacity
              onPress={handleDocumentsImageUpload}
              style={{
                padding: 15,
                alignItems: "center",
                marginTop: 20,
                backgroundColor: "#0d5563",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Upload Document Image
              </Text>
            </TouchableOpacity>
            {documentsImage && (
              <Image
                source={{ uri: documentsImage }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Button style={styles.addButton} onPress={handleAddDetails}>
              <Text style={{color: 'white'}}>Add Details </Text>
            </Button>
          </Card.Content>
        </Card>}
      {showVacancyForm &&
        <Card style={styles.card}>
          <Title
            style={{
              fontWeight: 'normal',
              fontSize: 17,
              paddingTop: 130,
              paddingLeft: 20,
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

          <TextInput
            style={styles.field}
            label="Position"
            underlineColor="transparent"
            value={vacancyDetails.position}
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, position: text})}
          />
          <TextInput
            style={styles.field}
            label="Number of person"
            underlineColor="transparent"
            value={vacancyDetails.noOfPerson}
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, noOfPerson: text})}
          />
          <TextInput
            style={styles.field}
            label="Salary"
            underlineColor="transparent"
            value={vacancyDetails.salary}
            placeholder="10k-20k"
            onChangeText={text =>
              setNewVacancyDetails ({...vacancyDetails, salary: text})}
          />
          <Button
            style={styles.addButton}
            mode="contained"
            onPress={handleAddVacancyDetails}
          >
            <Text style={{color: 'white'}}>Add Vacancy</Text>
          </Button>
        </Card>}
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f1e9',
  },
  heading: {
    paddingTop: 30,
    paddingLeft: 45,
    alignItems: 'left',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#c1121f',
    marginVertical: 20,
    fontSize: 25,
    paddingBottom: -60,
  },
  gridItemActive: {
    width: '100%',
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 50,
    alignItems: 'center',
    backgroundColor: '#0d5563',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row', // Align icon and text horizontally
  },
  icon: {
    marginLeft: 30, // Space between icon and text
    marginRight: 20,
  },
  gridContainer: {
    padding: 30,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  card: {
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    padding: 30,
    position: 'absolute',
    top: 1,
    backgroundColor: '#f5f1e9',
  },
  field: {
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#1e6091',
    marginVertical: 10,
    textDecorationLine: 'none',
    backgroundColor: '#edf2f4',
  },
  addButton: {
    padding: 5,
    color: 'white',
    alignItems: 'center',
    marginTop: '13%',
    backgroundColor: '#c1121f',
  },
  closeIcon: {
    position: 'absolute',
    top: -30,
    right: -20,
    zIndex: 1,
  },
});

export default RepairCenterDashboard;
