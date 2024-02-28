import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Dialog,Checkbox, Portal } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import { Button, Card, Title, ActivityIndicator } from "react-native-paper";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component
import { Divider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';



const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const saveUserInfoToStorage = async (userInfo) => {
    const storageKey = Platform.OS === 'web' ? 'userInfo' : 'userInfo';
    await SecureStore.setItemAsync(storageKey, JSON.stringify(userInfo));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
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
        const userInfo = {
          token: data.token,
          userType: data.userType,
          userId: data.userId
        };
        saveUserInfoToStorage(userInfo);
        if(data.userType === 'admin') {
          showDialog();
          setTimeout(() => {
            hideDialog();
            navigation.navigate("AdminDashboard", { admin_id: data.userId });
          }, 1000);
        } else if(data.userType === 'customer' || data.userType === 'seller' || data.userType === 'repaircenter' || data.userType === 'repaircenter_workers') {
          setTimeout(() => {
            hideDialog();
            navigation.navigate(data.userType === 'customer' ? "CustomerDashboard" : data.userType === 'seller' ? "RepairPartsSellerDashboard" : data.userType === 'repaircenter' ? "RepairCenterDashboard" : "WorkerDashboard", { [`${data.userType}_id`]: data.userId });
          }, 1000);
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNow = () => {
    navigation.navigate("Registration", { userType: "Customer" });
  };
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={styles.container}>
      <Button style={styles.title}>
        <Title style={{ color: "white" ,paddingTop: 80,fontWeight: "bold", fontSize: 24 }}> LOG-IN</Title>
      </Button>
      <View style={styles.containerTwo}>
        <View style={styles.card}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.textinput}
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon icon="key" />}
          />
          <View>
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="Remember Me"
              status={checked ? 'checked' : 'unchecked'}
            />

        </View>
          </View>
          <Button onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>Login</Text>
          </Button>

          <Button style={styles.forgotButton}>
            <Text style={{ color: "black", alignSelf: "center" }}> Forgot your password ?</Text>
          </Button>
          {loading && <ActivityIndicator />}
          <View style={styles.registerButton}>
            <Text style={{ color: "black" }}>Don't have an account?</Text>
            <Divider />
            <TouchableOpacity onPress={handleRegisterNow}>
              <Text style={{ fontWeight: "bold", color: "#808000", textAlign : "center" }}>Register Here</Text>
            </TouchableOpacity>
          </View>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Login Successful</Dialog.Title>
          <Dialog.Content>
            <Text>Navigating to your dashboard</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#253529',
  },
  containerTwo: {
    flex: 1,
    marginTop: "15%",
    backgroundColor:'white',
    borderTopRightRadius:65,
    borderTopLeftRadius:65,
    alignItems: "center",
  },
  card: {
    marginTop: "30%",
    width: "75%",
  },
  button: {
    fontSize: 20,
    padding: 5,
    color: "white",
    marginTop: 30,
    backgroundColor: "#808000",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
  },
  forgotButton: {
    marginTop: 10,
    alignSelf: "right",
  },
  title:{
    marginTop: 20,
    paddingTop: 80,
    alignSelf: "right",
  },
  registerButton: {
    color: "black",
    marginTop: 130,
    alignSelf: "center",
  },
  textinput: {
    height:45,
    backgroundColor: "transparent",
    width: "100%",
    marginBottom: 10,
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    paddingLeft:30,
    marginTop: 25,
  },
  message: {
    color: "red",
  },
});

export default Login;
