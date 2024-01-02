import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");

const LoginSelectionScreen = ({ navigation }) => {
  const handleNavigateToWorkerLogin = () => {
    navigation.navigate("WorkerLoginScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Avatar.Icon style={styles.icon} size={150} icon="car" />
        <Title style={styles.subTitle}>VehicleG</Title>
      </View>

      <View style={styles.card}>
        <View style={styles.firstlay}>
          <Title style={styles.firstTitle}>
            Log in (Select your login type)
          </Title>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate("CustomerLogin")}
          labelStyle={styles.buttonText}
        >
          Login as Customer
        </Button>
        <Button
          style={styles.button2}
          onPress={() => navigation.navigate("RepairCenterLogin")}
          labelStyle={styles.button2Text}
        >
          Login as Repair Center
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#064957",
  },
  overlay: {
    marginTop: 200,
    alignItems: "center",
  },
  icon: {
    backgroundColor: "transparent",
  },
  subTitle: {
    padding: 16,
    color: "white",
    fontWeight: "bold",
    fontSize: 38,
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
    backgroundColor: "#c1121f",
  },
  button2: {
    marginVertical: 10,
    backgroundColor: "transparent",
    borderColor: "#c1121f",
    borderWidth: 2,
  },
  button2Text: {
    color: "white",
  },
  buttonText: {
    color: "white",
  },
  lay: {
    marginTop: 30,
    alignItems: "center",
  },
  Title: {
    color: "white",
    fontSize: 13,
    marginBottom: -5, // Adjust this value to decrease the space below Title
  },
  sudTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationLineColor: "#c1121f",

    marginTop: 1, // Adjust this value to decrease the space above sudTitle
  },
});

export default LoginSelectionScreen;
