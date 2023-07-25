import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const FilterButton = ({name, func, selected}) => {
  return (
    <TouchableOpacity onPress={func}>
        <View style={[styles.filterButtonWrapper, {backgroundColor: selected ? colors.primaryDark : colors.border}]}>
            <Text style={[styles.filterButtonText, {color: selected ? colors.textLight : colors.textDark}]}>{name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default FilterButton

const styles = StyleSheet.create({
    filterButtonWrapper: {
        width: 90,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    filterButtonText: {
        fontFamily: 'ms-regular',
        fontSize: 12,
    },
})