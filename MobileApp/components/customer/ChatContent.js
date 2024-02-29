import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { Avatar } from "react-native-paper";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatContent = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    const params = {
      name: 'Rebica William',
      photo: 'https://i.pinimg.com/originals/36/59/06/3659062e276f925abe678a81295854fa.jpg',
    };
    navigation.navigate('ChatDetail', params);
  };

  return (
    <View style={styles.container}>
       <View style={styles.topContainer}>
       <Ionicons name="list-outline" size={30} color="white" />
       <Text style={{fontSize:22,fontWeight:"bold",color:'white',marginLeft:"35%",}}>Chat</Text>
       </View>

       <View style={styles.touchContainer}>
        <TouchableOpacity
        style={styles.touchableContainer}
        onPress={handlePress}
        >
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/36/59/06/3659062e276f925abe678a81295854fa.jpg',}}
          style={{ width: 60,height: 60,borderRadius:50,}}
        />
         <View style={styles.texts}>
         <Text style={{fontSize:17,}}>Rebica William</Text>
          <Text style={{color:"gray"}}>Hi, i would like to talk to u</Text>
         </View>
         <View style={styles.date}><Text>16:00</Text></View>
        </TouchableOpacity>
       </View>
    </View>
  )
};
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    topContainer:{
      paddingTop:"12%",
      backgroundColor:"gray",
      alignItems:'center',
      width:"100%",
      padding:20,
      flexDirection: 'row',
    },
    touchContainer:{
      flex:1,
      paddingTop:20,
      alignItems:'center',
      width:"100%",

    },
    touchableContainer:{
      flexDirection: 'row',
      borderWidth:0.5,
      borderColor:'#a9a9a9',
      width:"95%",
      backgroundColor:'white',
      height:80,
      borderRadius:10,
      padding:10,
      elevation:1,
    },
    texts:{
      marginTop:"2.5%",
      marginLeft:"5%",
    },
    date:{
      marginTop:"4%",
      marginLeft:"23%",
    },
  });

export default ChatContent;
