import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import { Button, Card, Title, ActivityIndicator } from "react-native-paper";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component

const Login = ({ navigation }) => {
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
        if (data.admin_id) {
          // It's an admin, navigate to AdminDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("AdminDashboard", { admin_id: data.admin_id });
            console.log("Login Successful as Admin");
          }, 1000);
        } else if (data.customer_id) {
          // It's a customer, navigate to CustomerDashboard
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("CustomerDashboard", {
              customer_id: data.customer_id,
            });
            console.log("Login Successful as Customer");
          }, 1000);
        } else if (data.repair_parts_seller_id) {
          // It's a repair parts seller, navigate to RepairPartsSellerDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("RepairPartsSellerDashboard", {
              repair_parts_seller_id: data.repair_parts_seller_id,
            });
            console.log("Login Successful as Repair Parts Seller");
          }, 1000);
        } else if (data.repair_center_id) {
          // It's a repair center, navigate to RepairCenterDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("RepairCenterDashboard", {
              repair_center_id: data.repair_center_id,
            });
            console.log("Login Successful as Repair Center");
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
            left={<TextInput.Icon name="account" />}
            style={styles.textinput}
            underlineColor="transparent"
          />

          <TextInput
            mode="outlined"
            left={<TextInput.Icon name="account" />}
            style={styles.textinput}
            underlineColor="transparent"
            label="Enter your Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Button onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Login as Customer
            </Text>
          </Button>
          {loading && <LoadingScreen />}
          <Button style={styles.forgotButton}>
            <Text style={{ color: "black" }}> Forgot your password ?</Text>
          </Button>

          <Button onPress={handleRegisterNow} style={styles.registerButton}>
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
    backgroundColor: "#f5f1e9",
  },
  containerTwo: {
    alignItems: "center",
  },
  firstlay: {
    marginTop: "20%",
    paddingLeft: "12%",
    alignItems: "left",
  },
  firstTitle: {
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 20,
  },
  firstSudTitle: {
    fontSize: 15,
    color: "grey",
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
  message: {
    color: "red",
  },
  label: {
    color: "black",
  },
});

export default Login;
