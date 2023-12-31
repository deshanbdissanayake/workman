import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MiniButton from '../components/general/MiniButton';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import AuthContext from '../context/AuthContext';
import { getUserData } from '../assets/data/getData';
import NoData from '../components/app/NoData';
import Button from '../components/general/Button';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const UserScreen = ({ navigation }) => {

    const [userData, setUserData] = useState(null);

    useFocusEffect(
        useCallback(() => {
            getUserFunc(); // This will be called whenever the screen gains focus
        }, [])
    );

    const getUserFunc = async () => {
        try{
            const response = await getUserData();
            setUserData(response);
        } catch ( error ) {
            console.error('error getting user data', error);
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleEditClick= () => {
        navigation.navigate('User Settings Screen', { user : userData });
    }

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton
                bgColor={colors.border}
                func={handleGoBack}
                content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
                <Text style={styles.titleStyles}>User Details</Text>
            </View>
            <View style={styles.bottomWrapper}>
                {userData === null ? (
                    <NoData msg={'Loading...'} />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        
                        <View style={[styles.sectionWrapper, styles.rowWrapper]}>
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: userData.client_img }} style={styles.userImageStyles} />
                            </View>
                            <View style={styles.userWrapper}>
                                <View>
                                    <Text style={styles.nameStyles}>{userData.client_name}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Entypo name="email" size={20} color={colors.primary} />
                                    <Text style={styles.textStyles}>{userData.email}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Ionicons name="call-outline" size={20} color={colors.primary} />
                                    <Text style={styles.textStyles}>{userData.phone1}</Text>
                                </View>
                                <View style={styles.rowWrapper}>
                                    <Ionicons name="logo-whatsapp" size={20} color={colors.primary} />
                                    <Text style={styles.textStyles}>{userData.phone2}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.sectionWrapper}>
                            <View style={styles.rowWrapper}>
                                <Entypo name="location" size={20} color={colors.primary} />
                                <Text style={styles.textStyles}>Address: {userData.address}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <MaterialIcons name="location-city" size={20} color={colors.primary} />
                                <Text style={styles.textStyles}>City: {userData.city}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Entypo name="location-pin" size={20} color={colors.primary} />
                                <Text style={styles.textStyles}>Area: {userData.area}</Text>
                            </View>
                        </View>

                        <View style={styles.sectionWrapper}>
                            <View style={styles.rowWrapper}>
                                <FontAwesome name="calendar" size={20} color={colors.primary} />
                                <Text style={styles.textStyles}>Joined Date: {userData.reg_date}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                            <MaterialCommunityIcons name="format-list-numbered" size={20} color={colors.primary} />
                                <Text style={styles.textStyles}>Total Jobs Completed: {userData.total_jobs}</Text>
                            </View>
                        </View>

                        <View style={styles.sectionWrapper}>
                            <Button
                                bgColor={colors.primaryDark}
                                txtColor={colors.textLight}
                                text={'Edit My Details'}
                                func={handleEditClick}
                            />
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    topWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginLeft: 20,
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    sectionWrapper: {
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
    },
    userImageStyles: {
        width: 90,
        height: 115,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    userWrapper: {
        flex: 2,
    },
    nameStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 10,
    },
    textStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        marginLeft: 10,
    },
})