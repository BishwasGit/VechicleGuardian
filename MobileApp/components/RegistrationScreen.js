import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';

const RegistrationScreen = async ({ route }) => {
  const { userType } = route.params;
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRegistration = async () => {

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    } else {
      setUsernameError('');
    }

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone must be 10 digits');
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
        userType == 'Customer'
        const response = await axios.post('http://localhost:3000/api/register', {
          userType,
          username,
          phone,
          email,
          password,
        });
    
        console.log(response.data); // Log the response from the server
    
        // You can add logic here to handle the response, like showing a success message or redirecting to the login page
      } catch (error) {
        console.error('Error registering:', error);
        console.error('Error registering:', error.response.data.error);
      }
      console.log('Registerting as Customer');
    } else if (userType === 'Repair Center') {
      try {
        userType == 'Repair Center'
        const response = await axios.post('http://localhost:3000/api/register', {
          userType,
          username,
          phone,
          email,
          password,
        });
    
        console.log(response.data); // Log the response from the server
    
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
    <Title style={styles.title}>Registration Screen for {userType}</Title>
    <TextInput
      label="Username"
      value={username}
      onChangeText={(text) => setUsername(text)}
      style={styles.textinput}
    />
    <Text style={styles.errorText}>{usernameError}</Text>
    <TextInput
      label="Phone"
      value={phone}
      onChangeText={(text) => setPhone(text)}
      type="number"
      style={styles.textinput}
    />
    <Text style={styles.errorText}>{phoneError}</Text>
    <TextInput
      label="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      style={styles.textinput}
    />
    <Text style={styles.errorText}>{emailError}</Text>
    <TextInput
      label="Password"
      value={password}
      secureTextEntry
      onChangeText={(text) => setPassword(text)}
      style={styles.textinput}
    />
    <Button mode="contained" onPress={handleRegistration} style={styles.button}>
      Register
    </Button>
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
  title: {
    marginBottom: 20,
  },
  textinput: {
    marginVertical: 5,
    width: '80%',
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
