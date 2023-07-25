import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import BottomNav from './BottomNav';
import Notifications from '../screens/Notifications';

// Create a stack navigator
const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNav