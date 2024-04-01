import React from 'react';
import {TextInput, Checkbox} from 'react-native-paper';
import {View,Title,Text,Image,Dimensions,StyleSheet, TouchableOpacity} from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>

        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'black', textAlign : 'left', }}>Appointment</Text>
        </View>

     <View style={styles.formContainer}>
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
    paddingTop: "13%",
    padding: 20,
  },
  formContainer:{
    alignItems: 'center',
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
