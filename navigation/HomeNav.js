import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SingleCategoryScreen from '../screens/SingleCategoryScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CategoryList from '../screens/CategoryList';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Single Screen"
          component={SingleCategoryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Category List"
          component={CategoryList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register Screen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  );
};

export default HomeNav;
