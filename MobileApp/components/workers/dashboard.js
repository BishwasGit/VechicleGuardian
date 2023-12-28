import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Title, ActivityIndicator } from "react-native-paper";

const WorkerDashboard = ({ route }) => {
  const { workerId } = route.params;
  const navigation = useNavigation();
  const [workerDetails, setWorkerDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workerId) navigation.navigate("Vechicle Guardian Landing Page");
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
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Title>Worker Dashboard</Title>
          {loading ? (
            <ActivityIndicator animating={true} />
          ) : workerDetails ? (
            <>
              <Text style={{ marginTop: 10 }}>Worker Name: {workerDetails.worker_name}</Text>
              <Text style={{ marginTop: 5 }}>Contact Number: {workerDetails.phone_number}</Text>
              {/* Add other worker details here */}
            </>
          ) : (
            <Text>No worker details found</Text>
          )}
        </Card.Content>
      </Card>
      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={handleStartRepairing}
        labelStyle={{ color: "white" }}
      >
        Start Repairing
      </Button>
    </View>
  );
};

export default WorkerDashboard;
