import { StyleSheet, View } from 'react-native';
import React from 'react';
import Gif from '../components/Gif';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Gif/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})