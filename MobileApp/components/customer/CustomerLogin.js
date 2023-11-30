import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';

const CustomerLogin = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic for repair center
    console.log('Logging in as Customer');
  };

  const handleRegisterNow = () => {
    navigation.navigate('Registration', { userType: 'Customer' });
  };
  return (
    <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Login as Customer</Title>
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.textinput}
        />
        <TextInput
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.textinput}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <Button onPress={handleRegisterNow} style={styles.registerButton}>
          Register Now
        </Button>
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
        padding: 20,
      },
    title:{
    textAlign:'center',
    marginBottom : 10
    },
  card: {
    width: '80%',
    marginVertical: 10,
    padding : '5px'
  },
  button: {
    marginVertical: 10,
  },
  registerButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  textinput : {
    marginVertical : 10
  }
});

export default CustomerLogin;
