import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const RepairHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { repaircenter_id } = route.params;

  // You may fetch and display repair history based on repaircenter_id
  const [repairHistory, setRepairHistory] = useState([]);

  useEffect(() => {
    // Fetch repair history data based on repaircenter_id
    const fetchRepairHistory = async () => {
      try {
        // Make API call or fetch data based on repaircenter_id
        const response = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairHistory/${repaircenter_id}`);
        const data = await response.json();
        console.log(data);
        setRepairHistory(data);
      } catch (error) {
        console.error("Error fetching repair history:", error);
      }
    };

    fetchRepairHistory();
  }, [repaircenter_id]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Repair History</Text>
      {/* Display repair history data here */}
      <View>
        {repairHistory.map((historyItem) => (
          <View key={historyItem.id} style={styles.historyItem}>
            <Text>{historyItem.date}</Text>
            {/* Add more details based on your data structure */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default RepairHistory;
