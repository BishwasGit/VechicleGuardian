import React from 'react';
import {View,Text,Image,Dimensions,StyleSheet, TouchableOpacity} from 'react-native';

const Notification = () => {
  return (
    <View>
        <View style={styles.topContainer}>
        {/* <Ionicons name="list-outline" size={30} color="white" /> */}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'black', textAlign : 'left', marginVertical : 10 }}>Notifications</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    display : 'flex',
    paddingTop: "13%",
    width: "100%",
    padding: 20,
    flexDirection: 'row',
  },
  touchContainer: {
    flex: 1,
    padding:5,
    alignItems: 'center',
    width: "100%",
  },
  touchableContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#a9a9a9',
    width: "95%",
    backgroundColor: 'white',
    height: 100,
    borderRadius: 20,
    paddingLeft: 30,
    padding:5,
    elevation: 1,
  },
  texts: {
  marginLeft : 25,
  },
});

export default Notification;
