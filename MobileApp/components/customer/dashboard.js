import React, {useState, useEffect} from 'react';
import { ImageBackground,ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import DashboardContent from './dashboardContent.js';
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import {Ionicons} from '@expo/vector-icons';

const image = {uri: 'https://i.pinimg.com/originals/47/8b/f6/478bf61e4712ba383a76118a6558bfd4.jpg'};

const Tab = createBottomTabNavigator ();

const DashboardScreen = () => {
  return <DashboardContent />;
};

const CustomerDashboard = ({route}) => {
  const {customer_id} = route.params;
  const [customerDetails, setCustomerDetails] = useState (null);
  const [repairCenterProfile, setRepairCenterProfile] = useState (null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] = useState (
    null
  );
  const navigation = useNavigation ();

  useEffect (
    () => {
      const fetchCustomerDetails = async () => {
        if (!customer_id) {
          console.error ('customer_id is undefined');
          return;
        }
        try {
          const response = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
          );
          const data = await response.json ();

          setCustomerDetails (data.customerDetails);

          const repairCenterCheckResponse = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterUsername/${data.customerDetails[0].username}`
          );
          const repairCenterCheckData = await repairCenterCheckResponse.json ();

          if (repairCenterCheckData.exists) {
            setRepairCenterProfile ({
              repaircenter_id: repairCenterCheckData.repaircenter_id,
            });
          }
          const repairCenterSellerCheckResponse = await fetch (
            `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.customerDetails[0].username}`
          );
          const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json ();

          if (repairCenterSellerCheckData.exists) {
            setRepairCenterSellerProfile ({
              repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
            });
          }
        } catch (error) {
          console.error ('Error fetching customer details:', error);
        }
      };

      fetchCustomerDetails ();
    },
    [customer_id]
  );

  const handleMenuNavigation = screen => {
    navigation.navigate (screen, customer_id);
  };

  const handleButtonPress=(buttonType) => {
    switch(buttonType)
     {case "switchToRepairCenterProfile"  :
     navigation.navigate("RepairCenterDashboard",
     {
    repaircenter_id: repairCenterProfile?.repaircenter_id,
     });
     break;
     case "switchToRepairCenterSellerProfile":
     navigation.navigate("RepairCenterPartsSeller",
     {
     repaircenter_id:repairCenterSellerProfile?.repair_parts_seller_users_id,
    });
    break;
        }
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
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menus"
        children={() => (
          <MenusScreen handleMenuNavigation={handleMenuNavigation} />
        )}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="menu" size={size} color={color} />
          ),
        }}
      />
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
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="logout" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function MenusScreen({handleMenuNavigation}) {
  return (
    <ScrollView>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.purpleOverlay}>
          {/* Purple transparent background */}
        </View>
      <View style={styles.menuContainer}>

        <View style={styles.menuIntroContainer}>
          <Text style={{color: 'white',fontSize: 35, fontWeight: 'bold', marginBottom: 50}}>
          <Ionicons name="cog-outline" size={40} color="#ffd700" />  Vehicle<Text style={{color: '#ffd700', fontWeight: 'bold'}}>G</Text>
          </Text>

          <Text style={{color: '#e5e4e2',fontSize: 26, marginBottom: 40}}>
            GRAB NEARBY OFFERS!!
          </Text>

          <View style={styles.line} />
          <TouchableOpacity

              onPress={() => handleMenuNavigation ('AddVehicle')}
            >

              <Text style={{marginLeft: 11,color: 'white',fontSize: 13,paddingTop:5,  marginBottom: 5}}>
               <Ionicons name="add-outline" size={16} color="white" /> Register Vechile now</Text>
            </TouchableOpacity>
          <View style={styles.line} />

        </View>

        <View style={styles.menuGridContainer}>
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleMenuNavigation ('AddVehicle')}
            >

              <Ionicons name="newspaper-sharp" size={38} color="#253529" />
              <Text style={styles.buttonText}>Add Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleMenuNavigation ('ListVehicle')}
            >
              <Ionicons name="list-sharp" size={38} color="#253529" />
              <Text style={styles.buttonText}>List Vehicle Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleMenuNavigation ('ViewServiceHistory')}
            >
              <Ionicons name="time-sharp" size={38} color="#253529" />

              <Text style={styles.buttonText}>View Service History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleMenuNavigation ('LocateRepairCenters')}
            >
              <Ionicons name="location-sharp" size={38} color="#253529" />
              <Text style={styles.buttonText}>Locate Repair Centers</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      </ImageBackground>
    </ScrollView>
  );
}
function ProfileScreen({
  repairCenterProfile,
  repairCenterSellerProfile,
  handleButtonPress,
}) {
  return (
    <View style={styles.container}>
      <Text>Profile Settings</Text>
      <View style={styles.buttonRow}>
        {repairCenterProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() => handleButtonPress ('switchToRepairCenterProfile')}
          >
            <Text style={styles.buttonText}>Switch to Repair Center</Text>
          </TouchableOpacity>}
        {repairCenterSellerProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
          >
            <Text style={styles.buttonText}>Switch to Seller Profile</Text>
          </TouchableOpacity>}
      </View>
    </View>
  );
}

function LogoutScreen () {
  return (
    <View style={styles.container}>
      <Text>Logout!</Text>
    </View>
  );
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  menuContainer: {
    flex: 1,
    paddingTop:70,

  },
  line: {
    width: '47%',
    borderBottomColor: '#ffd700',
    borderBottomWidth: 2,
  },
  image: {
    height:'43%',
    flex:1,
    justifyContent: 'center',
  },
  overlay: {
    marginTop: 3,
    alignItems: "center",
  },
  purpleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(85,107,47,0.85)', // Purple transparent background
  },
  menuIntroContainer:{
    justifyContent: 'left',
    paddingLeft:40,
  },
  menuGridContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    borderTopRightRadius: 65,
    borderTopLeftRadius: 65,
    paddingBottom: 50,
    marginTop:80,
    paddingTop:60,
  },
  gridRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    margin: 18,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },

  buttonText: {
    paddingTop:20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
  },
  switchprofilebutton: {
    flex: 1, // Add this line
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1ad21',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Add this line for spacing between buttons
  },
});
export default CustomerDashboard;
