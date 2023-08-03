import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MiniButton from '../components/general/MiniButton';
import { Feather, Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import Input from '../components/general/Input';

const UserSettingsScreen = ({ navigation, route }) => {
    const { user } = route.params;

    const [userData, serUserData] = useState({
        name : user.client_name,
        email : user.email,
        whatsapp : user.phone2,
        address : user.address,
        cityId : user.city_id,
        areaId : user.area_id
    })

    const [userErrors, serUserErrors] = useState({
        nameError : false,
        emailError : false,
        whatsappError : false,
        addressError : false,
        cityError : false,
        areaError : false
    })

    const handleGoBack = () => {
        navigation.goBack();
    }

    /*
        I want to do below things
        1. upload image from phone gallery or camera
        2. load previous data
        3. change data
    */

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
                <Text style={styles.titleStyles}>User Details Update</Text>

                <View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New Name</Text>
                        <Input
                            keyboardType={'default'}
                            value={userData.name}
                            onChangeText={(text) => serUserData({...prev, name: text})}
                            placeholder={'Enter Your Name Here'}
                            icon={<Feather name="user" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New Name</Text>
                        <Input
                            keyboardType={'default'}
                            value={userData.name}
                            onChangeText={(text) => serUserData({...prev, name: text})}
                            placeholder={'Enter Your Name Here'}
                            icon={<Feather name="user" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default UserSettingsScreen

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
    formGroup: {
        marginBottom: 15,
    },
    formLabel: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        marginLeft: 5,
        marginBottom: 5,
    },
})