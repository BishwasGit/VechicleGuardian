import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");

const image = {uri: 'https://i.pinimg.com/originals/fb/26/bf/fb26bf0dadfd3741e5e6ea9a8a2f8a4b.jpg'};

const LoginSelectionScreen = ({ navigation }) => {
  const handleNavigateToWorkerLogin = () => {
    navigation.navigate("WorkerLoginScreen");
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      
        <View style={styles.purpleOverlay}>
          {/* Purple transparent background */}
        </View>
        <View style={styles.overlay}>
          <Title style={styles.subTitle}>Vehicle<Text style={{ color: "#ffd300", }}>G</Text></Title>
        </View>
        <View style={styles.card}>
        
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate("Login")}
            labelStyle={styles.buttonText}
          >
            Login
          </Button>
          <Button
            style={styles.button2}
            onPress={() => navigation.navigate("Registration")}
            labelStyle={styles.button2Text}
          >
            Register
          </Button>
        </View>
        <View style={styles.lay}>
          <Title style={styles.Title}>
            Are you working for a repair Center ?
          </Title>
          <TouchableOpacity onPress={handleNavigateToWorkerLogin}>
            <Title style={styles.sudTitle}>Login as Worker</Title>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22333B",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    marginTop: height * 0.3,
    alignItems: "center",
  },
  purpleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(34, 51, 59,0.7)', // Purple transparent background
  },
  icon: {
    backgroundColor: "transparent",
  },
  subTitle: {
    padding: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 55,
  },
  card: {
    marginTop: height * 0.2,
    width: "65%",
    alignSelf: "center",
  },
  firstlay: {
    marginBottom: 5,
    alignItems: "center",
  },
  firstTitle: {
    color: "white",
    fontSize: 16,
    color: "#adb5bd",
  },
  firstSudTitle: {
    fontSize: 15,
    color: "#adb5bd",
  },

  button: {
    marginVertical: 10,
    backgroundColor: "#e1ad21",
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 15, // for Android
  },
  button2: {
    marginVertical: 10,
    backgroundColor: "transparent",
    borderColor: "#e1ad21",
    borderWidth: 2,
  },
  button2Text: {
    color: "white",
  },
  buttonText: {
    color: "white",
  },
  lay: {
    marginTop: 80,
    alignItems: "center",
  },
  Title: {
    color: "white",
    fontSize: 13,
    marginBottom: -5, // Adjust this value to decrease the space below Title
  },
  sudTitle: {
    color: "#e1ad21",
    fontSize: 15,
    fontWeight: "bold",
    

    marginTop: 1, // Adjust this value to decrease the space above sudTitle
  },
});

export default LoginSelectionScreen;
