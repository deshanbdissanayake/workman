import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MiniButton from '../components/general/MiniButton';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import Input from '../components/general/Input';

const UserSettingsScreen = ({ navigation }) => {

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

                <View style={styles.formWrapper}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}></Text>
                        {/*<Input
                            keyboardType={'default'}
                            value={}
                            onChangeText={}
                            placeholder={}
                            secureTextEntry={}
                            icon={}
                            editable={}
                            multiline={}
                            textArea={}
                            maxLength={}
                            disabled={}
                        />*/}
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
})