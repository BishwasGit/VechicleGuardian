import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color="#bc6c25" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical : 10,
  },
});

export default LoadingScreen;
