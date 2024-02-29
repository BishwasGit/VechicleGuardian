import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useEffect, useState } from "react";
import { View,Text,TouchableOpacity, StyleSheet } from "react-native";
import MapView, {Marker}from 'react-native-maps';
import * as Location from "expo-location"; // Import Location module from Expo
import {Ionicons} from '@expo/vector-icons';
import MyCarousel from "../MyCarousel";
import { useNavigation } from '@react-navigation/native';

const LocateRepairCentersScreen = ({ route }) => {
  const navigation = useNavigation();
  const [repairCenters, setRepairCenters] = useState([]);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 27.68899461302774,
    longitude: 85.28788243117607,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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

    // Fetch user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        initialRegion={initialLocation}
      >
        {repairCenters.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.map.split(",")[0]),
              longitude: parseFloat(item.map.split(",")[1]),
            }}
            title={item.repaircenter_fname}
          />
        ))}



      </MapView>

       <View style={styles.overlayContainer}>
        <TouchableOpacity
          style={{backgroundColor: '#a9a9a9',
          padding: 10,
          borderRadius: 50,
          marginLeft:'8%',
          elevation:6,}}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={23} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#a9a9a9',
          padding: 10,
          borderRadius: 50,
        marginLeft:'63%',
      elevation:6,}}
          onPress={() => {
          }}
        >
          <Ionicons name="search" size={23} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.overlayCarousel}>
      <MyCarousel repairCenters={repairCenters} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    position: "absolute",
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-between',
    top: 65,
  },
  overlayText: {
    color: 'white',
    marginTop: 5,
  },
  overlayCarousel:{
    top:550,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocateRepairCentersScreen;
