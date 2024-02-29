import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const MyList = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [vehicleType, setVehicleType] = useState('All');
  const [Data, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repairHistoryResponse = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairHistory/${repaircenter_id}`);
        const repairHistoryData = await repairHistoryResponse.json();
        const vehicleDetailsIds = repairHistoryData.map(item => item.vehicleDetails_id);
        const vehicleDetailsPromises = vehicleDetailsIds.map(async (vehicleDetailsId) => {
          const vehicleDetailsResponse = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getVehicleDetails/${vehicleDetailsId}`);
          return vehicleDetailsResponse.json();
        });
        const vehicleDetailsData = await Promise.all(vehicleDetailsPromises);
        const combinedData = repairHistoryData.map((item, index) => ({
          ...item,
          vehicleDetails: vehicleDetailsData[index]
        }));
        setCombinedData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const groupTasksByDate = () => {
    const groupedData = {};
    Data.forEach((item) => {
      if (item.repair_date) {
        const [datePart, timePart] = item.repair_date.split(', ');
        const [month, day, year] = datePart.split('/').map(Number);
        const [time, meridiem] = timePart.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
  
        if (meridiem === 'PM' && hours !== 12) {
          hours += 12;
        }
  
        // Ensure minutes are two digits
        minutes = minutes.toString().padStart(2, '0');
  
        const date = new Date(year, month - 1, day, hours, minutes);
        const dateString = date.toDateString(); // Get the date string
  
        if (!groupedData[dateString]) {
          groupedData[dateString] = [];
        }
        groupedData[dateString].push(item);
      }
    });
    return groupedData;
  };

  const renderCombinedData = (tasks) => {
    const groupedData = groupTasksByDate();
    
    // Filter tasks based on the selected vehicleType
    const filteredTasks = vehicleType === 'All' ? tasks : tasks.filter(task => task.vehicleDetails[0].vehicle_type === vehicleType);
  
    return Object.entries(groupedData).map(([dateKey, tasks], index) => (
      <View key={index}>
        <Text>{`Repair Date: ${dateKey}`}</Text>
        {filteredTasks.map((task, index) => (
          <List.Item
            key={index}
            title={`${task.vehicleDetails[0].vehicle_number} - ${task.vehicleDetails[0].vehicle_company} - ${task.vehicleDetails[0].vehicle_type}`}
            description={
              JSON.parse(task.changes_made).map((change, i) => (
                <Text key={i}>{`Change ${i + 1}: ${change}`}</Text>
              ))
            }
            style={styles.containerItem}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <List.Icon style={{ paddingRight: 10 }} color="#b78727" icon="eye" />
              </View>
            )}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
        <Text style={styles.headerText}>{currentDate.toLocaleDateString()}</Text>
        <Text style={styles.headerText}>Recent Repairs</Text>
        <Picker
          style={styles.containerIcon}
          selectedValue={vehicleType}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Two Wheeler" value="Two Wheeler" />
          <Picker.Item label="Four Wheeler" value="Four Wheeler" />
          <Picker.Item label="Cycle" value="Cycle" />
        </Picker>
      </View>
      <View style={styles.containerList}>
      <List.Section>{renderCombinedData(Data)}</List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  containerBar: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#808000',
  },
  headerText: {
    color: "white",
    fontSize: 17,
  },
  containerIcon: {
    top: 30,
    color: 'white',
    backgroundColor: '#d4af37',
  },
  containerList: {
    paddingTop: 40,
    padding: 20,
  },
  containerItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 6,
  },
});

export default MyList;
