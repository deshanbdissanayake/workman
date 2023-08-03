import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SingleCategoryScreen from '../screens/SingleCategoryScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CategoryList from '../screens/CategoryList';
import SingleBlogScreen from '../screens/SingleBlogScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import UserScreen from '../screens/UserScreen';

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
        <Stack.Screen
          name="Single Story Screen"
          component={SingleBlogScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User Screen"
          component={UserScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User Settings Screen"
          component={UserSettingsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  );
};

export default HomeNav;
