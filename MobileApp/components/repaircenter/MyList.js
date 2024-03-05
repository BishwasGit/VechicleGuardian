import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Button, Card, List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import {Ionicons} from '@expo/vector-icons';
import { Modal, Portal,PaperProvider } from 'react-native-paper';


const MyList = ({ route }) => {
  const { repaircenter_id } = route.params;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCardVisible, setCardVisible] = useState(false);
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


  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white',
                           height:"45%",
                           width:"80%",
                           marginLeft:"10%",
                           padding:40,
                          };




  const renderCombinedData = (tasks) => {
    const groupedData = groupTasksByDate();

    // Filter tasks based on the selected vehicleType
    const filteredTasks = vehicleType === 'All' ? tasks : tasks.filter(task => task.vehicleDetails[0].vehicle_type === vehicleType);

    return Object.entries(groupedData).map(([dateKey, tasks], index) => (
      <View key={index} style={{justifyContent:"center"}}>
      {filteredTasks.map((task, innerIndex) => (
        <View key={innerIndex} style={{justifyContent:"center"}}>
          <Text style={{ color: "gray", paddingBottom: 4, fontSize: 13 }}>{`Repair Date: ${dateKey}`}</Text>
          <List.Item
            key={innerIndex}
            title={`${task.vehicleDetails[0].vehicle_number} - ${task.vehicleDetails[0].vehicle_company} - ${task.vehicleDetails[0].vehicle_type}`}
            description={
              JSON.parse(task.changes_made).map((change, i) => (
                <Text key={i}>{`Change ${i + 1}: ${change}`}</Text>
              ))
            }
            style={styles.containerItem}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={showModal}>
                  <Ionicons style={{paddingTop:7,}} name="eye" size={25} color="#808000" />
                </TouchableOpacity>
              </View>
            )}
          />

            <View >
              <Portal >
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text style={{fontSize:17,paddingBottom:5,fontWeight:"bold"}}>Name: {task.vehicleDetails[0].vehicle_company}</Text>
              <Text style={{paddingBottom:25,fontSize:13}}>Vechile Number: {task.vehicleDetails[0].vehicle_number}</Text>
              <Text style={{paddingBottom:5,color:"gray",fontSize:13}}>Changes done :</Text>
              <Text style={{fontSize:15,padding:10,marginBottom:40,borderRadius:5,borderWidth:1,borderColor:"#808000"}}> {
              JSON.parse(task.changes_made).map((change, i) => (
                <Text style={{color:"black",  }} key={i}>{`Change ${i + 1}: ${change}`} {"\n"} </Text>
              ))
            }</Text>

            <Text style={{paddingBottom:25,fontSize:16,fontWeight:"bold",color:'black'}}>
              Total Cost:  Rs 4000
            </Text>

            <View style={{flexDirection:'row'}}>
            <Button style={{borderRadius:5,borderColor:"#808000",margin:5,}}  mode="outlined">
              <Text style={{color:"#808000",fontWeight:"bold"}}>Start</Text>
            </Button>
              <Button style={{borderRadius:5 ,backgroundColor:"#808000",margin:5}} mode="contained"
              >
              <Text style={{color:"white",fontWeight:"bold"}}>Completed</Text>
              </Button>
            </View>
              </Modal>
            </Portal>
            </View>
        </View>
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
    paddingTop: 50,
    padding: 20,

  },
  containerItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 6,
    elevation:2,
  },
});

export default MyList;
