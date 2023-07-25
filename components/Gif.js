import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const Gif = () => {
  return (
    <View>
        <Image source={require('../assets/images/deliveryman.gif')} style={styles.gifImageStyles}/>
    </View>
  )
}

export default Gif

const styles = StyleSheet.create({
    gifImageStyles: {
        width: 250,
        resizeMode: 'contain',
        transform: [{scaleX: -1}]
    },
})