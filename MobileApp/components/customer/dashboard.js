import React, {useState, useEffect} from 'react';
import { ImageBackground,ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import DashboardContent from './dashboardContent.js';
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator ();

const DashboardScreen = () => {
  return <DashboardContent />;
};

const CustomerDashboard = ({ route }) => {
  const { customer_id } = route.params;
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repairCenterProfile, setRepairCenterProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] =
    useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    alert("go to dashboard")
    const fetchCustomerDetails = async () => {
      if (!customer_id) {
        console.error("customer_id is undefined");
        return;
      }
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
        );
        const data = await response.json();

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

    </Tab.Navigator>
  );
};

function MenusScreen({ handleMenuNavigation }) {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("AddVehicle")}

      >
       <Ionicons name="clipboard-outline" size={35} color="green" />


        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("ListVehicle")}
      >
           <Ionicons name="list-outline" size={35} color="green" />
        <Text style={styles.buttonText}>List Vehicle Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("ViewServiceHistory")}
      >
          <Ionicons name="timer-outline" size={35} color="green" />
        <Text style={styles.buttonText}>View Service History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMenuNavigation("LocateRepairCenters")}
      >
          <Ionicons name="location-outline" size={35} color="green" />
        <Text style={styles.buttonText}>Locate Repair Centers</Text>
      </TouchableOpacity>
    </View>
  );
}
function ProfileScreen({
  repairCenterProfile,
  repairCenterSellerProfile,
  handleButtonPress,
}) {
  const handleLogout = () =>{
    navigation.navigate('Login');
  }
  return (
    <View style={styles.profileContainer}>
      <Text style={{paddingBottom:50,fontWeight:"medium",
    fontSize:16,}}>Switch Back to your Profile</Text>
      <View style={styles.buttonRow}>
        {repairCenterProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() => handleButtonPress ('switchToRepairCenterProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Repair Center</Text>
          </TouchableOpacity>}
        {repairCenterSellerProfile &&
          <TouchableOpacity
            style={styles.switchprofilebutton}
            onPress={() =>
              handleButtonPress ('switchToRepairCenterSellerProfile')}
          >
            <Text style={styles.buttonProfileText}>Switch to Seller Profile</Text>
          </TouchableOpacity>}
          <TouchableOpacity
        style={styles.switchprofileLogbutton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonProfileText}>Log Out</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

// function LogoutScreen ({ navigation }) {
//   const handleLogout = () =>{
//     navigation.navigate('Login');
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.switchprofilebutton}
//         onPress={handleLogout}
//       >
//         <Text style={styles.buttonText}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
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
  // image: {
  //   height:'43%',
  //   flex:1,
  //   justifyContent: 'center',
  // },
  // overlay: {
  //   marginTop: 3,
  //   alignItems: "center",
  // },
  // purpleOverlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'rgba(85,107,47,0.85)', // Purple transparent background
  // },
  // menuIntroContainer:{
  //   justifyContent: 'left',
  //   paddingLeft:40,
  // },
  // menuGridContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f8f8ff',
  //   borderTopRightRadius: 65,
  //   borderTopLeftRadius: 65,
  //   paddingBottom: 50,
  //   marginTop:80,
  //   paddingTop:60,
  // },

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
height:300,
width:"60%",


  },
  buttonProfileText:{
    color:'white',
    fontWeight:"medium",
    fontSize:16,

  },

  switchprofilebutton: {
    flex: 1, // Add this line
    flexDirection: 'row',
    backgroundColor: '#808000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 10,
    marginBottom:20,

  },
  switchprofileLogbutton:{
    backgroundColor:"#96a53c",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 10,
    marginTop:10,

  },
});
export default CustomerDashboard;
