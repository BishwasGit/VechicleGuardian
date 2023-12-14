import React, { useState } from "react";
import { View, StyleSheet ,Text } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";

const CustomerLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { customer_id } = data;
        navigation.navigate("CustomerDashboard", { customer_id });
        console.log("Login Successful");
      } else {
        // Login failed, display an error message
        setMessage(data.error);
        console.error("Login failed:", data.error);
        alert(data.error)
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(data.error)
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
          {/* {message && <Text style={styles.message}>{message}</Text>} */}
        </Card.Content>
      </Card>
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
