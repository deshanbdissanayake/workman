import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';


const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.imageStyles} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  imageStyles: {
      width: 150,
      resizeMode: 'contain',
  },
})