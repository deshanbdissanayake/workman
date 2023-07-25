import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Menu from '../screens/Menu';
import ReportOrders from '../screens/ReportOrders';
import ReportFinance from '../screens/ReportFinance';

// Create a stack navigator
const Stack = createStackNavigator();

const MenuNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="My Menu"
          component={Menu}
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

export default MenuNav

const styles = StyleSheet.create({})