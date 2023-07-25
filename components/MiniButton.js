import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MiniButton = ({bgColor, func, content}) => {
  return (
    <TouchableOpacity style={styles.miniButtonWrapper} onPress={func}>
        <View style={[styles.miniButtonStyles, {backgroundColor: bgColor}]}>
            {content}
        </View>
    </TouchableOpacity>
  )
}

export default MiniButton

const styles = StyleSheet.create({
    miniButtonStyles: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 50,
    },
})