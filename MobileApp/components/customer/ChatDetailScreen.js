// ChatDetailScreen.js
import React from 'react';
import { View, Text, Image,StyleSheet, } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "react-native-paper";

const ChatDetailScreen = ({ route }) => {
  const { name, photo } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View  style={styles.topContainer} >
      <Ionicons onPress={() => {
            navigation.goBack();
          }}
          name="arrow-back-outline" size={25} color="white" />
      <Image
        source={{ uri: photo }}
        style={{  marginLeft:"4%",width: 45,height: 45,borderRadius:50,}}
      />
      <Text style={{ marginLeft:"3%",fontSize:20,color:"white"}}>{` ${name}`}</Text>
      <Ionicons onPress={() => {
            navigation.goBack();
          }}
          style={{ marginLeft:"30%",}}
          name="call-outline" size={24} color="white" />
      </View>

      <View style={styles.bodyContainer}>

      </View>

      <View style={styles.bottomContainer}>
      <TextInput
            placeholder="Type your message"
            placeholderTextColor="#bfc1c2"
            style={styles.textinput}
          />

      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
      flex:1,
      alignItems:'center',
      backgroundColor:"#e5e4e2",
  },
  topContainer:{
    paddingTop:"12%",
    backgroundColor:"gray",
    alignItems:'center',
    width:"100%",
    padding:20,
    flexDirection: 'row',
  },
  bottomContainer:{
    flex:1,
    position:"absolute",
    bottom:0,
    width:"100%",
  },
  textinput: {
    height:60,
    backgroundColor: "white",
    width: "100%",
    paddingLeft:30,

  },
});
export default ChatDetailScreen;
