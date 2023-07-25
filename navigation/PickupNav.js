import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import OrderPickupList from '../screens/OrderPickupList'

// Create a stack navigator
const Stack = createStackNavigator();

const PickupNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order Pickup List"
        component={OrderPickupList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default PickupNav