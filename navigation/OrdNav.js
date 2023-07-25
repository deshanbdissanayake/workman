import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrderList from '../screens/OrderList';
import SingleOrder from '../screens/SingleOrder';

// Create a stack navigator
const Stack = createStackNavigator();

const OrdNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Order List"
          component={OrderList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Single Order"
          component={SingleOrder}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  )
}

export default OrdNav

const styles = StyleSheet.create({})