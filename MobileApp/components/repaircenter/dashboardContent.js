import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Divider, Text, List, Chip } from "react-native-paper";

import MyCalendar from "./MyCalendar";
import MyCarousel from "./MyCarousel";

const DashboardContent = () => {
  // Sample data for recent repairs and upcoming appointments
  const recentRepairs = [
    { id: 1, device: "Bajaj Ns 200", status: "Completed" },
    { id: 2, device: "KTM Duke 250", status: "In Progress" },
    { id: 3, device: "Dominar 400", status: "Scheduled" },
  ];

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
          <MyCarousel />

        {/* Recent Repairs Section */}
        <Card style={styles.card}>
          <Card.Title title="Recent Repairs" style={styles.title} />
          {recentRepairs.map((repair) => (
            <List.Item
              key={repair.id}
              title={`Device: ${repair.device}`}
              description={`Status: ${repair.status}`}
              left={(props) => <List.Icon {...props} icon="wrench" />}
            />
          ))}
        </Card>

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

        {/* Notifications Section */}
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
