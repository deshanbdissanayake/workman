import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dash from '../screens/Dash'
import ReportFinance from '../screens/ReportFinance';
import ReportOrders from '../screens/ReportOrders';

// Create a stack navigator
const Stack = createStackNavigator();

const DashNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Report Orders"
        component={ReportOrders}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Report Finance"
        component={ReportFinance}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default DashNav