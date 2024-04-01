import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatContent = ({ repaircenterId }) => {
  const navigation = useNavigation();
  const [repairCenter, setRepairCenter] = useState(null);
  const [customerDetails, setcustomerDetails] =  useState(null);

  useEffect(() => {
    const fetchRepairCenter = async () => {
      try {
        const repairDataResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repairData_Repaircenter/${repaircenterId}`
        );
        const repairData = await repairDataResponse.json();
        console.log('the repair data',repairData);

        const repairCenterWorkerId = repairData.repairData[0].repaircenter_workers_id;
        console.log('the worker id :',repairCenterWorkerId);

        const repairCenterResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repairCenterWorker/${repairCenterWorkerId}`
        );
        const repairCenterData = await repairCenterResponse.json();
          console.log('the repair center data : ',repairCenterData)
          setRepairCenter(repairCenterData)

        const getvehicleDetailsId = repairData.repairData[0].vehicleDetails_id;
        const fetchCustomerIdResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerdetails_by_vehicledetailsId/${getvehicleDetailsId}`
        );
        const fetchCustomerIdData = await fetchCustomerIdResponse.json();
        const customer_id = fetchCustomerIdData[0].customer_id;
        if(customer_id){
        const getcustomerDetails = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
        );
        const data = await getcustomerDetails.json();
        console.log('the customer data:', data);
        setcustomerDetails(data.customerDetails);
      }
      } catch (error) {
        console.error('Error fetching repair center data:', error);
      }
    };

    fetchRepairCenter();
  }, [repaircenterId]);

  const handlePress = ({ repaircenterId, customerId }) => {
    navigation.navigate('ChatDetail', {
      repaircenters_id: repaircenterId,
      customer_id: customerId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {/* <Ionicons name="list-outline" size={30} color="white" /> */}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'black', textAlign : 'center', marginVertical : 10 }}>Messages</Text>
      </View>

      <View style={styles.touchContainer}>
      {customerDetails && customerDetails.map(customer => (
        <TouchableOpacity
          key={customer.customer_id}
          style={styles.touchableContainer}
          onPress={() => {
            handlePress({
              repaircentersId: repaircenterId,
              customerId: customer.customer_id
            });
          }}
        >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{ uri: "https://i.pinimg.com/originals/eb/9e/97/eb9e978108d7a30c654654b8210668fa.jpg" }}
        style={{ width: 60, height: 60, borderRadius: 50 }}
      />
      <View style={styles.texts}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{customer.phone}</Text>
        <Text style={{ color: 'gray', fontSize: 13, paddingTop: 7 }}>{customer.username}</Text>
        <Text style={{ color: 'gray', fontSize: 11, paddingTop: 7 }}>{customer.email}</Text>
      </View>
      <View style={styles.date}></View>
    </View>
  </TouchableOpacity>
))}
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
