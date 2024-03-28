import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatContent = ({ customerId }) => {
  const navigation = useNavigation();
  const [repairCenter, setRepairCenter] = useState(null);

  useEffect(() => {
    const fetchRepairCenter = async () => {

      try {
        // Fetch repair data associated with the customer's vehicle
        const repairDataResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repairData/${customerId}`
        );
        const repairData = await repairDataResponse.json();

        // Extract repair center ID from repair data
        const repairCenterWorkerId = repairData.repairData[0].repaircenter_workers_id;
        // Fetch repair center information based on repair center worker ID
        const repairCenterResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repairCenterWorker/${repairCenterWorkerId}`
        );
        const repairCenterData = await repairCenterResponse.json();
        // Set the repair center information to state
        setRepairCenter(repairCenterData)
      } catch (error) {
        console.error('Error fetching repair center data:', error);
      }
    };

    fetchRepairCenter();
  }, [customerId]);

  const handlePress = ({ repaircentersId, customerId }) => {
    navigation.navigate('ChatDetail', {
      repaircenters_id: repaircentersId,
      customer_id: customerId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* <Ionicons name="list-outline" size={30} color="white" /> */}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'black', textAlign : 'left', marginVertical : 10 }}>Messages</Text>
      </View>

      <View style={styles.touchContainer}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => {repairCenter &&
          handlePress({
            repaircentersId: repairCenter.repairCenterData[0].repaircenters_id,
            customerId: customerId
          });
      }}

      >


   {repairCenter && (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri:"https://i.pinimg.com/originals/eb/9e/97/eb9e978108d7a30c654654b8210668fa.jpg"}}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
        <View style={styles.texts}>

          <Text style={{ fontSize: 17 ,fontWeight:"bold"}}>{repairCenter.repairCenterData[0].repaircenter_fname}</Text>
          <Text style={{ color: 'gray',fontSize: 11, paddingTop:7,}}>{repairCenter.repairCenterData[0].address}</Text>
        </View>
        <View style={styles.date}></View>
      </View>
    )}


      </TouchableOpacity>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    display : 'flex',
    paddingTop: "15%",
    width: "100%",
    padding: 20,
    flexDirection: 'row',
  },
  touchContainer: {
    flex: 1,
    padding:5,
    alignItems: 'center',
    width: "100%",
  },
  touchableContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    width: "95%",
    backgroundColor: 'white',
    height: 100,
    borderRadius: 20,
    paddingLeft: 30,
    padding:5,
    elevation: 1,
  },
  texts: {
  marginLeft : 25,
  },
});

export default ChatContent;
