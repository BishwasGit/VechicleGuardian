import React from 'react'
import { View, Text } from 'react-native'

const ViewServiceHistoryScreen = ({route,navigation}) => {
  const admin_id = route.params;
  // Check if customer_id is available
  if (!admin_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate('Vechicle Guardian Landing Page');
    return null; // Render nothing if redirecting
  }
  return (
    <View>
      <Text>This is admin dashboard</Text>
    </View>
  )
}

export default ViewServiceHistoryScreen
