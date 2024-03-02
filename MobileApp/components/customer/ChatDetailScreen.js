import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-paper";


const ChatDetailScreen = ({ route }) => {
  const [repaircenterDetails, setRepairCenterDetails] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { repaircenters_id, customer_id } = route.params;
  const navigation = useNavigation();
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

  const sendMessage = async () => {
    // Implement sending message functionality here
    // You can make an API call to send the message
    // After sending the message, clear the newMessage state
    setNewMessage('');
  };

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
          <Text style={{ fontSize: 13, color: "white", opacity: 0.6 ,paddingTop:7,}}>{repaircenterDetails[0]?.contact}</Text>
        </View>
      </View>
    )}


    <View style={styles.bodyContainer}></View>

    <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Type your message"
          placeholderTextColor="#d3d3d3"
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.textInput}
          underlineColor="transparent"
        />
         <TouchableOpacity >
          <Ionicons name="mic" size={25} color="#808000" style={styles.sendButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="paper-plane" size={25} color="#808000" style={styles.sendButton} />
        </TouchableOpacity>
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
    paddingTop: "10%",
    backgroundColor: "gray",
    alignItems: 'center',
    width: "100%",
    paddingLeft: 25,
    flexDirection: 'row',
  },
  bottomContainer: {
    marginLeft:10,
    marginRight:10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput: {
    width: '80%',
    height:45,
    backgroundColor: 'white',
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 0,  // Set border width to 0
    borderBottomWidth: 0,  // Set borderBottom width to 0
    borderColor: 'transparent',  // Set border color to transparent
    outline: 'none',
  },
  sendButton: {
 marginLeft:10,
  },
});

export default ChatDetailScreen;
