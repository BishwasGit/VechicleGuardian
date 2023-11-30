import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const LoginSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to Vehicle Guardian</Title>
          <Paragraph>
            Your one-stop solution for managing vehicle information and repair services.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CustomerLogin')}
            style={styles.button}
          >
            Login as Customer
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('RepairCenterLogin')}
            style={styles.button}
          >
            Login as Repair Center
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
    padding: 16,
  },
  card: {
    width: '100%',
    marginBottom: 16,
    padding: 16,
  },
  button: {
    marginVertical: 10,
  },
});

export default LoginSelectionScreen;
