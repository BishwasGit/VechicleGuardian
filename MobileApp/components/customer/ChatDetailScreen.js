import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-paper";;

const ChatDetailScreen = ({ route }) => {
  const [repaircenterDetails, setRepairCenterDetails] = useState(null);
  const [newMessage, setNewMessage] = useState('');
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
          <Text style={{ fontSize: 16, color: "white", opacity: 0.6 }}>{repaircenterDetails[0]?.contact}</Text>
        </View>
      </View>
    )}
  
    <View style={styles.bodyContainer}></View>
  
    <View style={styles.bottomContainer}>
        <TextInput
          placeholder="Type your message"
          placeholderTextColor="#bfc1c2"
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={30} color="gray" style={styles.sendButton} />
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
    paddingTop: "12%",
    backgroundColor: "gray",
    alignItems: 'center',
    width: "100%",
    padding: 20,
    flexDirection: 'row',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginBottom : 0,
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor : 'white',
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default ChatDetailScreen;
