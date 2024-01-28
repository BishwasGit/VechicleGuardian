import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import { Button, Card, Title, ActivityIndicator } from "react-native-paper";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component
import { Divider } from 'react-native-paper';

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
            navigation.navigate("CustomerDashboard", {customer_id: data.customer_id });
            console.log("Login Successful as Customer");
          }, 1000);
        } else if (data.repair_parts_seller_id) {
          // It's a repair parts seller, navigate to RepairPartsSellerDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("RepairPartsSellerDashboard", {
              repair_parts_seller_id: data.repair_parts_seller_id
            });
            console.log("Login Successful as Repair Parts Seller");
          }, 1000);
        } else if (data.repaircenter_id) {
          // It's a repair center, navigate to RepairCenterDashboard
          showDialog();
          setTimeout(() => {
            hideDialog();
            setLoading(false);
            navigation.navigate("RepairCenterDashboard", {
              repaircenter_id: data.repaircenter_id,
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
      
     
     <Button style={styles.title}>
            <Title style={{ color: "white" ,paddingTop: 80,fontWeight: "bold", fontSize: 24,}}> LOG-IN</Title>
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
            <Button style={styles.forgotButton}>
            <Text style={{ color: "black", alignSelf: "center" }}> Forgot your password ?</Text>
          </Button>
          <Button onPress={handleLogin} style={styles.button}>
            <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              Login 
            </Text>
          </Button>
          {loading && <LoadingScreen />}
        

        <View style={styles.registerButton}>
        <Text style={{ color: "black" }}>
          Don't have an account?
          </Text>
          <Divider />
          <TouchableOpacity onPress={handleRegisterNow}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#cca01d",
                textAlign : "center",
              }}
            >
              Register Here
            </Text>
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
    backgroundColor:'#354230',
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
    backgroundColor: "#e1ad21",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
  
  },
  forgotButton: {
    marginTop: 30,
    alignSelf: "right",

  },
  title:{
    marginTop: 20,
    paddingTop: 80,
    alignSelf: "right",
  

  },
  registerButton: {
    color: "black",
    marginTop: 100,
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
