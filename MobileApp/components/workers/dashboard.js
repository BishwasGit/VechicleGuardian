import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button, ActivityIndicator } from "react-native-paper";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator ();

const WorkerDashboard = ({
  route }) => {
  const { repaircenter_workers_id } = route.params;
  const navigation = useNavigation();
  const [workerDetails, setWorkerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!repaircenter_workers_id) navigation.navigate("MainScreen");
  }, [navigation, repaircenter_workers_id]);
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getWorkerDetails/${repaircenter_workers_id}`
        );

        if (!response.ok) {
          // Handle non-successful response
          console.error("Failed to fetch worker details:", response.status);
          return;
        }

        const result = await response.json();

        if (result.success) {
          setWorkerDetails(result.data); // Access the 'data' property
        }
      } catch (error) {
        console.error("Error fetching worker details:", error);
        // Handle errors, show error messages, etc.
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [repaircenter_workers_id]);

  const handleStartRepairing = () => {
    navigation.navigate("RepairProcessScreen", { repaircenter_workers_id });
  };


  return (

    <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#d4af37',
      inactiveTintColor: 'gray',
    }}
  >
      <Tab.Screen
      name="Menu"
      children={() => (
        <MenuScreen
        loading={loading}
        workerDetails={workerDetails}
        handleStartRepairing={handleStartRepairing}
        />
      )}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="view-dashboard" size={size} color={color} />
        ),
      }}
    >
        {() => <MenuScreen repaircenterWorkersId={repaircenter_workers_id} />}
      </Tab.Screen>

    <Tab.Screen
      name="Profile"
      children={() => (
        <ProfileScreen
        />
      )}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="account" size={size} color={color} />
        ),
      }}
    />

  </Tab.Navigator>
  );
};

function MenuScreen({
  loading,
  workerDetails,
  handleStartRepairing,
}) {
  return (
    <View style={styles.container}>
    <Title style={styles.welcomeText}>Worker Dashboard</Title>
    <View style={styles.head}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : workerDetails ? (
        <>
          <Text style={{ fontSize: 20, color: "#c1121f" }}>
            Welcome! {workerDetails.worker_name}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Contact Number: {workerDetails.phone_number}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Email Address: {workerDetails.email_address}
          </Text>
          {/* Add other worker details here */}
        </>
      ) : (
        <Text>No worker details found</Text>
      )}
    </View>

    <Button
      style={{
        width: "90%",
        padding: 15,
        alignItems: "center",
        marginTop: 50,
        backgroundColor: "#0d5563",
      }}
      onPress={handleStartRepairing}
      labelStyle={{ color: "white" }}
    >
      Start Repairing
    </Button>
  </View>
  );
}

function ProfileScreen({

}) {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.profileContainer}>

      <Text style={styles.profileTitle}>Account</Text>
      <Text style={styles.profileSubTitle}>Services</Text>
      <View  style={styles.switchprofilebutton}>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>Payments</Text>
          </TouchableOpacity>
      </View>

      <Text style={styles.profileSubTitle}>Support</Text>
      <View  style={styles.switchprofilebutton}>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>App Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.profilebutton}
          >
            <Text style={styles.buttonProfileText}>Help Center</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
          <TouchableOpacity
        style={styles.switchprofileLogbutton}
        onPress={handleLogout}
      >
        <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Log Out</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  welcomeText: {
    paddingTop: 50,
    fontWeight: "bold",
    color: "#c1121f",
    paddingBottom: 50,
    fontSize: 25,
  },
  head: {
    width: "90%",
    padding: 40,
    borderColor: "#0d5563",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileContainer:{
    flex: 1,
    alignItems: 'left',
    paddingTop:"25%",
    paddingLeft:"5%",
  },
  profileTitle:{
    fontSize:25,
    fontWeight:'bold',
  },
  profileSubTitle:{
    paddingTop:"8%",
    fontWeight:'medium',
    fontSize:14,
    paddingBottom:10,
  },
  buttonRow: {
    height:300,
    width:"60%",
  },
  buttonProfileText:{
    color:'black',
    fontWeight:"medium",
    fontSize:15,
  },
  switchprofilebutton: {
    backgroundColor: 'white',
    width:'94%',
    justifyContent: 'center',
    alignItems: 'left',
    elevation: 2,
    borderRadius:10,
  },
  profilebutton:{
    padding:24,
    borderWidth:0.2,
    borderColor:'#e5e4e2',
  },
  switchprofileLogbutton:{
    backgroundColor:"#96a53c",
    padding: 15,
    borderRadius: 50,
    width:'60%',
    alignItems : 'center',
    marginVertical : 20,
    marginLeft : '50%',
    marginRight : '50%'
  },
});
export default WorkerDashboard;
