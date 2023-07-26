import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import colors from '../assets/colors/colors';

import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import SplashScreen from '../screens/SplashScreen';
import SingleCategoryScreen from '../screens/SingleCategoryScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
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
          name="Register Screen"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
