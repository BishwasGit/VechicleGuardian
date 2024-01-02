import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import { encode as base64Encode, decode as base64Decode } from "base-64";
import { WebView } from "react-native-webview";

const LocateRepairCentersScreen = ({ route, navigation }) => {
  const customer_id = route.params;

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

  // Check if customer_id is available
  if (!customer_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate("Vechicle Guardian Landing Page");
    return null; // Render nothing if redirecting
  }

  const renderMap = (repairCenters) => {
    const latitude = parseFloat(repairCenters.map.split(",")[0]);
    const longitude = parseFloat(repairCenters.map.split(",")[1]);
    const mapUrl = `https://www.google.com/maps/embed/v1/view?center=${latitude},${longitude}&zoom=15`;
    return (
      <>
        <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />
      </>
    );
  };
  const renderVacancy = (repairCenters) => {
    if (repairCenters.vacancy) {
      return (
        <>
          <Text style={styles.itemText}>
            {JSON.parse(repairCenters.vacancy).position}
          </Text>
          <Text style={styles.itemText}>
            {JSON.parse(repairCenters.vacancy).noOfPerson}
          </Text>
          <Text style={styles.itemText}>
            {JSON.parse(repairCenters.vacancy).salary}
          </Text>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.firstTitle}> Repair Center Lists</Text>
      <FlatList
        data={repairCenters}
        keyExtractor={(item) => item.repaircenters_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.address}</Text>
            {/* {renderMap(item)} */}
            <Text style={styles.itemText}>{item.contact}</Text>
            {renderVacancy(item)}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  firstTitle: {
    marginTop: "10%",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 25,
  },
  itemContainer: {
    marginTop: "10%",
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
});

export default LocateRepairCentersScreen;
