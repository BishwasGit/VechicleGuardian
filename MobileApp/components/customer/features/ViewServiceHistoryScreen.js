import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from "@env";

const ViewServiceHistoryScreen = ({ route, navigation }) => {
  const { customer_id } = route.params;

  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicleData, setSelectedVehicleData] = useState(null);

  useEffect(() => {
    const fetchVehicleList = async () => {
      try {
        const response = await fetch(
          `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/vehicleDetails/${customer_id}`
        );
        const data = await response.json();
        setVehicleList(data);
      } catch (error) {
        console.error("Error fetching vehicle list:", error);
      }
    };

    fetchVehicleList();
  }, [customer_id]);

  const handleVehiclePress = async (vehicleId) => {
    try {
      const response = await fetch(
        `http://${REACT_APP_SERVER_IP}:${REACT_APP_SERVER_PORT}/api/getCustomerRepairHistory/${vehicleId}`
      );
      const data = await response.json();
      setSelectedVehicleData(data);
    } catch (error) {
      console.error("Error fetching repair history:", error);
    }
  };

  const renderVehicleItem = ({ item }) => (
    <Card
      style={{
        margin: 8,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Content>
        <Title>{`Vehicle ID: ${item.vehicleDetails_id}`}</Title>
        <Paragraph>{`Number: ${item.vehicle_number}`}</Paragraph>
        <Paragraph>{`Model: ${item.vehicle_model}`}</Paragraph>
        <Paragraph>{`Lot Number : ${item.vehicle_lot_number}`}</Paragraph>
      </Card.Content>
      <Button onPress={() => handleVehiclePress(item.vehicleDetails_id)}>
        View Repair History
      </Button>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Title
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          color: "#000000",
        }}
      >
        Vehicle List
      </Title>
      <FlatList
        data={vehicleList}
        keyExtractor={(item) => item.vehicleDetails_id.toString()}
        renderItem={renderVehicleItem}
        numColumns={2} // Set the number of columns based on your layout preference
      />
      {selectedVehicleData && (
        <ScrollView>
          <Title
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 16,
              color: "#000000",
            }}
          >
            Repair History
          </Title>
          {selectedVehicleData.map((repairItem) => (
            <Card key={repairItem.repairData_id} style={{ margin: 8 }}>
              <Card.Content>
                <Title style={{ fontWeight: "bold", marginBottom: 4 }}>{`Vehicle ID : ${repairItem.vehicleDetails_id}`}</Title>
                <Paragraph>{`Date: ${repairItem.repair_date}`}</Paragraph>
                <Paragraph>{`Total Cost: ${repairItem.total_cost} Rupees`}</Paragraph>
                <Paragraph>{`Total Time: ${repairItem.total_estimatedtime} Minutes`}</Paragraph>
                <Paragraph>{`Completed Time: ${repairItem.completed_time}`}</Paragraph>
                <Title style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Changes Made:
                </Title>
                {JSON.parse(repairItem.changes_made).map((change, index) => (
                  <Paragraph key={index}>{change}</Paragraph>
                ))}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ViewServiceHistoryScreen;
