import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState } from "react";
import { IconButton } from 'react-native-paper';
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Snackbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AddWorkerScreen = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [userName, setUserName] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const navigation = useNavigation();

  const handleAddWorker = async () => {
    // Validate the form fields before submitting
    if (!workerName || !password || !phoneNumber || !emailAddress) {
      alert("Please fill in all fields");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Phone number must be 10 digits");
      return;
    }
    // Prepare the data to be submitted
    const formData = {
      repaircenter_id: repaircenter_id,
      userName: userName,
      workerName: workerName,
      password: password,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
    };

    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addWorkers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        if (
          responseData.message &&
          responseData.message.toLowerCase().includes("exists")
        ) {
          alert("Phone number, email address, or username already exists.");
        } else {
          console.error("Failed to add worker:", response.status);
        }
        return;
      }

      // Optionally, you can handle the successful response (e.g., show a success message)
      console.log("Worker added successfully!");

      // Optionally, you can reset the form fields after submission
      setUserName("");
      setWorkerName("");
      setPassword("");
      setPhoneNumber("");
      setEmailAddress("");
    } catch (error) {
      console.error("Error adding worker:", error);
      // Handle errors, show error messages, etc.
    }
  };
  const handleCloseForm = () => {
    navigation.goBack();
    };

  return (
    <ScrollView>

      <Card style={styles.card}>
        {/* <Title style={styles.firstTitle}>
          <Title style={{ fontWeight: "normal", fontSize: 17 }}>
            Repair Center ID: {repaircenter_id}
          </Title>
        </Title> */}
        <Title
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              paddingTop: 40,
              paddingLeft: 20,
              paddingBottom: 10,
              fontWeight: 'bold'
            }}
          >
            Add Workers
          </Title>
          <IconButton
            icon='close'
            size={20}
            color='black'
            style={styles.closeIcon}
            onPress={handleCloseForm}

          />

        <View style={styles.card}>
          <TextInput
            label="User Name"
            style={styles.textinput}
            underlineColor="transparent"
            value={userName}
            onChangeText={(text) => setUserName(text)}

          />
          <TextInput
            label="Worker Name"
            style={styles.textinput}
            underlineColor="transparent"
            value={workerName}
            onChangeText={(text) => setWorkerName(text)}

          />
          <TextInput
            label="Password"
            style={styles.textinput}
            underlineColor="transparent"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry

          />
          <TextInput
            label="Phone Number"
            style={styles.textinput}
            underlineColor="transparent"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"

          />
          <TextInput
            label="Email Address"
            style={styles.textinput}
            underlineColor="transparent"
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
            keyboardType="email-address"

          />
          <Button
            mode="contained"
            onPress={handleAddWorker}
            style={{
              padding: 8,
              color: 'white',
              alignItems: 'center',
              marginTop: '13%',
              backgroundColor: '#808000'
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Add Worker
            </Text>
          </Button>
        </View>
        </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  card: {
    paddingTop: 90,
    width: '100%',
    padding: 20,
    // position: 'absolute',
    backgroundColor: '#f5f5f5',
  },
  closeIcon: {
    position: 'absolute',
    top: 35,
    right: 10,
    zIndex: 1
  },
  firstTitle: {
    marginTop: "13%",
    paddingLeft: "10%",
    alignItems: "left",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 23,
  },
  pickerContain: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    color: "white",
    backgroundColor: "#0d5563",
  },
  textinput: {
    height: 50,
    backgroundColor: "#edf2f4",
    width: "100%",
    marginBottom: 10,
    marginVertical: 10
  },
  contain: {
    padding: 40,
  },
});

export default AddWorkerScreen;
