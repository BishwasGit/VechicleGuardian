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
        <Text style={{ fontSize: 14,marginLeft: 15,fontWeight:'bold' }}>Services</Text>
        <View style={styles.scrollContainer}>
      <View style={styles.gridContainer}>

        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => handleMenuNavigation("Appointment")}
        >
          <Ionicons name="calendar-outline" size={30} color="white" />
          <Text style={{ paddingTop:10,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                          }}>
                            Appointment</Text>
        </TouchableOpacity>
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
      </View>
    </View>
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
    marginBottom: 20,
    padding : 15,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  gridContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonMain:{
    width: '48%', // Adjust this value according to your preference
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#808000',
    elevation: 2, // Android
  },
  button: {
    width: '48%', // Adjust this value according to your preference
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  buttonText: {
    paddingTop:10,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#253529',
    textAlign: 'center',
  },
  carouselContainer: {
    marginBottom: 50,
    marginTop:20,
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
