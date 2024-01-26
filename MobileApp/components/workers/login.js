import React, { useState } from "react";
import {  TouchableOpacity,Text, View, StyleSheet } from "react-native";
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
  const handleRegisterNow = () => {
    navigation.navigate("Registration", { userType: "Customer" });
  };
  return (
    <View style={styles.container}>
       <Button style={styles.title}>
            <Title style={{ color: "white" ,paddingTop: 80,fontWeight: "bold", fontSize: 24,}}> Login as Worker</Title>
          </Button>
     

      <View style={styles.containerTwo}>
        <View style={styles.card}>
         
          <TextInput
           
            placeholder="Worker Username"
            value={workerUserName}
           
            onChangeText={(text) => setWorkerUserName(text)}
            style={styles.textinput}
            left={<TextInput.Icon icon="account" />}
           
          />
          <TextInput
           
            placeholder="Your Password"
            value={password}
            secureTextEntry
           
            onChangeText={(text) => setPassword(text)}
           
            style={styles.textinput}
            left={<TextInput.Icon icon="key" />}
          />
            <Button style={styles.forgotButton}>
            <Text style={{ color: "black" }}> Forgot your password ?</Text>
          </Button>
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
              Login as Worker 
            </Text>
          </Button>
          <Title style={styles.firstSudTitle}>
            Consult your repair center.
          </Title>
        
          <View style={styles.registerButton}>
        <Text style={{ color: "black" }}>
          Don't have an account?&nbsp;&nbsp;
          <TouchableOpacity onPress={handleRegisterNow}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontWeight: "bold",
                color: "#cca01d",
                fontSize: 18,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
        </View>
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
    alignItems: "center",
    
  },
  firstSudTitle:{
    fontSize:15,
    marginTop: "3%",
    color:'gray',
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
    width: "100%",
  
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
    marginTop: 140,
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
});

export default Login;
