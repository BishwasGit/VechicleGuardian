import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from "react-native";
import Toast from 'react-native-root-toast';
import { Snackbar, Button } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import LoadingScreen from "../../LoadingScreen"

const RepairProcessScreen = ({ route, navigation }) => {
  const [vehicleList, setVehicleList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completionTime, setcompletionTime] = useState(false);
  const [changes, setChanges] = useState([
    { id: 1, changesMade: "", cost: "" },
  ]);
  const [totalRs, setTotalRs] = useState(0);
  const [totalEstimatedTime, setTotalEstimatedTime] = useState(0);
  useEffect(() => {
    const fetchVehicleList = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/fetchVehicleList`
        );
        const data = await response.json();
        setVehicleList(data);
      } catch (error) {
        console.error("Error fetching vehicle list:", error);
      }
    };

    fetchVehicleList();
  }, []);

  const handleChangesInputChange = (id, key, value) => {
    const updatedChanges = changes.map((change) =>
      change.id === id ? { ...change, [key]: value } : change
    );
    setChanges(updatedChanges);
    calculateTotals(updatedChanges);
  };

  const calculateTotals = (changes) => {
    let totalCost = 0;
    let totalEstimatedTime = 0;

    changes.forEach((change) => {
      const cost = parseFloat(change.cost) || 0;
      const estimatedTime = parseFloat(change.estimatedTime) || 0;

      totalCost += cost;
      totalEstimatedTime += estimatedTime;
    });

    setTotalRs(totalCost);
    setTotalEstimatedTime(totalEstimatedTime);
  };

  const handleAddMore = () => {
    setChanges([
      ...changes,
      { id: changes.length + 1, changesMade: "", cost: "", estimatedTime: "" },
    ]);
  };

  const renderChangesInput = ({ item }) => (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        placeholder="Changes Made"
        value={item.changesMade}
        onChangeText={(text) =>
          handleChangesInputChange(item.id, "changesMade", text)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Rs"
        value={item.cost}
        onChangeText={(text) => handleChangesInputChange(item.id, "cost", text)}
      />
    </View>
  );
  const getCurrentDateTime = () => {
    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };
  
  const handleSubmit = () => {
    setLoading(true);
    const totalCost = changes.reduce(
      (total, { cost }) => total + (parseFloat(cost) || 0),
      0
    );
      const changesMade = changes
    .map(({ changesMade, cost }) => ({ changesMade, cost }))
    .filter(({ changesMade, cost }) => changesMade.trim() !== "" && cost.trim() !== "");

    const repair_date = getCurrentDateTime();
    const completion_time = getCurrentDateTime();
    const workerId = route.params;
    const formData = {
      repaircenter_workers_id: workerId.repaircenter_workers_id,
      vehicleId: selectedVehicleId,
      date: repair_date,
      totalCost,
      completion_time: completion_time,
      changesMade: JSON.stringify(changesMade),
    };
  
    fetch(
      `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/startRepairData`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        Toast.show((data.message), {
          duration: Toast.durations.LONG,
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        Toast.show('Error submitting form data:', {
          duration: Toast.durations.LONG,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when the request is completed
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Changes Made</Text>
        {vehicleList && (
          <>
            <Picker
              selectedValue={selectedVehicleId}
              onValueChange={(itemValue) => {
                setSelectedVehicleId(itemValue);
              }}
              style={styles.pickerContain}
            >
              {vehicleList.map((vehicle) => (
                <Picker.Item
                  style={styles.contain}
                  key={vehicle.vehicleDetails_id}
                  label={vehicle.vehicle_number}
                  value={vehicle.vehicleDetails_id}
                />
              ))}
            </Picker>
              <Text>Date and Time : {selectedDate.toLocaleString()}</Text>
            <Text style={styles.heading}>Changes Made</Text>

            <FlatList
              data={changes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderChangesInput}
            />

            <Button
              style={styles.addButton}
              onPress={handleAddMore}
            >
              <Text style={styles.buttonText}>
                Add More Changes
              </Text>
            </Button>

            <View style={styles.totalContainer}>
              <Text>Total Rs: {totalRs}</Text>
              <Text>Total Completion Time: {getCurrentDateTime()}</Text>
            </View>
          </>
        )}
     {loading ? (
        <LoadingScreen />
      ) : (
        <Button
          style={styles.addButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            Submit Repair Details
          </Text>
        </Button>
      )}
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f1e9",
  },
  card: {
    padding: 35,
    gap: 15,
    marginBottom: 55,
  },
  pickerContain: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 60,
    color: "white",
    backgroundColor: "#0d5563",
  },
  contain: {
    padding: 40,
    color: "black",
  },
  heading: {
    marginTop: "10%",
    alignItems: "left",
    color: "#c1121f",
    fontWeight: "bold",
    fontSize: 22,
  },
  inputGroup: {
    flexDirection: "column",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#edf2f4",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  inputBox: {
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  totalContainer: {
    marginTop: 20,
  },
  addButton: {
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RepairProcessScreen;
