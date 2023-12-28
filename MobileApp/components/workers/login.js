import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [workerUserName, setWorkerUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validate the form fields here before submitting
    if (!workerUserName || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Send login data to the server for authentication
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/workerLogin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workerUserName: workerUserName,
            password: password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Authentication successful, navigate to the worker's dashboard
        navigation.navigate('WorkerDashboard', { workerId: result.workerId });
      } else {
        // Authentication failed, show an error message
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again later.');
    }

    // Optionally, you can clear the form fields after submission
    setWorkerUserName('');
    setPassword('');
  };

  return (
    <Card>
      <Card.Content>
        <Title>Login using details provided by your repair center</Title>
        <TextInput
          label="Worker Username"
          value={workerUserName}
          onChangeText={(text) => setWorkerUserName(text)}
          style={{ marginVertical: 10 }}
        />
        <TextInput
          mode="outlined"
          label="Enter your Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          underlineColor="transparent"
          style={{ marginVertical: 10 }}
        />
        <Button mode="contained" onPress={handleLogin} style={{ marginVertical: 10 }}>
          Login
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Login;
