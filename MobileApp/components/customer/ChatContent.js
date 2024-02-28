import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatContent = () => {
  return (
    <View style={styles.container}>
        <Text>hello</Text>
    </View>
  )
};
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
  });

export default ChatContent;
