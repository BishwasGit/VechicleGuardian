import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Avatar, Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get("window");

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Avatar.Icon style={styles.icon} size={150} icon="car" />
        <Title style={styles.subTitle}>VehicleG</Title>
      </View>

      <View style={styles.card}>
        <View style={styles.firstlay}>
          <Title style={styles.firstTitle}>Log in or Sign up</Title>
          <Title style={styles.firstSudTitle}>Select your login type</Title>
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
          By registering this step you agree to
        </Title>
        <Title style={styles.sudTitle}>Terms of Services</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#073b4c",
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
    marginTop: height * 0.1,
    width: "65%",
    alignSelf: "center",
  },
  firstlay: {
    marginBottom: 20,
    marginTop: 30,
    alignItems: "center",
  },
  firstTitle: {
    color: "white",
    fontSize: 20,
    marginBottom: -7,
  },
  firstSudTitle: {
    fontSize: 13,
    color: "#adb5bd",
  },

  button: {
    marginVertical: 10,
    backgroundColor: "#bc6c25",
  },
  button2: {
    marginVertical: 10,
    backgroundColor: "transparent",
    borderColor: "#bc6c25",
    borderWidth: 2,
  },
  button2Text: {
    color: "white",
    textDecorationLine: "none",
    textDecorationColor: "transparent",
  },
  buttonText: {
    textDecorationLine: "none",
    color: "white",
  },
  lay: {
    marginTop: 30,
    alignItems: "center",
  },
  Title: {
    color: "#adb5bd",
    fontSize: 13,
    marginBottom: -10, // Adjust this value to decrease the space below Title
  },
  sudTitle: {
    color: "#adb5bd",
    fontSize: 13,
    textDecorationLine: "underline",
    marginTop: 1, // Adjust this value to decrease the space above sudTitle
  },
});

export default LoginSelectionScreen;
