//react-native-paper modules
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

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

//secure storage
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialRoute, setInitialRoute] = useState("LoginSelection");
  const [initialParams, setInitialParams] = useState(null);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userInfoString = await SecureStore.getItemAsync('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        const routeMap = {
          'admin': "AdminDashboard",
          'customer': "CustomerDashboard",
          'repair center': "RepairCenterDashboard",
        };
        setInitialRoute(routeMap[userInfo.userType] || "LoginSelection");
        setInitialParams({ userId: userInfo.userId });
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Vechicle Guardian Landing Page"
            component={LoginSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RepairCenterLogin"
            component={RepairCenterLogin}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerDashboard"
            component={CustomerDashboard}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RepairCenterDashboard"
            component={RepairCenterDashboard}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddVehicle"
            component={AddVehicleScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListVehicle"
            component={ListVehicleScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewServiceHistory"
            component={ViewServiceHistoryScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocateRepairCenters"
            component={LocateRepairCentersScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RepairProcessScreen"
            component={RepairProcessScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RepairHistoryScreen"
            component={RepairHistoryScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PartsManagement"
            component={PartsManagementPage}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddWorkersScreen"
            component={AddWorkersScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkerLoginScreen"
            component={WorkerLoginScreen}
          
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkerDashboard"
            component={WorkerDashboard}
          
            options={{ headerShown: false }}
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
