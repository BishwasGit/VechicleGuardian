import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Checkbox, Snackbar } from 'react-native-paper';

const RepairCenterAvailabilityScreen = ({ route }) => {
  const { repaircenter_id } = route.params;

  // Sample data for demonstration
  const [availability, setAvailability] = useState([
    { day: 'Sunday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Monday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Tuesday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Wednesday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Thursday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Friday', openingTime: '09:00', closingTime: '18:00', status: 'Open', selected: false },
    { day: 'Saturday', openingTime: '10:00', closingTime: '16:00', status: 'Open', selected: false },
  ]);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggleDay = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].selected = !updatedAvailability[index].selected;
    setAvailability(updatedAvailability);
  };
  const handleSaveChanges = async () => {
    try {
        console.log('updated availability',availability)
        const payload = {
            repaircenter_id: repaircenter_id,
            availability: availability
          };
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/updateAvailability`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        console.log('Availability data updated successfully');
        setSnackbarVisible(true);
        setMessage('Changes saved successfully');
      } else {
        console.error('Failed to update availability data');
      }
    } catch (error) {
      console.error('Error updating availability data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Repair Center Availability</Text>
      {availability.map((item, index) => (
        <View key={index} style={styles.item}>
          <Checkbox.Android
            status={item.selected ? 'checked' : 'unchecked'}
            onPress={() => handleToggleDay(index)}
            color="#007bff"
          />
          <Text style={styles.day}>{item.day}</Text>
          <TextInput
            style={styles.input}
            placeholder="Opening Time"
            value={item.openingTime}
            onChangeText={(text) => console.log(text)} // Handle opening time change
          />
          <TextInput
            style={styles.input}
            placeholder="Closing Time"
            value={item.closingTime}
            onChangeText={(text) => console.log(text)} // Handle closing time change
          />
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={item.status}
            onChangeText={(text) => console.log(text)} // Handle status change
          />
        </View>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} // Adjust the duration as needed
        style={styles.snackbar}
      >
        <Text style={styles.message}>{message}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RepairCenterAvailabilityScreen;
