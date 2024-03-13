import {View, Text, StyleSheet, ScrollView,TouchableOpacity } from "react-native";
import MyCarousel from "./MyCarousel";
import MyStatistics from "./MyStatistics";
import MapView, {Marker}from 'react-native-maps';
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';


const DashboardContent = ({customerId}) => {
  const [repairCenters, setRepairCenters] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchRepairCenters = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getRepairCentersList`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRepairCenters(data.repairCenters);
      } catch (error) {
        console.error("Error fetching repair centers:", error);
        // Handle errors as needed
      }
    };

    fetchRepairCenters();
  }, []);
  // Move this part inside the useEffect hook
  const coordinateData = repairCenters.map(repairCenter => ({
    latitude: parseFloat(repairCenter.map.split(",")[0]),
    longitude: parseFloat(repairCenter.map.split(",")[1]),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: repairCenter.repaircenter_fname,
  }));

  const handleMenuNavigation = (screen) => {
    navigation.navigate(screen, { customer_id: customer_id }); // Pass customer_id as a parameter object
  };

  return (
    <ScrollView
     style={styles.scrollView}>
      <View style={styles.container}>
        {/* Pie Chart Section */}
        <View style={styles.statisticsContainer}>
        <MyStatistics/>
            </View>

        <View>
        <Text style={{ fontSize: 14, marginBottom: 10,marginLeft: 15,fontWeight:'bold' }}>Services</Text>
        <ScrollView
           horizontal
           contentContainerStyle={styles.scrollContainer}
           showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMenuNavigation("AddVehicle")}
          >
            <Ionicons name="archive" size={25} color="#808000" />
            <Text style={styles.buttonText}>Add Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMenuNavigation("ListVehicle")}
          >
            <Ionicons name="list" size={25} color="#808000" />
            <Text style={styles.buttonText}>List Vehicle Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMenuNavigation("ViewServiceHistory")}
          >
            <Ionicons name="timer-outline" size={25} color="#808000" />
            <Text style={styles.buttonText}>View Service History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleMenuNavigation("LocateRepairCenters")}
          >
            <Ionicons name="location" size={25} color="#808000" />
            <Text style={styles.buttonText}>Locate Repair Centers</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
        <Text style={{ fontSize: 14, marginBottom: 15,marginLeft: 15,fontWeight:'bold' }}>Nearby Repair Centers</Text>
          <MyCarousel />
        </View>

        <Text style={{ fontSize: 14, marginBottom: 15,marginLeft: 15,fontWeight:'bold' }}>Search NearBy Centers</Text>
         <View style={styles.mapCounter}>
         <MapView
          style={styles.map}
          initialRegion={{
            latitude :  27.68899461302774,
            longitude : 85.28788243117607,
            latitudeDelta: 0.01, // Adjust this value for zoom level
            longitudeDelta: 0.01, // Adjust this value for zoom level
          }}
        >
       {coordinateData.map((coordinates,index)=>(
        <Marker key={index} coordinate={coordinates} title={coordinates.repaircenter_fname}/>
       ))}
        </MapView>
         </View>

        <View style={styles.carouselContainer}>
         <Text style={{ fontSize: 14, marginBottom: 15,marginLeft: 15,fontWeight:'bold' }}>Nearby Best Offers</Text>
          <MyCarousel />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop:20,

  },
  container: {

  },
  overlay: {
    marginTop: 50,
    alignItems: "center",
  },
  statisticsContainer:{
    marginBottom: 30,
    padding : 15,
  },
  scrollContainer: {
    width: '120%', // Set the width to 150%
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  button: {
    width:"20%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin:10,
    marginBottom: 55,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    paddingTop:10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 50,
  },
  carouselItem: {
    backgroundColor: "floralwhite",
    borderRadius: 8,
    height: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  carouselText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 30,
    padding : 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph:{
    marginTop : 5,
  },
  mapCounter:{
    borderWidth:0.1,
    elevation:2,
    marginLeft:"2.5%",
    width: '95%',
    height: 180,
    marginBottom : 60,
  },
  map: {
    width: '100%',
    height: 180,
    borderWidth:0.1,
    elevation:2,
  },

});
export default DashboardContent;
