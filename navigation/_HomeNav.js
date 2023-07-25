import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Import your screens or components
import colors from '../assets/colors/colors';
import BottomNav from './BottomNav';
import CustomModal from '../components/CustomModal';
import Introps from '../components/Introps';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = React.memo(({ navigation, state, descriptors, setShowAlert }) => {
    const [userName, setUserName] = useState('Driver')
    const closeDrawer = () => {
        navigation.closeDrawer();
    };

    const handleLogoutClick = () => {
        setShowAlert(true);
    };

    useEffect(() => {
      const fetchUserName = async () => {
        const userName = await AsyncStorage.getItem('userName');
        setUserName(userName);
      };
    
      fetchUserName();
    }, []);
    

    return (
        <DrawerContentScrollView contentContainerStyle={styles.drawerWrapper}>
        {/* Profile Section */}
        <View style={styles.drawerTopWrapper}>
            <View style={styles.profileSection}>
            <View style={styles.profileImageWrapper}>
                <FontAwesome5 name="user" size={50} color={colors.primaryDark} />
            </View>
            <View style={styles.profileTextWrapper}>
                <Text style={styles.profileText}>Hello {userName}</Text>
                <Text style={styles.profilePhone}>Welcome Back to DASH.lk</Text>
            </View>
            <TouchableOpacity style={styles.drawerClose} onPress={closeDrawer}>
                <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
            </View>

            {/* Drawer Items */}
            <DrawerItemList state={state} navigation={navigation} descriptors={descriptors} />
        </View>
        <View style={styles.drawerBottomWrapper}>
            <DrawerItem
            label="Logout"
            labelStyle={{ color: colors.textDark }}
            onPress={handleLogoutClick}
            icon={({ size }) => (
                <Ionicons name="log-out-outline" size={size} color={colors.textDark} />
            )}
            />
            <Introps/>
            <Text style={styles.versionStyles}>V 1.1.0</Text>
        </View>

        </DrawerContentScrollView>
    );
});

const HomeNav = () => {
    const [showAlert, setShowAlert] = useState(false);

    const {logout} = useContext(AuthContext);

    const handleAlertCancel = () => {
        setShowAlert(false);
    };

    const handleAlertOk = () => {
        setShowAlert(false);
        logout()
    };

    return (
        <>
            <Drawer.Navigator
            initialRouteName="BottomNav"
            drawerContent={(props) => <CustomDrawerContent {...props} setShowAlert={setShowAlert} />}
            screenOptions={{
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textDark,
            }}
            >
            <Drawer.Screen
                name="BottomNav"
                component={BottomNav}
                options={{
                drawerLabel: 'Home',
                drawerIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                ),
                headerShown: false,
                }}
            />
            </Drawer.Navigator>
            {showAlert && (
                <View style={styles.alertStyles}>
                    <CustomModal
                        title={'Logout'}
                        content={'Are you sure you want to logout ?'}
                        cancelButtonText={'Cancel'}
                        okButtonText={'Logout'}
                        pressCancel={handleAlertCancel}
                        pressOk={handleAlertOk}
                    />
                </View>
            )}
        </>
    );
};

export default HomeNav;

const styles = StyleSheet.create({
  drawerWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.bgLight,
    color: colors.textDark,
  },
  drawerTopWrapper: {
    flex: 1,
  },
  drawerBottomWrapper: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    margin: 10,
    paddingBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 5,
    margin: 10,
  },
  profileImageWrapper: {
    backgroundColor: colors.border,
    padding: 25,
    borderRadius: 50,
    margin: 10,
  },
  profileTextWrapper: {
    marginBottom: 5,
  },
  profileText: {
    fontFamily: 'ms-bold',
    fontSize: 18,
    color: colors.textDark,
    textAlign: 'center',
  },
  profilePhone: {
    fontFamily: 'ms-regular',
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
  },
  drawerClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  intropsStyles: {
    fontFamily: 'ms-regular',
    fontSize: 10,
    textAlign: 'center',
    color: colors.textDark,
  },
  versionStyles: {
    fontFamily: 'ms-regular',
    fontSize: 8,
    textAlign: 'center',
    color: colors.textGray,
  },
  alertStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
