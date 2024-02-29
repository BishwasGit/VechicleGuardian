import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title, Card, Checkbox, Snackbar } from "react-native-paper";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

const RegistrationScreen = ({ route }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userTypes, setUserTypes] = useState([]);
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const toggleUserType = (type) => {
    // Check if the userType is already selected, if yes, remove it; otherwise, add it
    setUserTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((prevType) => prevType !== type)
        : [...prevTypes, type]
    );
  };
  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  }
  const handleRegistration = async () => {

    if (userTypes.length === 0) {
      // No user type selected, show an error message or take appropriate action
      showSnackbar("At least one user type should be selected");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      showSnackbar("Username must be at least 3 characters");
      return;
    } else {
      setUsernameError("");
    }

    if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone must be a valid number");
      showSnackbar("Phone must be a valid number");
      return;
    } else {
      setPhoneError("");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      showSnackbar("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    const formData = {
      userTypes,
      username,
      phone,
      email,
      password,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/register`,
        {
          userTypes,
          username,
          phone,
          email,
          password,
        }
      );

      console.log(response.data);
      setRegistrationStatus(`Registered as ${userTypes.join(", ")}`);
      showSnackbar(`Registered as ${userTypes.join(", ")}`)
    } catch (error) {
      console.error("Error registering:", error);
      console.error("Error registering:", error.response.data.error);
      setRegistrationStatus(
        `Registration failed: ${error.response.data.error}`
      );
      showSnackbar(`Registration failed: ${error.response.data.error}`)
    }
  };

  return (
    <ScrollView style={styles.container}>

     <Button style={styles.title}>
            <Title style={{ color: "white" ,paddingTop: 80,fontWeight: "bold", fontSize: 24,}}>REGISTER</Title>
          </Button>

      <View style={styles.containerTwo}>
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="Customer"
              status={userTypes.includes("Customer") ? "checked" : "unchecked"}
              onPress={() => toggleUserType("Customer")}
            />
            <Checkbox.Item
              label="Repair Center"
              status={
                userTypes.includes("Repair Center") ? "checked" : "unchecked"
              }
              onPress={() => toggleUserType("Repair Center")}
            />
            <Checkbox.Item
              label="Repair Parts Seller"
              status={
                userTypes.includes("Repair Parts Seller")
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => toggleUserType("Repair Parts Seller")}
            />

        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={handleSnackbarDismiss}
          duration={3000} // Adjust duration as needed
        >
          {snackbarMessage}
        </Snackbar>
        <View style={styles.card}>
          <TextInput
           placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}

            style={styles.textinput}
            left={<TextInput.Icon icon="account" />}
          />
          <Text style={styles.errorText}>{usernameError}</Text>

          <TextInput
           placeholder="Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
            style={styles.textinput}
            left={<TextInput.Icon icon="phone" />}

          />
          <Text style={styles.errorText}>{phoneError}</Text>

          <TextInput

           placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textinput}
            left={<TextInput.Icon icon="email" />}

          />
          <Text style={styles.errorText}>{emailError}</Text>

          <TextInput

           placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.textinput}
            left={<TextInput.Icon icon="key" />}

          />
          <Button onPress={handleRegistration} style={styles.button}>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              {" "}
              Register
            </Text>
          </Button>
          {registrationStatus && <Text>{registrationStatus}</Text>}
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#354230',
  },
  containerTwo: {
    flex: 1,
    paddingTop:50,
    marginTop: "15%",
    backgroundColor:'white',
    borderTopRightRadius:65,
    borderTopLeftRadius:65,
    paddingLeft:40,
    paddingRight:40,
    paddingBottom:40,
  },
  checkboxContainer: {
    display: 'grid',
  },

  card: {
    flex: 1,
    marginTop: "5%",
    width: "95%",
    marginBottom: "5%",
    paddingLeft:10,

  },
  button: {
    fontSize: 20,
    padding: 5,
    color: "white",
    backgroundColor: "#808000",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
    marginTop: "20%",
    marginBottom: "10%",

  },

  title:{
    marginTop: 20,
    paddingTop: 80,
    alignSelf: "right",


  },
  textinput: {
    height:45,
    backgroundColor: "transparent",
    width: "100%",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    paddingLeft:30,
    marginTop: 10,
  },

  errorText: {
    color: "red",
    marginBottom: 5,
  },


});

export default RegistrationScreen;
