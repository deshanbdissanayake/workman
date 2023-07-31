import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import colors from '../assets/colors/colors';

import DrawerNav from './DrawerNav';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNav = () => {
  const { isLoading } = useContext(AuthContext);

  if(isLoading){
    <SplashScreen/>
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <DrawerNav/>
    </NavigationContainer>
  );
};

export default AppNav;
