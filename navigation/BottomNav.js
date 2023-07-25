import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import OrdNav from './OrdNav';
import PickupNav from './PickupNav';
import DashNav from './DashNav';
import colors from '../assets/colors/colors';
import MenuNav from './MenuNav';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const tabScreenOptions = ({ route }) => ({
    tabBarLabel: getTabBarLabel(route),
    tabBarIcon: getTabBarIcon(route),
    headerShown: false,
    tabBarActiveTintColor: colors.primaryDark,
    tabBarInactiveTintColor: colors.textDark,
    tabBarStyle: [styles.tabBarStyles],
    tabBarLabelStyle: [styles.tabBarLabelStyles]
  });

  const getTabBarLabel = (route) => {
    switch (route.name) {
      case 'BottomOrdNav':
        return 'Order List';
      case 'BottomPickupNav':
        return 'Pickup List';
      case 'BottomDashNav':
        return 'Dashboard';
      case 'MenuNav':
        return 'Menu';
      default:
        return '';
    }
  };

  const getTabBarIcon = (route) => ({ focused, color, size }) => {
    switch (route.name) {
      case 'BottomOrdNav':
        return (
          <Ionicons
            name={focused ? 'receipt' : 'receipt-outline'}
            size={size}
            color={color}
          />
        );
      case 'BottomPickupNav':
        return (
          <Ionicons
            name={focused ? 'clipboard' : 'clipboard-outline'}
            size={size}
            color={color}
          />
        );
      case 'BottomDashNav':
        return (
          <Ionicons
            name={focused ? 'md-speedometer' : 'md-speedometer-outline'}
            size={size}
            color={color}
          />
        );
      case 'MenuNav':
        return (
          <Ionicons
            name={focused ? 'md-menu' : 'md-menu-outline'}
            size={size}
            color={color}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="BottomOrdNav"
      screenOptions={tabScreenOptions}
    >
      <Tab.Screen
        name="BottomOrdNav"
        component={OrdNav}
      />
      <Tab.Screen
        name="BottomPickupNav"
        component={PickupNav}
      />
      <Tab.Screen
        name="BottomDashNav"
        component={DashNav}
      />
      <Tab.Screen
        name="MenuNav"
        component={MenuNav}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
    tabBarStyles: {
        backgroundColor: colors.white,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopColor: colors.border,
        borderTopWidth: 1,
    },
    tabBarLabelStyles: {
      fontFamily: 'ms-semibold',
      paddingBottom: 5,
    }
});