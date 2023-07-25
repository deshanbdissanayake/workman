import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Gif from '../components/Gif'
import colors from '../assets/colors/colors'

const Welcome = ({navigation}) => {

    const getStartedFunc = () =>{
        navigation.navigate('Login');
    }

    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.welcomeTopWrapper}>
                <Gif/>
            </View>
            <View style={styles.welcomeBottomWrapper}>
                <View>
                    <Text style={styles.welcomeTitle}>Hello There !!</Text>
                    <Text style={styles.welcomeDesc}>Accept your orders, deliver them and make customer happy with your service.</Text>
                </View>
                <Button bgColor={colors.primary} txtColor={colors.textLight} text={'Get Started'} func={getStartedFunc} />
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    welcomeContainer : {
        flex: 1,
        padding: 20,
    },
    welcomeTopWrapper : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeBottomWrapper : {
        flex: 1,
        justifyContent: 'space-around',
    },
    welcomeTitle : {
        fontFamily: 'ms-semibold',
        fontSize: 24,
        color: colors.textDark,
        marginBottom: 20,
    },
    welcomeDesc : {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textDark,
    },
})