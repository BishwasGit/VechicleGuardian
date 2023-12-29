import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  TextInput,
  Button,
  Card,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import LoadingScreen from "../LoadingScreen"; // Import the LoadingScreen component

const CustomerLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/login`,
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
        if (data.customer_id) {
          // It's a customer, navigate to CustomerDashboard
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("CustomerDashboard", {
              customer_id: data.customer_id,
            });
            console.log("Login Successful");
          }, 1000);
        } else if (data.admin_id) {
          // It's an admin, navigate to AdminDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("AdminDashboard", { admin_id: data.admin_id });
            console.log("Login Successful (Admin)");
          }, 1000);
        }
      } else {
        // Login failed, display an error message
        setMessage(data.error);
        console.error("Login failed:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again."); // Provide a generic error message
    }
  };
  const handleRegisterNow = () => {
    navigation.navigate("Registration", { userType: "Customer" });
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
            style={styles.textinput}
            underlineColor="transparent"
          />

          <TextInput
            mode="outlined"
            label="Enter your Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.textinput}
            underlineColor="transparent"
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white" }}> Login as Customer</Text>
          </Button>
          {loading && <LoadingScreen />}
          <Button style={styles.forgotButton}>
            <Text style={{ color: "black" }}> Forgot your password ?</Text>
          </Button>

          <Button onPress={handleRegisterNow} style={styles.registerButton}>
            <Text style={{ color: "black" }}>
              Don't have a Account?{" "}
              <Text
                style={{ textDecorationLine: "underline", color: "#bc6c25" }}
              >
                Register Now
              </Text>
            </Text>
          </Button>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Login Successful</Dialog.Title>
            <Dialog.Content>
              <Text>Navigating to your dashboard</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    color: "#bc6c25",
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
    backgroundColor: "#bc6c25",
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
    height: 50,
    backgroundColor: "#dee2e6",
    marginVertical: 10,

    borderColor: "#bc6c25",

    width: "100%",
    marginBottom: 20,
  },
  message: {
    color: "red",
  },
  label: {
    color: "black",
  },
});

export default CustomerLogin;
