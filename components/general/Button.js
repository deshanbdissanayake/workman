import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const Button = ({bgColor, txtColor, text, func, bdr='', loading=false}) => {
  return (
    <>
      {loading ? (
        <View style={[styles.buttonWrapper, {backgroundColor: colors.border}]}>
          <View style={styles.buttonText}>
            <ActivityIndicator size={24} color={colors.textDark} />
          </View>
        </View>
      ): (
      <TouchableOpacity
        style={[
          styles.buttonWrapper,
          { backgroundColor: bgColor, borderWidth: bdr === '' ? 0 : 1, borderColor: bdr === '' ? 'transparent' : bdr }
        ]}
        onPress={func}
      >
          <Text style={[styles.buttonText, {color: txtColor}]}>{text}</Text>
      </TouchableOpacity>
      )}
    </>
  )
}

export default Button

const styles = StyleSheet.create({
    buttonWrapper : {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
    },
    shadow : {
        shadowColor: colors.primaryDark,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    buttonText : {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontFamily: 'ms-bold',
    }
})