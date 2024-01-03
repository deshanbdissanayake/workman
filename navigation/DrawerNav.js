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
import { useState } from 'react';
import CustomAlert from '../components/general/CustomAlert';
import CustomModal from '../components/general/CustomModal';
import MiniButton from '../components/general/MiniButton';
import ProductNav from './ProductNav';

const Drawer = createDrawerNavigator();

// Custom drawer content component
const CustomDrawerContent = ({ navigation, state, descriptors, handleLogoutClick }) => {
    const { logData } = useContext(AuthContext);

    const closeDrawer = () => {
      navigation.closeDrawer();
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
            <View style={styles.drawerClose}>
              <MiniButton
                bgColor={colors.bgDark}
                func={closeDrawer}
                content={<Ionicons name="close" size={24} color={colors.textLight} />}
              />
            </View>
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
    const { logData, logout } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [refresh, setRefresh] = useState(false); //modal refresh

    const handleModalCancel = () => {
        setShowModal(false);
    };
    
    const handleModalOk = async () => {
      setRefresh(true)
      await logout();
      setRefresh(false)
      setShowModal(false);

      setSuccessMessage({ type: 'success', msg: 'Logged Out Successfully!' });

      setTimeout(() => {
        setSuccessMessage({});
      }, 700);
    };

    const handleLogoutClick = () => {
      setShowModal(true)
    };

    return (
      <>
      <Drawer.Navigator
        initialRouteName="HomeNav"
        drawerContent={(props) => <CustomDrawerContent {...props} handleLogoutClick={handleLogoutClick} />}
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
          name="ProductNav"
          component={ProductNav}
          options={{
            drawerLabel: 'Products',
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'cube' : 'cube-outline'}
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        {!logData.log_status ? (
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
        ):(
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
        )}

      </Drawer.Navigator>

      {showModal && (
        <View style={styles.alertStyles}>
            <CustomModal
                title={'Confirm Logout'}
                content={'Are you sure ?'}
                cancelButtonText={'Cancel'}
                okButtonText={'Confirm'}
                pressCancel={handleModalCancel}
                pressOk={handleModalOk}
                refresh={refresh}
            />
        </View>
      )}

      {Object.keys(successMessage).length > 0 && (
          <View style={styles.alertStyles}>
              <CustomAlert type={successMessage.type} msg={successMessage.msg} />
          </View>
      )}

      </>
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
  alertStyles: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
})