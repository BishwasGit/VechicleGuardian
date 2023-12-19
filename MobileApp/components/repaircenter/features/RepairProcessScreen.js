import React from 'react'
import { View, Text } from 'react-native'

const RepairProcessScreen = ({route,navigation}) => {
  const repaircenter_id = route.params;
  // Check if customer_id is available
  if (!repaircenter_id) {
    // Redirect to the main landing page or any other desired screen
    navigation.navigate('Vechicle Guardian Landing Page');
    return null; // Render nothing if redirecting
  }
  return (
    <View>
      <Text>This is RepairProcessScreen</Text>
    </View>
  )
}

export default RepairProcessScreen
