//react-native-paper modules

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import {StyleSheet} from 'react-native';
//main screen
import LoginSelectionScreen from './components/LoginScreen';

//repair center side
import RepairCenterLogin from './components/repaircenter/RepairCenterLogin';
import RegistrationScreen from './components/RegistrationScreen'; // Create a new component for registration
import RepariCenterDashboard from './components/repaircenter/dashboard'
import RepairProcessScreen from './components/repaircenter/features/RepairProcessScreen'

//customer side
import CustomerDashboard from './components/customer/dashboard'
import CustomerLogin from './components/customer/CustomerLogin';
import AddVehicleScreen from './components/customer/features/AddVehicleScreen'
import ListVehicleScreen from './components/customer/features/ListVehicleScreen'
import ViewServiceHistoryScreen from './components/customer/features/ViewServiceHistoryScreen'
import LocateRepairCentersScreen from './components/customer/features/LocateRepairCentersScreen'


//admin 
import AdminDashboard from './components/admin/dashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSelection">
        <Stack.Screen name="Vechicle Guardian Landing Page" component={LoginSelectionScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
        <Stack.Screen name="RepairCenterLogin" component={RepairCenterLogin} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="RepariCenterDashboard" component={RepariCenterDashboard} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
        <Stack.Screen name="ListVehicle" component={ListVehicleScreen} />
        <Stack.Screen name="ViewServiceHistory" component={ViewServiceHistoryScreen} />
        <Stack.Screen name="LocateRepairCenters" component={LocateRepairCentersScreen} />
        <Stack.Screen name="RepairProcessScreen" component={RepairProcessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider> 
  );
};
export default App;
