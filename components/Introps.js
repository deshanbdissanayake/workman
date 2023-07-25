import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const Introps = () => {
  return (
    <View style={styles.intropsWrapper}>
      <Text style={styles.intropsTitle}>Developed by <Text style={styles.intropsText}>Introps</Text></Text>
    </View>
  )
}

export default Introps

const styles = StyleSheet.create({
    intropsWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    intropsTitle:{
      fontFamily: 'ms-regular',
      fontSize: 10,
      color: colors.textDark
    },
    intropsText:{
      fontFamily: 'ms-regular',
      color: colors.primary,
    },
})