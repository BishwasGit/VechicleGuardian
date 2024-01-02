import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [workerUserName, setWorkerUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validate the form fields here before submitting
    if (!workerUserName || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Send login data to the server for authentication
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/workerLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workerUserName: workerUserName,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Authentication successful, navigate to the worker's dashboard
        navigation.navigate("WorkerDashboard", { workerId: result.workerId });
      } else {
        // Authentication failed, show an error message
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }

    // Optionally, you can clear the form fields after submission
    setWorkerUserName("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstlay}>
        <Title style={styles.firstTitle}>Welcome!</Title>
      </View>

      <View style={styles.containerTwo}>
        <View style={styles.card}>
          <Title style={styles.firstSudTitle}>
            Login using details provided by your repair center.
          </Title>
          <TextInput
            mode="outlined"
            label="Worker Username"
            value={workerUserName}
            left={<TextInput.Icon name="account" />}
            onChangeText={(text) => setWorkerUserName(text)}
            style={styles.textinput}
            underlineColor="transparent"
          />
          <TextInput
            mode="outlined"
            label="Your Password"
            value={password}
            secureTextEntry
            left={<TextInput.Icon name="account" />}
            onChangeText={(text) => setPassword(text)}
            underlineColor="transparent"
            style={styles.textinput}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login as Worker
          </Button>
          <Button style={styles.forgotButton}>
            <Text style={{ color: "black" }}> Forgot your password ?</Text>
          </Button>
          <Button style={styles.registerButton}>
            <Text style={{ color: "black" }}>
              Don't have a Account?
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  color: "#c1121f",
                }}
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
    backgroundColor: "#f5f1e9",
  },
  containerTwo: {
    alignItems: "center",
  },
  firstlay: {
    marginTop: "20%",
    paddingLeft: "11%",
    alignItems: "left",
  },
  firstTitle: {
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 20,
  },
  firstSudTitle: {
    fontSize: 13.8,
    color: "grey",
    marginBottom: 5,
  },
  card: {
    width: "80%",
    marginTop: "25%",
  },
  button: {
    fontSize: 20,
    padding: 5,
    color: "white",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#c1121f",
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
  },
  textinput: {
    height: 70,
    backgroundColor: "#edf2f4",
    width: "100%",
    marginBottom: 10,
  },
});

export default Login;
