import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Button, Title } from "react-native-paper";

const RepairProcessScreen = ({ route, navigation }) => {
  const workerId = route.params;
  const [vehicleList, setVehicleList] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completionTime, setcompletionTime] = useState(false);
  const [changes, setChanges] = useState([
    { id: 1, changesMade: "", cost: "", estimatedTime: "" },
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

  const showDateTimePicker = () => {
    if (Platform.OS === "ios") {
      setShowDatePicker(true);
    }
  };

  const hideDateTimePicker = () => {
    if (Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
    hideDateTimePicker();
  };

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
      <TouchableOpacity disabled style={styles.inputBox} activeOpacity={1}>
        <Text>In Minutes</Text>
      </TouchableOpacity>
    </View>
  );
  const getCurrentDateTime = () => {
    const currentTime = new Date();
  
    const day = currentTime.toLocaleString("default", { weekday: "long" });
    const date = currentTime.toLocaleDateString();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const time = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    const twelveHourFormat = hours % 12 || 12; // Convert to 12-hour format
    const formattedHours = twelveHourFormat.toString().padStart(2, "0");
  
    return `${day}, ${date} ${formattedHours}:${minutes} ${time}`;
  };
  const handleSubmit = () => {
    const totalCost = changes.reduce(
      (total, { cost }) => total + (parseFloat(cost) || 0),
      0
    );
    const changesMade = changes
      .map(({ changesMade }) => changesMade)
      .filter(Boolean);
    // Combine all input data for submission
    // Set the time zone to Nepal (UTC+5:45)
    const selectedDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
    });

    const completionTime = getCurrentDateTime(); 

    const {workerId }= route.params;
    const formData = {
      repaircenter_workers_id: workerId,
      vehicleId: selectedVehicleId,
      date: selectedDate,
      totalCost,
      completion_time : completionTime,
      changesMade: JSON.stringify(changesMade),
    };
    // Adjust the date to Nepal Time (UTC+5:45)

    console.log(formData);

    // Send formData to the server
    // Example: You can use fetch or your preferred method to send data to the server
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
        // Handle server response if needed
        console.log("Server Response:", data);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Changes Made</Text>
        {vehicleList && (
          <>
            <Picker
              selectedValue={selectedVehicleId}
              onValueChange={(itemValue) => {
                console.log("Selected Vehicle ID:", itemValue);
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
            {/* Date and Time Input */}
            <TouchableOpacity
              onPress={showDateTimePicker}
              style={styles.inputBox}
              activeOpacity={1}
            >
              <Text>{selectedDate.toLocaleString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="datetime"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                disabled={Platform.OS === "android"}
              />
            )}
            <TextInput
              style={styles.input}
              label="Completion Time"
              value={getCurrentDateTime()}
              editable={false} // Prevent editing of the TextInput
            />
            {/* Changes Form */}
            <Text style={styles.heading}>Changes Made</Text>

            {/* Repeater for Changes Input */}
            <FlatList
              style={styles.textinput}
              data={changes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderChangesInput}
            />

            {/* Add More Button */}
            <Button
              style={{
                padding: 5,
                alignItems: "center",

                backgroundColor: "#0d5563",
              }}
              labelStyle={{ color: "white" }}
              onPress={handleAddMore}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                Add More Changes
              </Text>
            </Button>

            {/* Display Total Rs and Estimated Time */}
            <View style={styles.totalContainer}>
              <Text>Total Rs: {totalRs}</Text>
              <Text>Total Completion Time: {getCurrentDateTime()}</Text>
            </View>
          </>
        )}
        <Button
          style={{
            padding: 5,
            alignItems: "center",
            backgroundColor: "#0d5563",
          }}
          labelStyle={{ color: "white" }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
            Submit Repair Details
          </Text>
        </Button>
      </View>
    </ScrollView>
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
    padding: 5,
    color: "white",
    alignItems: "center",
    marginTop: "13%",
    backgroundColor: "#c1121f",
  },
});

export default RepairProcessScreen;
