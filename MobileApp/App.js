import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerLogin from './components/customer/CustomerLogin';
import RepairCenterLogin from './components/repaircenter/RepairCenterLogin';
import LoginSelectionScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen'; // Create a new component for registration

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSelection">
        <Stack.Screen name="Vechicle Guardian Landing Page" component={LoginSelectionScreen} />
        <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
        <Stack.Screen name="RepairCenterLogin" component={RepairCenterLogin} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
