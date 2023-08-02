import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SecondaryButton = ({content, bgColor, func, margin={}}) => {
  return (
    <TouchableOpacity onPress={func}>
        <View style={[styles.buttonWrapper, margin, {backgroundColor:bgColor}]}>
            {content}
        </View>
    </TouchableOpacity>
  )
}

export default SecondaryButton

const styles = StyleSheet.create({
    buttonWrapper:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})