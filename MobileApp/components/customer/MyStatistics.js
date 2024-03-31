import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';
import React, {useState, useEffect} from 'react';
import {View,Text,Image,Dimensions,StyleSheet, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Button} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Notification from './Notification';

const screenWidth=Dimensions.get('window').width;

const MyStatistics=() => {
  const navigation = useNavigation();
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };
  const handleAppointmentPress = () => {
    navigation.navigate('AppointmentScreen');
  };

  const pieChartData=[
    {
      name: 'Expenses',
      population: 21500,
      color: '#d4af37',
      legendFontColor: 'black',
      legendFontSize: 13,
    },
    {
      name: 'Income',
      population: 38000,
      color: '#808000',
      legendFontColor: 'black',
      legendFontSize: 13,
    },
  ];

  const chartConfig={
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity=1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text  style={{marginLeft: 2,marginBottom: 3, fontSize : 24, fontWeight:"bold"}} >Hi, Customer</Text>
        <Text  style={{marginLeft: 2,marginBottom: 15, fontSize : 14}} >Lets explore nearby services.</Text>
        <View style={styles.line} />
        <PieChart
          data={pieChartData}
          width={screenWidth}
          height={170}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-30"
          absolute
          style={styles.chart}
        />
      </View>
      <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.bell}
      onPress={handleNotificationPress}
      >
        <Ionicons name="notifications" size={20
        } color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bell}
      onPress={handleAppointmentPress}
      >
        <Ionicons name="book" size={20
        } color="white" />
      </TouchableOpacity>

      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
    padding:10,
  },
  contentContainer: {
    flex: 1,
  },
  chart: {
    borderRadius: 16,

  },
  profileContainer: {
    marginBottom: 20,
  },
  bell:{
    backgroundColor: "#808000",
    padding:8,
    borderRadius:10,
  },
  line: {
    width:"110%",
    borderBottomColor: '#D4AF37',
    borderBottomWidth: 0.8,
    marginBottom: 20,
    marginTop:20,
  },
});

export default MyStatistics;
