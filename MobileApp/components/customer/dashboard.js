import React, { useState, useEffect } from "react";
import { ImageBackground,View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { Button,Title } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { Appbar } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';

const Tab = createBottomTabNavigator();
const CustomerDashboard = ({ route }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [repairCenterProfile, setRepairCenterProfile] = useState(null);
  const [repairCenterSellerProfile, setRepairCenterSellerProfile] = useState(null);
  const navigation = useNavigation();

 
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const { customer_id } = route.params;
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/customerDetails/${customer_id}`
        );
        const data = await response.json();

        setCustomerDetails(data.customerDetails);

        const repairCenterCheckResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterUsername/${data.customerDetails[0].username}`
        );
        const repairCenterCheckData = await repairCenterCheckResponse.json();

        if (repairCenterCheckData.exists) {
          setRepairCenterProfile({
            repaircenter_id: repairCenterCheckData.repaircenter_id,
          });
        }

        console.log(repairCenterProfile);
        const repairCenterSellerCheckResponse = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/checkRepairCenterSellerUsername/${data.customerDetails[0].username}`
        );
        const repairCenterSellerCheckData = await repairCenterSellerCheckResponse.json();

        if (repairCenterSellerCheckData.exists) {
          setRepairCenterSellerProfile({
            repair_parts_seller_users_id: repairCenterSellerCheckData.repair_parts_seller_users_id,
          });
        }

      } catch (error) {
        // console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [route.params.customer_id]);

  const handleButtonPress = (buttonType) => {
    switch (buttonType) {
      case "addVehicle":
        navigation.navigate("AddVehicle", {
          customer_id: route.params.customer_id,
        });
        break;

      case "listVehicleDetails":
        navigation.navigate("ListVehicle", {
          customer_id: route.params.customer_id,
        });
        break;

      case "viewServiceHistory":
        navigation.navigate("ViewServiceHistory", {
          customer_id: route.params.customer_id,
        });
        break;

      case "locateRepairCenters":
        navigation.navigate("LocateRepairCenters", {
          customer_id: route.params.customer_id,
        });
        break;

      case "switchToRepairCenterProfile":
        navigation.navigate("RepairCenterDashboard", {
          repaircenter_id: repairCenterProfile.repaircenter_id,
        });
        break;
      case "switchToRepairCenterSellerProfile":
        navigation.navigate("RepairCenterPartsSeller", {
          repaircenter_id: repairCenterSellerProfile.repair_parts_seller_users_id,
        });
        break;

      default:
        console.log(`Button Pressed : ${buttonType}`);
    }
  };
  const Login= () => {
    navigation.navigate("Login", { userType: "Customer" });
  };




  return (
    <ScrollView contentContainerStyle={styles.container}>      
      <Tab.Navigator
      
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
        style={styles.navigation}
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            const iconColor = focused ? "red" : color;
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color: iconColor });
            }

            return null;
          }}
          
        />
      )}
    >
 
 <Tab.Screen
  name="Home"
  style={styles.navigationTitle}
  component={() => <HomeScreen customerDetails={customerDetails} />}
  options={{
    tabBarIcon: ({ color, size }) => {
      return <Icon name="home" size={30} color='white' />;
    },
  }}
>
 
</Tab.Screen>


      <Tab.Screen
        name="Settings"
        style={styles.navigationTitle}
        component= {() => 
          <SettingsScreen
            repairCenterProfile={repairCenterProfile}
            repairCenterSellerProfile={repairCenterSellerProfile}
            handleButtonPress={handleButtonPress}
          />
        }
        options={{
         
          tabBarIcon: ({ color, size }) => {
            return <Icon name="apps"  size={30} color='white' />;
          },
        }}
        >  
        </Tab.Screen>

       <Tab.Screen
        name="Account"
        style={styles.navigationTitle}
        component={() => <ProfileScreen customerDetails={customerDetails} />}
        options={{
         
          tabBarIcon: ({ color, size }) => {
            return <Icon name="person"  size={30} color='white' />;
          },
        }}
        > 
        </Tab.Screen>
    </Tab.Navigator>
    </ScrollView>
    
  );
};

const image = {uri: 'https://i.pinimg.com/originals/2a/7c/be/2a7cbe76cee6e04e2c9b577c412d7ca1.jpg'};


function HomeScreen({ customerDetails }) {
  return (
    <View style={styles.containerHome}>
        
      <ImageBackground source={image} resizeMode="cover" style={styles.image} >
        
      <View style={styles.purpleOverlay}>
          {/* Purple transparent background */}
        </View>

       <View style={styles.containerHomeTwo}> 
        <View style={{ paddingTop:90, alignItems: "center", }}>
      
      <Title style={{ fontWeight:'bold', fontSize: 28,color:'white', }}>
       Get Best Servcies {"\n"}
        <Title style={{ fontWeight: "normal",paddingLeft:80, fontSize: 17,color:'white',alignItems: "center",  }}>
          Good Morning sdsjda sjdadj
        </Title>
      </Title>
   
  </View></View>

      <View style={styles.containerTwo}>
         <View style={styles.heading}>
        {customerDetails && (
          <Title style={styles.welcomeText}>
            Hi {customerDetails[0].username}!{"\n"}
            <Title style={{ fontWeight: "normal", fontSize: 17 }}>
              Good Morning
            </Title>
          </Title>
        )}
      </View>
      </View>
      </ImageBackground>
    </View>
  );
};



function SettingsScreen({ repairCenterProfile, repairCenterSellerProfile, handleButtonPress}) {
  return (
    <View style={styles.container}>
     <View style={styles.containerTwo}>
        <View style={styles.head}>
          <Title style={{ fontSize: 20, color: "#073b4c" }}>
            Welcome!{"\n"}
            <Title style={{ fontSize: 14, color: "#073b4c" }}>
              Let's get started with our services.
            </Title>
          </Title>
        </View>
        <View style={styles.gridContainer}>
          {repairCenterProfile && (
            <TouchableOpacity
              style={[styles.gridItem, styles.switchButton]}
              onPress={() => handleButtonPress("switchToRepairCenterProfile")}
            >
              <Icon name="build" size={30} color="#0d5563" />
              <Text style={styles.buttonText}>Switch to Repair Center Profile</Text>
            </TouchableOpacity>
          )}
          {repairCenterSellerProfile && (
            <TouchableOpacity
              style={[styles.gridItem, styles.switchButton]}
              onPress={() => handleButtonPress("switchToRepairCenterSellerProfile")}
            >
             
              <Text style={styles.buttonText}>Switch to Seller Profile</Text>
            </TouchableOpacity>
          )}
          {/* Other service buttons */}
        </View>
        
        <View style={styles.gridContainer}>
          <View style={styles.headTwo}>
            <Title
              style={{ fontSize: 18, fontWeight: "bold", color: "#073b4c" }}
            >
              Our Services :
            </Title>
          </View>
      
          <TouchableOpacity
          elevation={4}
            style={styles.gridItemActive}
            onPress={() => handleButtonPress("addVehicle")}
          >
            
            
            <Icon name="directions-car" size={30} color="white" />
            <Text style={{ color: "white", padding: 10 }}>Add Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("listVehicleDetails")}
          >
            <Icon name="format-list-bulleted" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>List Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("viewServiceHistory")}
          >
            <Icon name="history" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>View Service History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleButtonPress("locateRepairCenters")}
          >
            <Icon name="location-pin" size={30} color="#0d5563" />
            <Text style={styles.buttonText}>Locate Repair Centers</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    </View>
  );
}
function ProfileScreen({ customerDetails }) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {customerDetails && (
          <Title style={styles.welcomeText}>
            Hi {customerDetails[0].username}!{"\n"}
            <Title style={{ fontWeight: "normal", fontSize: 17 }}>
              Good Morning
            </Title>
          </Title>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  containerHome:{
    flexGrow: 1,
    backgroundColor:'white',
     
  },
  containerTwo: {
    flex: 1,
    paddingTop:50,
    marginTop: "17%",
    backgroundColor:'white',
    borderTopRightRadius:65,
    borderTopLeftRadius:65,
   
  },
  containerHomeTwo:{
    alignItems: "center",
  },
  image: {
    height:'60%',
    justifyContent: 'center',
  },
  purpleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(34, 51, 59,0.6)', // Purple transparent background
  },
  title:{
    
    alignSelf: "right",
  },
  navigation:{
    backgroundColor:'#354230',
    // borderTopRightRadius:20,
    // borderTopLeftRadius:20,
    width:'100%',
    height:65,
    paddingTop:3,
    alignItems: "center",
  },
  navigationTitle:{
    backgroundColor: "black",
  },
  heading: {
    paddingTop: 30,
    paddingLeft: 25,
    alignItems: "left",
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#e1ad21",
    marginVertical: 20,
    fontSize: 25,
    paddingBottom: -60,
  },
  head: {
    width: "90%",
    marginVertical: 10,
    padding: 20,
    borderColor: "#354230",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headTwo: {
    width: "90%",
    paddingLeft: 10,
    paddingBottom: 15,
  },
  gridItemActive: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#354230",
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gridContainer: {
    paddingVertical: 5,
    paddingHorizontal : 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "45%",
    marginBottom: 40,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    borderColor: "#c1121f",
    borderWidth: 2,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    padding: 10,
  },
  switchButton:{
    marginHorizontal : 5
  }
});

export default CustomerDashboard;

