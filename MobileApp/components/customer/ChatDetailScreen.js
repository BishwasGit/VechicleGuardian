import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-paper";

const ChatDetailScreen = ({ route }) => {
  const [repaircenterDetails, setRepairCenterDetails] = useState(null);
  const { repaircenters_id, customer_id } = route.params;
  const navigation = useNavigation();
console.log(route.params);
  useEffect(() => {
    const fetchRepairCenterDetails = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/repaircentersid/${repaircenters_id}`
        );
        const data = await response.json();
        setRepairCenterDetails(data);
      } catch (error) {
        console.log('Error fetching repaircenter details', error);
      }
    }
    fetchRepairCenterDetails();
  }, [repaircenters_id]);
  console.log('repaircenterDetails : ' , repaircenterDetails)
  return (
    <View style={styles.container}>
    {repaircenterDetails && (
      <View style={styles.topContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-outline"
          size={25}
          color="white"
        />
        <View style={{ marginLeft: 30 , marginVertical : 10 }}>
          <Text style={{ fontSize: 20, color: "white", marginTop : 10 }}>{repaircenterDetails[0]?.repaircenter_fname}</Text>
          <Text style={{ fontSize: 16, color: "white", opacity: 0.6 }}>{repaircenterDetails[0]?.contact}</Text>
        </View>
      </View>
    )}
  
    <View style={styles.bodyContainer}></View>
  
    <View style={styles.bottomContainer}>
      <TextInput
        placeholder="Type your message"
        placeholderTextColor="#bfc1c2"
        style={styles.textinput}
      />
    </View>
  </View>
  
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#e5e4e2",
  },
  topContainer: {
    paddingTop: "12%",
    backgroundColor: "gray",
    alignItems: 'center',
    width: "100%",
    padding: 20,
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  textinput: {
    height: 60,
    backgroundColor: "white",
    width: "100%",
    paddingLeft: 30,
  },
});

export default ChatDetailScreen;
