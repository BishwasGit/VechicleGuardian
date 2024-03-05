import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React , {useEffect, useState}from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Divider, Text, List, Chip } from "react-native-paper";

const NotificationScreen = () => {
    const [repairCenters, setRepairCenters] = useState([]);
    useEffect(() => {
      const fetchRepairCenters = async () => {
        try {
          const response = await fetch(
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairCentersList`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setRepairCenters(data.repairCenters);
        } catch (error) {
          console.error("Error fetching repair centers:", error);
          // Handle errors as needed
        }
      };

      fetchRepairCenters();
    }, []);

    const upcomingAppointments = [
      { id: 1, date: "2024-03-01", time: "10:00 AM", customer: "John Doe" },
      { id: 2, date: "2024-03-02", time: "11:00 AM", customer: "Jane Smith" },
      { id: 3, date: "2024-03-03", time: "12:00 PM", customer: "Alice Johnson" },
    ];
  return (

       <View style={styles.container}>

         <Card style={styles.card}>
          <Card.Title title="Notifications" style={styles.title} />
          <List.Section>
            <List.Accordion
              title="New repair request received"
              left={(props) => <List.Icon {...props} icon="bell-ring" />}
            >
              <List.Item title="Company: Bajaj" />
              <List.Item title="Status: Pending" />
            </List.Accordion>
            <Divider />
            <List.Item
              title="Appointment reminder: Tomorrow at 10:00 AM"
              left={(props) => <List.Icon {...props} icon="clock" />}
            />
          </List.Section>
        </Card>
       </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        marginTop:50,
    },
    card: {
      marginBottom: 20,
      marginTop : 10,
    },
    title: {
      textAlign: "center",
      marginTop : 10,
    },
  });

export default NotificationScreen
