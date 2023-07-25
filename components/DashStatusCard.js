import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const DashStatusCard = ({title, value, bgColor, txtColor, icon}) => {
  return (
    <View style={[styles.cardWrapper, {backgroundColor: bgColor}]}>
        <View style={styles.cardLeftWrapper}>
            {icon}
            <Text style={[styles.cardTitleStyles, {color: txtColor}]}>{title}</Text>
        </View>
        <View style={styles.cardRightWrapper}>
            <Text style={[styles.cardValueStyles, {color: txtColor}]}>{value}</Text>
        </View>
    </View>
  )
}

export default DashStatusCard

const styles = StyleSheet.create({
    cardWrapper : {
        width: '48%',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardLeftWrapper : {

    },
    cardRightWrapper : {
        marginLeft: 20,
    },
    cardTitleStyles : {
        fontFamily: 'ms-regular',
        fontSize: 10,
        marginTop: 5,
    },
    cardValueStyles : {
        fontFamily: 'ms-bold',
        fontSize: 24,
    },
})