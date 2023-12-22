import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const RepairProcessScreen = ({ route, navigation }) => {
  const repaircenter_id = route.params;
  const [vehicleList, setVehicleList] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
      <TextInput
        style={styles.input}
        placeholder="Estimated Time"
        value={item.estimatedTime}
        onChangeText={(text) =>
          handleChangesInputChange(item.id, "estimatedTime", text)
        }
      />
      <TouchableOpacity disabled style={styles.inputBox} activeOpacity={1}>
        <Text>In Minutes</Text>
      </TouchableOpacity>
    </View>
  );
  const handleSubmit = () => {
    const totalCost = changes.reduce(
      (total, { cost }) => total + (parseFloat(cost) || 0),
      0
    );
    const totalEstimatedTime = changes.reduce(
      (total, { estimatedTime }) => total + (parseFloat(estimatedTime) || 0),
      0
    );
    const changesMade = changes
      .map(({ changesMade }) => changesMade)
      .filter(Boolean);
    // Combine all input data for submission
    // Set the time zone to Nepal (UTC+5:45)
    const selectedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });

    const formData = {
      vehicleId: selectedVehicleId,
      date: selectedDate,
      totalCost,
      totalEstimatedTime,
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
    <View>
      {vehicleList && (
        <>
          <Picker
            selectedValue={selectedVehicleId}
            onValueChange={(itemValue) => {
              console.log("Selected Vehicle ID:", itemValue);
              setSelectedVehicleId(itemValue);
            }}
          >
            {vehicleList.map((vehicle) => (
              <Picker.Item
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

          {/* Changes Form */}
          <Text style={styles.heading}>Changes Made</Text>

          {/* Repeater for Changes Input */}
          <FlatList
            data={changes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderChangesInput}
          />

          {/* Add More Button */}
          <Button title="Add More" onPress={handleAddMore} />

          {/* Display Total Rs and Estimated Time */}
          <View style={styles.totalContainer}>
            <Text>Total Rs: {totalRs}</Text>
            <Text>Total Estimated Time: {totalEstimatedTime} minutes</Text>
          </View>
        </>
      )}
      <Button title="Start Repair" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  totalContainer: {
    marginTop: 20,
  },
});

export default RepairProcessScreen;
