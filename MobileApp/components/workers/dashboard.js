import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';
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
          <Icon name="home" size={size} color={color} />
        ),
      }}
    >
        {() => <MenuScreen repaircenterWorkersId={repaircenter_workers_id} />}
      </Tab.Screen>

      <Tab.Screen
      name="Jobs"
      children={() => (
        <JobScreen
        />
      )}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="view-dashboard" size={size} color={color} />
        ),
      }}
    />

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
    <ScrollView>
    <View style={styles.container}>
    <Title style={styles.welcomeText}>Worker Dashboard</Title>

    <View style={styles.cardContainer}>
    <Card style={styles.card}>
      <Card.Content style={{alignItems: "left",padding:10,}}>
        <Text variant="titleLarge">Works for Today</Text>
        <Text style={{fontSize:18,fontWeight:'bold',paddingTop:6,}} variant="bodyMedium">Top Prioity:  10</Text>
        <Text style={{fontSize:18,fontWeight:'bold',paddingTop:6,}} variant="bodyMedium">Total Work:  20</Text>
      </Card.Content>
      <Card.Actions style={{alignItems: "left",paddingTop:15,}}>
        <Button style={{borderColor:'white',borderRadius:8,borderWidth:1,backgroundColor:'#808000'}}><Text style={{color:'white',fontWeight:'bold'}} >Check Top Prioity </Text></Button>
        <Button style={{borderColor:'white',borderRadius:8,borderWidth:1,backgroundColor:'#808000',}}><Text style={{color:'white',fontWeight:'bold'}} >Check All List </Text></Button>
      </Card.Actions>
   </Card>
    </View>

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



    <View style={styles.list}>
    <Text style={{ fontSize: 14, marginBottom: 15,fontWeight:'bold' }}>Status Board</Text>
    <List.AccordionGroup style={styles.listt}>
    <List.Accordion  style={styles.listItem} title="Yamaha : Charge Battery" id="1">
      <List.Item style={styles.listTitle} title="Due Date: " />
      <List.Item style={styles.listTitle} title="Changes:" />
      <List.Item style={styles.listTitle} title="Progress: " />
      <List.Item style={styles.listTitle} title=" " />
    </List.Accordion>

    <List.Accordion  style={styles.listItem} title="Accordion 2" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
  </List.AccordionGroup>
    </View>

    <Button
      style={{
        margin:40,
        width: "90%",
        padding: 15,
        alignItems: "center",
        marginTop: 50,
        backgroundColor: "#808000",
      }}
      labelStyle={{ color: "white" }}
      onPress={handleStartRepairing}

    >
      Start Repairing
    </Button>

  </View>
  </ScrollView>
  );
}

function JobScreen({

}) {
  return (
    <View style={styles.container}>

    <View style={styles.list}>
    <Text style={{ fontSize: 14, marginBottom: 15,fontWeight:'bold' }}>List of Works</Text>
    <List.AccordionGroup style={styles.listt}>
    <List.Accordion  style={styles.listItem} title="Yamaha : Charge Battery" id="1">
      <List.Item style={styles.listTitle} title="Due Date: " />
      <List.Item style={styles.listTitle} title="Changes:" />
      <List.Item style={styles.listTitle} title="Progress: " />
      <List.Item style={styles.listTitle} title=" " />
    </List.Accordion>

    <List.Accordion  style={styles.listItem} title="Accordion 2" id="2">
      <List.Item title="Item 2" />
    </List.Accordion>
  </List.AccordionGroup>
    </View>
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
    paddingTop: '15%',
    alignItems: "center",
    backgroundColor:'#f5f5f5',
  },
  cardContainer: {
    flex: 1,
    paddingTop: '5%',
    alignItems: "center",
    width:'95%',
    backgroundColor:'#f5f5f5',
  },
  card:{
    padding:20,
    width:'95%',
    alignItems: "left",
    backgroundColor:'#bcb88a',
  },

  welcomeText: {
    fontWeight: "bold",
    color: "black",
    // paddingBottom: 50,
    fontSize: 22,
  },
  head: {
    marginTop: '10%',
    width: "90%",
    padding: 40,
    borderColor: "#0d5563",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list:{
    paddingTop: '10%',
    width:"90%",
    backgroundColor:'#f5f5f5',
  },
  listItem:{
    elevation:2,
    backgroundColor:'white',
    borderWidth:0.15,
    width:'100%',
    // marginBottom:15,
  },
  listTitle:{

  },
  profileContainer:{
    flex: 1,
    alignItems: 'left',
    paddingTop:"20%",
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
    width:"100%",
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
    marginTop:"35%",
    backgroundColor:"#96a53c",
    padding: 20,
    borderRadius: 10,
    width:'95%',
    elevation:2,
    alignItems : 'center',
  },
});
export default WorkerDashboard;
