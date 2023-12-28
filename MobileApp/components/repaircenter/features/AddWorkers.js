import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const AddWorkerScreen = ({ route }) => {
    const { repaircenter_id } = route.params;
    const [userName, setUserName] = useState('');
    const [workerName, setWorkerName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
  
    const handleAddWorker = async () => {
      // Validate the form fields before submitting
      if (!workerName || !password || !phoneNumber || !emailAddress) {
        alert('Please fill in all fields');
        return;
      }
  
      // Prepare the data to be submitted
      const formData = {
        repaircenter_id: repaircenter_id,
        userName: userName,
        workerName: workerName,
        password: password,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
      };
  
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/addWorkers`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
  
        if (!response.ok) {
          // Handle non-successful response (e.g., show an error message)
          console.error('Failed to add worker:', response.status);
          return;
        }
  
        // Optionally, you can handle the successful response (e.g., show a success message)
        console.log('Worker added successfully!');
  
        // Optionally, you can reset the form fields after submission
        setUserName('');
        setWorkerName('');
        setPassword('');
        setPhoneNumber('');
        setEmailAddress('');
      } catch (error) {
        console.error('Error adding worker:', error);
        // Handle errors, show error messages, etc.
      }
    };
  
    return (
      <Card>
        <Card.Content>
          <Title>Add Worker for Repair Center ID: {repaircenter_id}</Title>
          <TextInput
            label="User Name"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label="Worker Name"
            value={workerName}
            onChangeText={(text) => setWorkerName(text)}
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="numeric"
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label="Email Address"
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
            keyboardType="email-address"
            style={{ marginVertical: 10 }}
          />
          <Button mode="contained" onPress={handleAddWorker} style={{ marginVertical: 10 }}>
            Add Worker
          </Button>
        </Card.Content>
      </Card>
    );
  };
  
  export default AddWorkerScreen;