import React,{ useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import colors from '../assets/colors/colors';

// Other Imports
import AuthNav from './AuthNav';
import HomeNav from './HomeNav';

const AppNav = () => {

  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {userToken !== null ? (
        <HomeNav/>
      ) : (
        <AuthNav/>
      )}
    </NavigationContainer>
  );
};

export default AppNav;
