import React, { useState, useEffect } from 'react';
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import {TextInput, Checkbox} from 'react-native-paper';
import {View,Title,Text,Image,Dimensions,StyleSheet, TouchableOpacity} from 'react-native';
import RepairCenterList from './RepairCenterList'

const CustomerAppoinmentScreen = ({ route, navigation }) => {
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [availableRepaircenterList, setAvailableRepaircenterList] = useState("");
  const { customer_id } = route.params;

  useEffect(() => {
    const fetchAvailableRepairCenters = async () => {
      try {
        const availableRepairCenters = await fetch(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/listAvailableRepairCenters/`);
        const list = await availableRepairCenters.json();
        setAvailableRepaircenterList(list);
      } catch (error) {
        console.log('Unable to fetch available repair centers', error);
      }
    };
    
    fetchAvailableRepairCenters();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'black', textAlign: 'left', }}>Available Repair Centers</Text>
      </View>
      <View style={styles.formContainer}>
        {availableRepaircenterList ? (
          <RepairCenterList list={availableRepaircenterList} />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingTop: "13%",
    padding: 20,
  },
  formContainer:{
    alignItems: 'center',
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
  textinput: {
    height: 55,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '80%',
    paddingLeft: 30,
    marginTop: 10,
    borderRadius:20,
    backgroundColor:"white",
    elevation:2,
  },

});

export default CustomerAppoinmentScreen;
