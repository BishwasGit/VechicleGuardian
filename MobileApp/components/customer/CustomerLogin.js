import React, { useState } from "react";
import { View, StyleSheet ,Text } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { Dialog, Portal } from 'react-native-paper';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';

const CustomerLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { customer_id } = data;
        showDialog();
        navigation.navigate("CustomerDashboard", { customer_id });
        console.log("Login Successful");
      } else {
        // Login failed, display an error message
        setMessage(data.error);
        console.error("Login failed:", data.error);
        alert(data.error)
      }
    }  catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again."); // Provide a generic error message
    }
  };
  const handleRegisterNow = () => {
    navigation.navigate("Registration", { userType: "Customer" });
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Login as Customer</Title>
          <TextInput
            label="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.textinput}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.textinput}
            mode="outlined"
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>
          <Button onPress={handleRegisterNow} style={styles.registerButton}>
            Register Now
          </Button>
          {message && <Text style={styles.message}>{message}</Text>}
        </Card.Content>
      </Card>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    width: "80%",
    marginVertical: 10,
    padding: "5px",
  },
  button: {
    marginVertical: 10,
  },
  registerButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  textinput: {
    marginVertical: 10,
  },
  message: {
    color: "red",
  },
});

export default CustomerLogin;
