//react-native-paper modules
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, HeaderStyle } from "react-native";

//main screen
import LoginSelectionScreen from "./components/LoginScreen";

//login & registration
import Login from "./components/Login";
import RegistrationScreen from "./components/RegistrationScreen";

//repair center side
import RepairCenterLogin from "./components/repaircenter/RepairCenterLogin";
import RepairCenterDashboard from "./components/repaircenter/dashboard";
import AddWorkersScreen from "./components/repaircenter/features/AddWorkers";
import PartsManagementPage from "./components/repaircenter/features/PartsManagement";
import RepairHistoryScreen from "./components/repaircenter/features/RepairHistory";

//customer side
import CustomerDashboard from "./components/customer/dashboard";

import AddVehicleScreen from "./components/customer/features/AddVehicleScreen";
import ListVehicleScreen from "./components/customer/features/ListVehicleScreen";
import ViewServiceHistoryScreen from "./components/customer/features/ViewServiceHistoryScreen";
import LocateRepairCentersScreen from "./components/customer/features/LocateRepairCentersScreen";

//admin
import AdminDashboard from "./components/admin/dashboard";

//workers
import WorkerLoginScreen from "./components/workers/login";
import WorkerDashboard from "./components/workers/dashboard";
import RepairProcessScreen from "./components/workers/features/RepairProcessScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginSelection">
          <Stack.Screen
            name="Vechicle Guardian Landing Page"
            component={LoginSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={headerStyle}
          />
          <Stack.Screen
            name="RepairCenterLogin"
            component={RepairCenterLogin}
            options={headerStyle}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={headerStyle}
          />
          <Stack.Screen
            name="CustomerDashboard"
            component={CustomerDashboard}
            options={headerStyle}
          />
          <Stack.Screen
            name="RepairCenterDashboard"
            component={RepairCenterDashboard}
            options={headerStyle}
          />
          <Stack.Screen
            name="AddVehicle"
            component={AddVehicleScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="ListVehicle"
            component={ListVehicleScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="ViewServiceHistory"
            component={ViewServiceHistoryScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="LocateRepairCenters"
            component={LocateRepairCentersScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="RepairProcessScreen"
            component={RepairProcessScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="RepairHistoryScreen"
            component={RepairHistoryScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="PartsManagement"
            component={PartsManagementPage}
            options={headerStyle}
          />
          <Stack.Screen
            name="AddWorkersScreen"
            component={AddWorkersScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="WorkerLoginScreen"
            component={WorkerLoginScreen}
            options={headerStyle}
          />
          <Stack.Screen
            name="WorkerDashboard"
            component={WorkerDashboard}
            options={headerStyle}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const headerStyle = {
  headerStyle: {
    backgroundColor: "#0d5563",
  },
  headerTintColor: "white", // Optionally, set text color
  headerTitleAlign: "center",
};
export default App;
