import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const RegistrationScreen = ({ route }) => {
  const { userType } = route.params;

  return (
    <View style={styles.container}>
      <Text>{`Registration Screen for ${userType}`}</Text>
      {/* Add your registration form here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegistrationScreen;
