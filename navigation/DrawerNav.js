import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';


// Import your screens or components
import colors from '../assets/colors/colors';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import HomeNav from './HomeNav';
import AuthContext from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';
import MyBookingNav from './MyBookingNav';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors }) => {
    const { logData, logout } = useContext(AuthContext);

  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  const handleLogoutClick = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from the app ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.drawerWrapper}
    >
      {/* Profile Section */}
      <View style={styles.drawerTopWrapper}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <FontAwesome5 name="user" size={50} color={colors.textDark} />
          </View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{logData.log_userName}</Text>
            <Text style={styles.profilePhone}>{logData.log_userNumber}</Text>
          </View>
          <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer} >
            <Ionicons name="close" size={24} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Drawer Items */}
        <DrawerItemList
          state={state}
          navigation={navigation}
          descriptors={descriptors}
        />
      </View>
      <View style={styles.drawerBottomWrapper}>
        <DrawerItem
          label="Logout"
          labelStyle={{color: colors.white}}
          onPress={handleLogoutClick}
          icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={colors.white} />
          )}
        />
      </View>

    </DrawerContentScrollView>
  );
};

const DrawerNav = () => {

  return (
    <Drawer.Navigator
      initialRouteName="HomeNav"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.white,
      }}
    >
      <Drawer.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'md-home' : 'md-home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          drawerLabel: 'Sign In',
          drawerIcon: ({ focused, color, size }) => (
            <Feather 
                name={focused ? 'user-plus' : 'user'}
                size={size} 
                color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MyBookingNav"
        component={MyBookingNav}
        options={{
          drawerLabel: 'My Bookings',
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons 
                name={focused ? 'list-circle' : 'list-circle-outline'}
                size={size} 
                color={color}
            />
          ),
          headerShown: false,
        }}
      />

    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  drawerWrapper:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgDark,
    color: colors.white,
  },
  drawerTopWrapper:{
    flex: 11,
  },
  drawerBottomWrapper:{
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    margin: 10,
  },
  profileSection:{
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 5,
    margin: 10,
  },
  profileImageWrapper:{
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextWrapper:{
    marginBottom: 5,
  },
  profileText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  profilePhone:{
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  drawerClose:{
    position: 'absolute',
    top: 0,
    right: 0,
  },
})