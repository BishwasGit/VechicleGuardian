import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth=Dimensions.get('window').width;

const MyStatistics=() => {
  // Data for Pie Chart
  const pieChartData=[
    {
      name: 'Completed',
      population: 21500,
      color: '#d4af37',
      legendFontColor: 'gray',
      legendFontSize: 13,
    },
    {
      name: 'Pending',
      population: 38000,
      color: '#808000',
      legendFontColor: 'gray',
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
        <PieChart
          data={pieChartData}
          width={screenWidth}
          height={140}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-40"
          absolute
        />
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    paddingTop:20,
    paddingBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
});

export default MyStatistics;
