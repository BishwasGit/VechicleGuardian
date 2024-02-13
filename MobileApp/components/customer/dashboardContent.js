import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, ScrollView } from "react-native";
import MyCarousel from "./MyCarousel";
import MyStatistics from "./MyStatistics";
import MapView, {Marker}from 'react-native-maps';
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";


const DashboardContent = () => {
  const [repairCenters, setRepairCenters] = useState([]);

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

  console.log(coordinateData);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Pie Chart Section */}
        <View style={styles.statisticsContainer}>
        <MyStatistics/>
            </View>

        {/* Carousel Section */}
        <View style={styles.carouselContainer}>
        <Text style={{ fontSize: 14, marginBottom: 15,marginLeft: 15, }}>Nearby Repair Centers</Text>
          <MyCarousel />
        </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop:40,

  },
  container: {
    padding: 10,
  },
  overlay: {
    marginTop: 50,
    alignItems: "center",
  },
  statisticsContainer:{
    marginBottom: 30,
    padding : 15,
  },
  carouselContainer: {
    marginBottom: 20,
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
  map: {
    width: '100%',
    height: 200,
    marginBottom : 50,
  },

});
export default DashboardContent;
