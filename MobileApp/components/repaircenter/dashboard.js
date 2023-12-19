import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const RepariCenterDashboard = ({ route }) => {
  const [RepairCenterDetails, setRepairCenterDetails] = useState(null);

  // Fetch customer details based on repaircenter_id when the component mounts
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
      // const repaircenter_id = route.params.repaircenter_id;
      const { repaircenter_id } = route.params;
      // Make a request to your server to get customer details based on repaircenter_id
      // Example using fetch:
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/RepairCenterDetails/${repaircenter_id}`
        );
        const data = await response.json();

        setRepairCenterDetails(data.RepairCenterDetails);
        console.log("Repair Center Details:", data.RepairCenterDetails);
        // Assuming the server response contains customer details
        setRepairCenterDetails(data.RepairCenterDetails);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchRepairCenterDetails();
  }, [route.params.repaircenter_id]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {RepairCenterDetails && (
            <Title style={styles.welcomeText}>
              Welcome to the customer dashboard,{" "}
              {RepairCenterDetails[0].username}
            </Title>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "80%",
    marginVertical: 10,
    padding: "5px",
  },
});

export default RepariCenterDashboard;
