import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ScrollView,StyleSheet } from 'react-native';
import { Accordion, TextInput, Button } from 'react-native-paper';

const RepairCenterList = ({ list }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRepairCenter, setSelectedRepairCenter] = useState(null);

  const handleCardPress = (repairCenter) => {
    console.log('handle card press data',repairCenter);
    setSelectedRepairCenter(repairCenter);
    setModalVisible(true); 
  };

  console.log('list dot repair center.. :',list.repairCenterAvailability)
  return (
    <>
    <FlatList
    data={list.availableRepairCenters}
    keyExtractor={(item) => item.repaircenter_id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => handleCardPress(item)} style={styles.cardContainer}>
        <Text style={styles.name}>{item.repaircenter_fname}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.contact}>{item.contact}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleCardPress(item)}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )}
  />
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalContainer}>
  <View style={styles.modalContent}>
  {selectedRepairCenter && (
    <>
      <Text style={styles.modalName}>{selectedRepairCenter.repaircenter_fname}</Text>
      <Text style={styles.modalText}>{selectedRepairCenter.address}</Text>
      <Text style={styles.modalText}>{selectedRepairCenter.contact}</Text>
      <Text style={styles.modalTitle}>Schedule:</Text>
      {list.repairCenterAvailability.map((availability) => {
        if (availability.repaircenters_id === selectedRepairCenter.repaircenters_id) {
          return (
            <View key={availability.repaircenteravailability_id}>
            {availability.schedule.map((daySchedule, index) => {
              console.log('daySchedule:', daySchedule); // Log each daySchedule object
              return (
                <>
                <Text key={index} style={styles.modalText}>
                  {daySchedule.day}
                  {daySchedule.openingTime}
                  {daySchedule.closingTime}
                </Text>
                </>
              );
            })}
          </View>
          );
        }
      })}
      <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </>
  )}
</View>
  </View>
</Modal>
</>
);
};
const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 20,
      borderRadius: 10,
      elevation: 3,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    address: {
      fontSize: 16,
    },
    contact: {
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 5,
    },
    modalButton: {
      backgroundColor: '#007bff',
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
  });
export default RepairCenterList;
