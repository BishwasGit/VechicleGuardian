import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";
import { Button, ActivityIndicator } from "react-native-paper";

const WorkerDashboard = ({ route }) => {
  const { workerId } = route.params;
  const navigation = useNavigation();
  const [workerDetails, setWorkerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workerId) navigation.navigate("MainScreen");
  }, [navigation, workerId]);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getWorkerDetails/${workerId}`
        );

        if (!response.ok) {
          // Handle non-successful response
          console.error("Failed to fetch worker details:", response.status);
          return;
        }

        const result = await response.json();

        if (result.success) {
          setWorkerDetails(result.data); // Access the 'data' property
        }
      } catch (error) {
        console.error("Error fetching worker details:", error);
        // Handle errors, show error messages, etc.
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  const handleStartRepairing = () => {
    navigation.navigate("RepairProcessScreen", { workerId });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.welcomeText}>Worker Dashboard</Title>
      <View style={styles.head}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : workerDetails ? (
          <>
            <Text style={{ fontSize: 20, color: "#c1121f" }}>
              Welcome! {workerDetails.worker_name}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Contact Number: {workerDetails.phone_number}
            </Text>
            <Text style={{ marginTop: 5 }}>
              Email Address: {workerDetails.email_address}
            </Text>
            {/* Add other worker details here */}
          </>
        ) : (
          <Text>No worker details found</Text>
        )}
      </View>

      <Button
        style={{
          width: "90%",
          padding: 15,
          alignItems: "center",
          marginTop: 50,
          backgroundColor: "#0d5563",
        }}
        onPress={handleStartRepairing}
        labelStyle={{ color: "white" }}
      >
        Start Repairing
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1e9",
    alignItems: "center",
  },
  welcomeText: {
    paddingTop: 50,
    fontWeight: "bold",
    color: "#c1121f",
    paddingBottom: 50,
    fontSize: 25,
  },
  head: {
    width: "90%",
    padding: 40,
    borderColor: "#0d5563",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default WorkerDashboard;
