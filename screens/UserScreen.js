import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MiniButton from '../components/general/MiniButton';
import { Entypo, Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import AuthContext from '../context/AuthContext';
import { getUserData } from '../assets/data/getData';

const UserScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        getUserFunc()
    },[])

    const getUserFunc = async () => {
        setLoading(true)
        try{
            const response = await getUserData();
            setUserData(response)
            console.log(response)
        } catch ( error ) {

        } finally {
            setLoading(false)
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton
                bgColor={colors.border}
                func={handleGoBack}
                content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
            </View>
            <View style={styles.bottomWrapper}>
                <Text style={styles.titleStyles}>User Settings</Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.sectionWrapper}>
                        <Image source={{ uri: userData.client_img }} style={styles.userImageStyles} />
                        <View style={styles.userWrapper}>
                            <View>
                                <Text style={styles.nameStyles}>{userData.client_name}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Entypo name="email" size={24} color={colors.primary} />
                                <Text style={styles.emailStyles}>{userData.email}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Ionicons name="call-outline" size={24} color={colors.primary} />
                                <Text style={styles.phoneStyles}>{userData.phone1}</Text>
                            </View>
                            <View style={styles.rowWrapper}>
                                <Ionicons name="logo-whatsapp" size={24} color={colors.primary} />
                                <Text style={styles.phoneStyles}>{userData.phone2}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    topWrapper: {
        marginBottom: 20,
    },
    bottomWrapper: {},
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 20,
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionWrapper: {

    },
    userImageStyles: {

    },
    userWrapper: {

    },
    nameStyles: {

    },
    emailStyles: {

    },
    phoneStyles: {

    },
})