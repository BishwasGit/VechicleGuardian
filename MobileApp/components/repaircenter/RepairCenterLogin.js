import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import LoadingScreen from "../LoadingScreen";

const RepairCenterLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repairCenterLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { repaircenter_id } = data;
        setLoading(false);
        navigation.navigate("RepariCenterDashboard", { repaircenter_id });
        console.log("Login Successful", repaircenter_id);
      } else {
        // Login failed, display an error message
        setMessage(data.error);
        alert(data.error);
        setLoading(false);
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      alert(data.error);
      console.error("Error during login:", error);
      setLoading(false);
    }
  };

  const handleRegisterNow = () => {
    navigation.navigate("Registration", { userType: "Repair Center" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstlay}>
        <Title style={styles.firstTitle}>Welcome!</Title>
        <Title style={styles.firstSudTitle}>Login to your account</Title>
      </View>

      <View style={styles.containerTwo}>
        <View style={styles.card}>
          <TextInput
            mode="outlined" // You can customize the mode as needed
            label="Enter your Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={[styles.textinput, { color: "black" }]}
            underlineColor="transparent"
          />

          <TextInput
            mode="outlined"
            label="Enter your Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={[styles.textinput, { color: "black" }]}
            underlineColor="transparent"
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white" }}> Login as Repair Center</Text>
          </Button>
          {loading && <LoadingScreen />}
          <Button style={styles.forgotButton}>
            <Text style={{ color: "black" }}> Forgot your password ?</Text>
          </Button>

          <Button onPress={handleRegisterNow} style={styles.registerButton}>
            <Text style={{ color: "black" }}>
              Don't have a Account?{" "}
              <Text
                style={{ textDecorationLine: "underline", color: "#1e6091" }}
              >
                Register Now
              </Text>
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTwo: {
    alignItems: "center",
  },
  firstlay: {
    padding: 20,

    marginTop: 45,
    paddingLeft: 25,
    alignItems: "left",
  },
  firstTitle: {
    color: "#1e6091",
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 20,
    marginBottom: 3,
  },
  firstSudTitle: {
    fontSize: 15,
    color: "#adb5bd",
  },
  card: {
    width: "90%",
    marginVertical: 70,
    padding: "5px",
  },

  button: {
    color: "white",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#1e6091",
  },
  forgotButton: {
    marginTop: 10,
  },
  registerButton: {
    color: "black",
    marginTop: 150,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
    textAlign: "left",
    color: "black",
  },
  textinput: {
    height: 50,
    backgroundColor: "#dee2e6",
    marginVertical: 10,
    textDecoration: "none",
    borderColor: "#1e6091",

    width: "100%",
    marginBottom: 20,
    placeholderTextColor: "black",
    color: "black", // Set the text color to black
  },

  message: {
    color: "red",
  },
});

export default RepairCenterLogin;
