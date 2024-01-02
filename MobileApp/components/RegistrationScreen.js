import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Title, Card } from "react-native-paper";
import axios from "axios";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from "react-native-vector-icons/MaterialIcons";

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
    <ScrollView style={styles.container}>
      <View style={styles.containerTwo}>
        <View style={styles.firstlay}>
          <Title style={styles.firstTitle}>Register!</Title>
          <Title style={styles.firstSudTitle}>As {userType}</Title>
        </View>

        <View style={styles.card}>
          <TextInput
            mode="outlined" // You can customize the mode as needed
            label="Enter your Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            left={<TextInput.Icon name="account" />}
            style={styles.textinput}
          />
          <Text style={styles.errorText}>{usernameError}</Text>

          <TextInput
            mode="outlined"
            label="Enter your Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
            style={styles.textinput}
            left={<TextInput.Icon name="account" />}
            underlineColor="transparent"
          />
          <Text style={styles.errorText}>{phoneError}</Text>

          <TextInput
            mode="outlined"
            label="Enter your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textinput}
            left={<TextInput.Icon name="account" />}
            underlineColor="transparent"
          />
          <Text style={styles.errorText}>{emailError}</Text>

          <TextInput
            mode="outlined"
            label="Enter your Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.textinput}
            left={<TextInput.Icon name="account" />}
            underlineColor="transparent"
          />
          <Button onPress={handleRegistration} style={styles.button}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              {" "}
              Register as Repair Center
            </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f5f1e9",
  },
  containerTwo: {
    flex: 1,
    alignItems: "center",
  },

  firstlay: {
    marginTop: "15%",
    alignItems: "center",
  },
  firstTitle: {
    paddingTop: 10,
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 30,
  },
  firstSudTitle: {
    fontSize: 15,
    color: "grey",
  },

  card: {
    width: "80%",
    marginTop: "10%",
  },
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    textAlign: "left",
  },

  textinput: {
    height: 60,
    backgroundColor: "#edf2f4",
    width: "100%",
  },

  button: {
    padding: 5,
    color: "white",
    alignItems: "center",
    marginTop: "18%",
    backgroundColor: "#c1121f",
  },

  errorText: {
    color: "red",
    marginBottom: 5,
  },
  lay: {
    marginTop: "4%",
    alignItems: "center",
  },
  Title: {
    width: "60%",
    color: "grey",
    fontSize: 13,
    marginBottom: -10,
  },
  sudTitle: {
    color: "grey",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default RegistrationScreen;
