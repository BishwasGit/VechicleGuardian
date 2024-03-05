import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React , {useEffect, useState}from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Divider, Text, List, Chip } from "react-native-paper";
import MyCalendar from "./MyCalendar";
import MyCarousel from "./MyCarousel";

const DashboardContent = () => {
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

    // Fetch user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const upcomingAppointments = [
    { id: 1, date: "2024-03-01", time: "10:00 AM", customer: "John Doe" },
    { id: 2, date: "2024-03-02", time: "11:00 AM", customer: "Jane Smith" },
    { id: 3, date: "2024-03-03", time: "12:00 PM", customer: "Alice Johnson" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Statistics Section */}
          <MyCalendar />
        {/* Nearby Repair Centers Section */}
          <Card.Title title="Nearby Repair Centers" style={styles.title} />
          <MyCarousel repairCenters={repairCenters} />

        {/* Appointment Schedule Section */}
        <Card style={styles.card}>
          <Card.Title title="Appointment Schedule" style={styles.title} />
          {upcomingAppointments.map((appointment) => (
            <List.Accordion
              key={appointment.id}
              title={`Date: ${appointment.date} - Time: ${appointment.time}`}
              left={(props) => <List.Icon {...props} icon="calendar-clock" />}
            >
              <List.Item title={`Customer: ${appointment.customer}`} />
            </List.Accordion>
          ))}
        </Card>

        {/* Repair Center Information Section */}
        <Card style={styles.card}>
          <Card.Title title="Repair Center Information" style={styles.title} />
          <List.Section>
            <List.Item title="Contact: 123-456-7890" left={(props) => <List.Icon {...props} icon="phone" />} />
            <List.Item title="Address: 123 Main St, City" left={(props) => <List.Icon {...props} icon="map-marker" />} />
          </List.Section>
        </Card>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical : 20,
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

export default DashboardContent;
