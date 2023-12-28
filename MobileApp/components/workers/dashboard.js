import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from "@react-navigation/native";

const WorkerDashboard = ({ route }) => {
  const { workerId } = route.params;
  const navigation = useNavigation();
  const [workerDetails, setWorkerDetails] = useState(null);
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

        const data = await response.json();
        setWorkerDetails(data);
      } catch (error) {
        console.error("Error fetching worker details:", error);
        // Handle errors, show error messages, etc.
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  return (
    <View>
      <Text>Worker Dashboard</Text>
      {workerDetails ? (
        <>
          <Text>Worker Name: {workerDetails.worker_name}</Text>
          <Text>Contact Number: {workerDetails.phone_number}</Text>
          {/* Add other worker details here */}
        </>
      ) : (
        <Text>Loading worker details...</Text>
      )}
    </View>
  );
};

export default WorkerDashboard;
