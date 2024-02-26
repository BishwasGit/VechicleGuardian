import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card} from "react-native-paper";

const MyCalendar = () => {
  const customTheme = {
    calendarBackground: '#D3D3D3', // Grey color
    dayTextColor: '#6B8E23', // Olive color
    todayTextColor: '#8B4513', // SaddleBrown color
    arrowColor: '#8B4513', // SaddleBrown color
    monthTextColor: '#6B8E23', // Olive color
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: 'bold',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',
  };
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
      <Text style={{fontSize: 35,fontWeight: 'bold',marginBottom: 5}}>
          Vehicle<Text style={{color: '#D4AF37'}}>G</Text>
        </Text>

        <Text style={{marginLeft: 2,marginBottom: 35}}>Good Morning,</Text>
        <Text  style={{marginLeft: 2,marginBottom: 35, fontSize : 16}} > Welcome to your repair center dashboard</Text>
        <View style={styles.line} />
        <Calendar
          theme={customTheme} 
        />
      </View>
      {/* <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/f6/10/fe/f610feb7dda0168bb968a8830fd16b9c.jpg',
          }}
          style={styles.profileImage}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    padding : 10,
  },
  calendarContainer: {
    flex: 1,
    marginTop : 20,
    marginHorizontal : 5,
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
});

export default MyCalendar;
