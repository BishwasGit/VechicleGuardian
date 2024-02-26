import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const MyList = () => {

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000); // Update the current date every second

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Run this effect only once when the component mounts

  const [vehicleType, setVehicleType] = useState('Due Date');
  const [data, setData] = useState([
    { id: 1, title: 'yamaha', description: 'change wheels', date: new Date('2022-03-01'), priority: 2 },
    { id: 2, title: 'honda', description: 'change wheels', date: new Date('2022-02-15'), priority: 4 },
    { id: 2, title: 'suzuki', description: 'wash car', date: new Date('2022-02-17'), priority: 3 },
    { id: 2, title: 'tesla', description: 'charge battery', date: new Date('2022-02-17'), priority: 1 },
    { id: 2, title: 'honda', description: 'change wheels', date: new Date('2022-02-15'), priority: 5},
    // Add more items with dates and priorities
  ]);

  const sortByDueDate = () => {
    const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
    setData(sortedData);
  };

  const sortByPriority = () => {
    const sortedData = [...data].sort((a, b) => a.priority - b.priority);
    setData(sortedData);
  };

  const handlePickerChange = (itemValue) => {
    setVehicleType(itemValue);
    if (itemValue === 'Due Date') {
      sortByDueDate();
    } else if (itemValue === 'Priority') {
      sortByPriority();
    }
  };

  const groupTasksByDate = () => {
    const groupedData = {};
    data.forEach((item) => {
      const dateKey = item.date.toDateString();
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }
      groupedData[dateKey].push(item);
    });
    return groupedData;
  };

  const renderGroupedTasks = () => {
    const groupedData = groupTasksByDate();

    return Object.entries(groupedData).map(([dateKey, tasks]) => (
      <View key={dateKey}>
        <Text style={styles.dateGroup}>{dateKey}</Text>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            title={task.title}
            description={task.description}
            style={styles.containerItem}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <List.Icon style={{ paddingRight: 10 }} color="#b78727" icon="eye" />
                <List.Icon color="#808000" icon="delete" />
              </View>
            )}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBar}>
      <Text style={{color:"white"}}>{currentDate.toLocaleDateString()}</Text>
        <Text style={{ fontSize: 17, color: 'white' }}>Today Tasks</Text>

        <Picker
          style={styles.containerIcon}
          selectedValue={vehicleType}
          onValueChange={handlePickerChange}
        >
          <Picker.Item label="Due Date" value="Due Date" />
          <Picker.Item label="Priority" value="Priority" />
        </Picker>
      </View>
      <View style={styles.containerList}>
        <List.Section>{renderGroupedTasks()}</List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  containerBar: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#808000',
  },
  containerIcon: {
    top: 30,
    color: 'white',
    backgroundColor: '#d4af37',
  },
  containerList: {
    paddingTop: 40,
    padding: 20,
  },
  containerItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    margin: 6,
  },
  dateGroup: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MyList;
