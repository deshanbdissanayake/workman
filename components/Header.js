import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import MiniButton from './MiniButton'
import colors from '../assets/colors/colors'
import { Ionicons, Octicons } from '@expo/vector-icons'

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { getNotificationsByUserId } from '../assets/data/user'
import { useCallback } from 'react'

const Header = ({showSearch, name, searchFunc}) => {
    const navigation = useNavigation();
    const [pendingNotif, setPendingNotif] = useState(false)

    useEffect(()=>{
        hasPendingNotifications();
    },[])

    // Use useFocusEffect hook to hide the CustomAlert when the screen gains focus
    useFocusEffect(
        useCallback(() => {
        return () => {
            hasPendingNotifications();
        };
        }, [])
    );

    const hasPendingNotifications = async () => {
        const notifications = await getNotificationsByUserId();
        if(notifications !== null){
            const pending = notifications.some((notification) => notification.status === "pending");
            setPendingNotif(pending)
        }
    };

    const handleNotifications = () => {
        navigation.navigate('Notifications');
    };

    const handleMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                {/*<MiniButton
                    bgColor={colors.bgLight}
                    func={handleMenu}
                    content={<Ionicons name="menu" size={24} color={colors.textDark} />}
                />*/}
                <Text style={styles.headerTitle}>{name}</Text>
            </View>
            <View style={styles.headerRight}>
                {showSearch && (
                    <MiniButton
                        bgColor={colors.white}
                        func={searchFunc}
                        content={<Ionicons name="search-sharp" size={24} color={colors.textDark} />}
                    />
                )}

                <MiniButton
                    bgColor={colors.white}
                    func={handleNotifications}
                    content={<Octicons name="bell" size={21} color={colors.textDark} />}
                />
                {
                    pendingNotif && (
                        <View style={styles.pendingNotificationsStyles}></View>
                    )
                }
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        flex: 1,
        maxHeight: 65,
        flexDirection: 'row',
        padding : 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    headerTitle: {
        fontFamily: 'ms-bold',
        textTransform: 'uppercase',
        fontSize: 16,
        color: colors.textDark,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pendingNotificationsStyles: {
        position: 'absolute',
        right: 6,
        top: 5,
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: colors.primary,
        zIndex: 2,
    },
})