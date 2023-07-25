import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../assets/colors/colors'
import SecondaryButton from './SecondaryButton'

const PickupCard = ({pickupData, handleAccept}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.idStyles}>#{pickupData.order_token}</Text>
                <Text style={styles.nameStyles}>{pickupData.recv_name}</Text>
                <Text style={styles.addrStyles}>{pickupData.recv_address}</Text>
            </View>
            <View style={styles.btnWrapper}>
                <SecondaryButton 
                    content={<Text style={styles.btnTextStyles}>Accept</Text>} 
                    bgColor={colors.primary} 
                    func={handleAccept} 
                />
            </View>
        </View>
    )
}

export default PickupCard

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.white,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    textWrapper : {
        flex: 9,
        marginRight: 10,
    },
    idStyles : {
        fontFamily: 'ms-semibold',
        fontSize : 18,
        color: colors.textDark,
        marginBottom: 3,
    },
    nameStyles : {
        fontFamily: 'ms-semibold',
        fontSize : 14,
        color: colors.textDark,
        marginBottom: 3,
    },
    addrStyles : {
        fontFamily: 'ms-semibold',
        fontSize : 12,
        color: colors.textGray,
    },
    btnWrapper: {
        flex: 3,
    },
    btnTextStyles : {
        fontFamily: 'ms-semibold',
        fontSize : 12,
        color: colors.textLight,
    },
    
})