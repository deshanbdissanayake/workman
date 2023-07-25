import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import CustomModal from '../components/CustomModal';
import Introps from '../components/Introps';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({navigation}) => {

  const [showAlert, setShowAlert] = useState(false);
  const [userName, setUserName] = useState('Driver');

  const { logout } = useContext(AuthContext);

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

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  const handleAlertOk = () => {
    setShowAlert(false);
    logout();
  };

  return (
    <>
        <View style={styles.container}>
            <View style={styles.menuWrapper}>
                {/* Profile Section */}
                <View style={styles.menuTopWrapper}>
                    <View style={styles.profileSection}>
                        <View style={styles.profileImageWrapper}>
                            <FontAwesome5 name="user" size={24} color={colors.primaryDark} />
                        </View>
                        <View style={styles.profileTextWrapper}>
                            <Text style={styles.profileText}>Hello {userName}</Text>
                            <Text style={styles.profilePhone}>Welcome Back to DASH.lk</Text>
                        </View>
                    </View>
                    <View style={styles.menuSection}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('BottomDashNav')}
                        >
                        <Ionicons name="md-speedometer-outline" size={24} color={colors.textDark} />
                        <Text style={styles.menuItemText}>Dashboard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('BottomOrdNav')}
                        >
                        <Ionicons name="receipt-outline" size={24} color={colors.textDark} />
                        <Text style={styles.menuItemText}>Order List</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('BottomPickupNav')}
                        >
                        <Ionicons name="clipboard-outline" size={24} color={colors.textDark} />
                        <Text style={styles.menuItemText}>Pickup List</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('Report Finance')}
                        >
                        <MaterialCommunityIcons name="finance" size={24} color={colors.textDark} />
                        <Text style={styles.menuItemText}>Finance Report</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('Report Orders')}
                        >
                        <AntDesign name="book" size={24} color={colors.textDark} />
                        <Text style={styles.menuItemText}>Orders Report</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.menuBottomWrapper}>
                    {/* Menu Items */}
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogoutClick}>
                        <Ionicons name="log-out-outline" size={24} color={colors.primaryDark} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                    <View style={styles.developerWrapper}>
                        <Introps />
                        <Text style={styles.versionStyles}>V 1.1.0</Text>
                    </View>
                </View>
            </View>
        </View>
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

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.bgLight,
        color: colors.textDark,
    },
    menuTopWrapper: {
        flex: 1,
    },
    menuBottomWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        margin: 10,
        paddingBottom: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: 5,
        margin: 10,
    },
    profileImageWrapper: {
        backgroundColor: colors.border,
        padding: 20,
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
    },
    profilePhone: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGray,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    menuItemText: {
        marginLeft: 15,
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textDark,
    },
    logoutText: {
        marginLeft: 15,
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.primaryDark,
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
    developerWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
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
