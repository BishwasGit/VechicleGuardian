import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, {useState, useEffect} from 'react';
import { ImageBackground,ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import DashboardContent from './dashboardContent.js';
import {Ionicons} from '@expo/vector-icons';
import ChatContent from './ChatContent.js';

const Tab = createBottomTabNavigator ();

const DashboardScreen = ({customerId}) => {
  return <DashboardContent customerId={customerId}/>;
};
const ChatScreen = ({ customerId }) => {
  return <ChatContent customerId={customerId} />;
};

const CustomerDashboard = ({ route }) => {
  const { customer_id } = route.params;
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repairCenterProfile, setRepairCenterProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] =
    useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // alert('Fetch Details Press Ok');
    const fetchCustomerDetails = async () => {
      if (!customer_id) {
        console.error("customer_id is undefined");
        return;
      }
      setTimeout(async () => { try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
        );
        const data = await response.json();

          setCustomerDetails (data.customerDetails);

          const repairCenterCheckResponse = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterUsername/${data.customerDetails[0].username}`
          );

          if(repairCenterCheckResponse.ok){
          const repairCenterCheckData = await repairCenterCheckResponse.json ();

          if (repairCenterCheckData.exists) {
            setRepairCenterProfile ({
              repaircenter_id: repairCenterCheckData.repaircenter_id,
            });
          }
        }
          const repairCenterSellerCheckResponse = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.customerDetails[0].username}`
          );

          if(repairCenterSellerCheckResponse.ok){
          const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json ();

          if (repairCenterSellerCheckData.exists) {
            setRepairCenterSellerProfile ({
              repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
            });
          }
        }
        } catch (error) {
          console.error ('Error fetching customer details:', error);
        }
      },1000)};

    fetchCustomerDetails();
  }, [customer_id]);

  const handleButtonPress = (buttonType) => {
    switch (buttonType) {
      case "switchToRepairCenterProfile":
        navigation.navigate("RepairCenterDashboard", {
          repaircenter_id: repairCenterProfile?.repaircenter_id,
        });
        break;
      case "switchToRepairCenterSellerProfile":
        navigation.navigate("RepairCenterPartsSeller", {
          repaircenter_id:
            repairCenterSellerProfile?.repair_parts_seller_users_id,
        });
        break;
    }
  };
  const handleMenuNavigation = (screen) => {
    navigation.navigate(screen, { customer_id: customer_id }); // Pass customer_id as a parameter object
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
        name="Dashboard"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      >
          {() => <DashboardScreen customerId={customer_id} />}
        </Tab.Screen>
       <Tab.Screen
      name="Chat"
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="chat" size={size} color={color} />
        ),
      }}
    >
      {() => <ChatScreen customerId={customer_id} />}
    </Tab.Screen>

      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileScreen
            repairCenterProfile={repairCenterProfile}
            repairCenterSellerProfile={repairCenterSellerProfile}
            handleButtonPress={handleButtonPress}
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


function ProfileScreen({
  repairCenterProfile,
  repairCenterSellerProfile,
  handleButtonPress,
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

      <Text style={styles.profileSubTitle}>Profile Settings</Text>

      <View  style={styles.switchprofilebutton}>
      {repairCenterProfile &&
          <TouchableOpacity
          style={styles.profilebutton}
            onPress={() => handleButtonPress ('switchToRepairCenterProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Repair Center</Text>
          </TouchableOpacity>}

          {repairCenterSellerProfile &&
          <TouchableOpacity
          style={styles.profilebutton}
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Seller Profile</Text>
          </TouchableOpacity>}

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
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
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
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
  },

  line: {
    width: '47%',
    borderBottomColor: '#ffd700',
    borderBottomWidth: 2,
  },
  menuContainer: {
    flex: 1,
    paddingTop:80,
    marginBottom: 35,
    marginTop:35,
  },
  gridRow: {
    flexDirection: 'row',

  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    marginRight: 35,
    marginLeft: 35,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    paddingTop:16,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
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
export default CustomerDashboard;
