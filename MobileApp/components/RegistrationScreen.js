import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title, Card } from "react-native-paper";
import axios from "axios";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const RegistrationScreen = ({ route }) => {
  const { userType } = route.params;
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegistration = async () => {
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    } else {
      setUsernameError("");
    }

    if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone must be a valid number");
      return;
    } else {
      setPhoneError("");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      return;
    } else {
      setEmailError("");
    }

    if (userType === "Customer") {
      try {
        const response = await axios.post(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/register`,
          {
            userType,
            username,
            phone,
            email,
            password,
          }
        );

        console.log(response.data); // Log the response from the server
        setRegistrationStatus(`Registered as ${userType}`);
        // You can add logic here to handle the response, like showing a success message or redirecting to the login page
      } catch (error) {
        console.error("Error registering:", error);
        console.error("Error registering:", error.response.data.error);
        setRegistrationStatus(
          `Registration failed: ${error.response.data.error}`
        );
      }
      console.log("Registerting as Customer");
    } else if (userType === "Repair Center") {
      try {
        const response = await axios.post(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/registerRepairCenter`,
          {
            userType,
            username,
            phone,
            email,
            password,
          }
        );

        console.log(response.data); // Log the response from the server
        setRegistrationStatus(`Registered as ${userType}`);
        // You can add logic here to handle the response, like showing a success message or redirecting to the login page
      } catch (error) {
        console.error("Error registering:", error);
        console.error("Error registering:", error.response.data.error);
      }
      console.log("Registering as Repair Center");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstlay}>
        <Title style={styles.firstTitle}>Register!</Title>
        <Title style={styles.firstSudTitle}>As {userType}</Title>
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Username :</Text>
        <TextInput
          left={<TextInput.Icon icon="eye" />}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.textinput}
          underlineColor="transparent"
        />
        <Text style={styles.errorText}>{usernameError}</Text>

        <Text style={styles.text}>Phone :</Text>
        <TextInput
          left={<TextInput.Icon icon="eye" />}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="numeric"
          style={styles.textinput}
          underlineColor="transparent"
        />
        <Text style={styles.errorText}>{phoneError}</Text>

        <Text style={styles.text}>Email :</Text>
        <TextInput
          left={<TextInput.Icon icon="eye" />}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textinput}
          underlineColor="transparent"
        />
        <Text style={styles.errorText}>{emailError}</Text>

        <Text style={styles.text}>Password :</Text>
        <TextInput
          left={<TextInput.Icon icon="eye" />}
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.textinput}
          underlineColor="transparent"
        />
        <Button onPress={handleRegistration} style={styles.button}>
          <Text style={{ color: "white" }}> Register as Repair Center</Text>
        </Button>
        {registrationStatus && <Text>{registrationStatus}</Text>}
      </View>
      <View style={styles.lay}>
        <Title style={styles.Title}>
          By registering this step you agree to
        </Title>
        <Title style={styles.sudTitle}>Terms of Services</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    padding: 16,
  },
  firstlay: {
    marginBottom: 0,
    marginTop: 20,
    alignItems: "center",
  },
  firstTitle: {
    paddingTop: 10,
    color: "#bc6c25",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 0,
  },
  firstSudTitle: {
    fontSize: 15,
    color: "#6c757d",
  },

  card: {
    width: "90%",
    marginVertical: 50,
    padding: "5px",
  },
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 1,
    textAlign: "left",
  },

  textinput: {
    height: 45,
    backgroundColor: "#dee2e6",
    marginVertical: 10,
    textDecoration: "none",
    borderColor: "#bc6c25",
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    marginBottom: 10,
  },

  button: {
    color: "white",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#bc6c25",
  },

  errorText: {
    color: "red",
    marginBottom: 5,
  },
  lay: {
    marginTop: -40,
    alignItems: "center",
  },
  Title: {
    width: "60%",
    color: "#adb5bd",
    fontSize: 13,
    marginBottom: -40, // Adjust this value to decrease the space below Title
  },
  sudTitle: {
    color: "#adb5bd",
    fontSize: 13,
    textDecorationLine: "underline",
    marginTop: 1, // Adjust this value to decrease the space above sudTitle
  },
});

export default RegistrationScreen;
