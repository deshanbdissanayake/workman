import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import colors from '../assets/colors/colors';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import SplashScreen from '../screens/SplashScreen';

const AppNav = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Home/>
    </NavigationContainer>
  );
};

export default AppNav;
