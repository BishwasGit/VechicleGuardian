import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import axios from 'axios';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';

const RegistrationScreen = ({ route }) => {
  const { userType } = route.params;
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  
  const handleRegistration = async () => {

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    } else {
      setUsernameError('');
    }

    if (!/^\d+$/.test(phone)) {
      setPhoneError('Phone must be a valid number');
      return;
    } else {
      setPhoneError('');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      return;
    } else {
      setEmailError('');
    }

    if (userType === 'Customer') {
      try {
        const response = await axios.post(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/register`, {
          userType,
          username,
          phone,
          email,
          password,
        });
    
        console.log(response.data); // Log the response from the server
        setRegistrationStatus(`Registered as ${userType}`);
        // You can add logic here to handle the response, like showing a success message or redirecting to the login page
      } catch (error) {
        console.error('Error registering:', error);
        console.error('Error registering:', error.response.data.error);
        setRegistrationStatus(`Registration failed: ${error.response.data.error}`);
      }
      console.log('Registerting as Customer');
    } else if (userType === 'Repair Center') {
      try {
        const response = await axios.post(`http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/registerRepairCenter`, {
          userType,
          username,
          phone,
          email,
          password,
        });
    
        console.log(response.data); // Log the response from the server
        setRegistrationStatus(`Registered as ${userType}`);
        // You can add logic here to handle the response, like showing a success message or redirecting to the login page
      } catch (error) {
        console.error('Error registering:', error);
        console.error('Error registering:', error.response.data.error);
      }
      console.log('Registering as Repair Center');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Registration Screen for {userType}</Title>
          <TextInput
            label="Username"
            value={username}
            mode="outlined"
            onChangeText={(text) => setUsername(text)}
            style={styles.textinput}
          />
          <Text style={styles.errorText}>{usernameError}</Text>
          <TextInput
            label="Phone"
            value={phone}
            mode="outlined"
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
            style={styles.textinput}
          />
          <Text style={styles.errorText}>{phoneError}</Text>
          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
            style={styles.textinput}
          />
          <Text style={styles.errorText}>{emailError}</Text>
          <TextInput
            label="Password"
            value={password}
            mode="outlined"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.textinput}
          />
          <Button mode="outlined" onPress={handleRegistration} style={styles.button}>
            Register
          </Button>
          {registrationStatus && <Text>{registrationStatus}</Text>}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '80%',
  },
  title: {
    marginBottom: 20,
    textAlign : 'center'
  },
  textinput: {
    marginVertical: 5,
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default RegistrationScreen;
