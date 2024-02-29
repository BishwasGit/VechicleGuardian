import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth=Dimensions.get('window').width;

const MyStatistics=() => {
  // Data for Pie Chart
  const pieChartData=[
    {
      name: 'Expenses',
      population: 21500,
      color: '#d4af37',
      legendFontColor: 'gray',
      legendFontSize: 13,
    },
    {
      name: 'Income',
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
        <Text style={{fontSize: 35,fontWeight: 'bold',marginBottom: 5}}>
          Vehicle<Text style={{color: '#D4AF37'}}>G</Text>
        </Text>

        <Text style={{marginLeft: 2,marginBottom: 5}}>Good Morning,</Text>
        <Text  style={{marginLeft: 2,marginBottom: 10, fontSize : 15}} >Welcome to Customer dashboard</Text>
        <View style={styles.line} />
        <Text style={{fontSize: 15,fontWeight: 'bold',marginBottom: 10}}>
          Income and Expenses Statistics
        </Text>
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
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/f6/10/fe/f610feb7dda0168bb968a8830fd16b9c.jpg',
          }} // Replace with the actual image source
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
  },
  contentContainer: {
    flex: 1,
    padding : 10,

  },
  profileContainer: {
    paddingTop: 20,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  line: {
    width: '117%',
    borderBottomColor: '#D4AF37',
    borderBottomWidth: 0.8,
    marginBottom: 35,
  },
});

export default MyStatistics;
