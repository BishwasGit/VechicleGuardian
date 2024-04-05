import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {TextInput, Checkbox} from 'react-native-paper';
import {View,Title,Text,Image,Dimensions,StyleSheet, TouchableOpacity} from 'react-native';

const Notification = () => {

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={25}
          color="#808000"
          style={styles.closeIcon}
        />
         <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', textAlign : 'left', }}> Book an Appointment</Text>
        </View>

     <View style={styles.formContainer}>
     <Ionicons
          name="cog"
          size={66}
          color="#c0c0c0"
          style={styles.closeIcon}
        />

     <TextInput
          style={styles.textinput}
          placeholder="Vehicle Number"
          left={<TextInput.Icon icon="tag-outline" color='gray' />}
          underlineColor="transparent"

        />
          <TextInput
          style={styles.textinput}
          placeholder="Vehicle Number"
          left={<TextInput.Icon icon="tag-outline" color='gray' />}
          underlineColor="transparent"
        />
          <TextInput
          style={styles.textinput}
          placeholder="Vehicle Number"
          left={<TextInput.Icon icon="tag-outline" color='gray' />}
          underlineColor="transparent"
        />
     </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingTop: "15%",
    padding: 30,

    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-b',
  },
  formContainer:{
    alignItems: 'center',
  },
  closeIcon: {
    paddingRight:30,
    marginBottom:15,
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
  textinput: {
    height: 55,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '80%',
    paddingLeft: 30,
    marginTop: 10,
    borderRadius:20,
    backgroundColor:"white",
    elevation:2,
  },

});

export default Notification;
