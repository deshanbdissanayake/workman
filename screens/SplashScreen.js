import { Image, StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';


const SplashScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/images/logo.png')} style={styles.imageStyles} />
        </View>
      </View>
    </>
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
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 60,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: 100,
    resizeMode: 'contain',
  },
})