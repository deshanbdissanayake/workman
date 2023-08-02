import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const NoData = ({msg}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>{msg}</Text>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
    container : {
        padding: 15,
        backgroundColor: colors.gray,
        borderRadius: 10,
    },
    textStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
        textAlign: 'center',
    },    
})