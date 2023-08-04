import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const FormErrorMsg = ({msg}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorTextStyles}>{msg}</Text>
    </View>
  )
}

export default FormErrorMsg

const styles = StyleSheet.create({
    container : {
        width: '100%',
        marginTop: 5,
    },
    errorTextStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.danger,
        textAlign: 'left',
        paddingLeft: 5,
    },
})