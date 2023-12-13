import React from 'react'
import { View, Text } from 'react-native'

const ViewServiceHistoryScreen = ({route,navigation}) => {
  const customer_id = route.params;
  // Check if customer_id is available
  if (!customer_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate('Vechicle Guardian Landing Page');
    return null; // Render nothing if redirecting
  }
  return (
    <View>
      <Text>This is List Locate Repair Centers Screen</Text>
    </View>
  )
}

export default ViewServiceHistoryScreen
