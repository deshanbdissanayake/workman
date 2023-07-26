import React, { useEffect } from 'react';
import { View, Keyboard, StatusBar, StyleSheet } from 'react-native';

// Other Imports
import AppNav from './navigation/AppNav';
import colors from './assets/colors/colors';
import { useFonts } from 'expo-font';
import SplashScreen from './screens/SplashScreen';

const App = () => {

    // unfocus from text inputs when keyboard hides
    useEffect(() => {
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        // This will blur the currently focused input field
        Keyboard.dismiss();
      });

      return () => {
        keyboardDidHideListener.remove();
      };
    }, []);

    // load fonts
    const [fontsLoaded] = useFonts({
      'ms-regular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
      'ms-semibold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
      'ms-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
      'pop-regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
      'pop-semibold': require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
      'pop-bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    }); 

    if (!fontsLoaded) {
      return <SplashScreen/>
    }

    return (
          <View style={styles.container}>
            <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
            <AppNav />
          </View>
    );
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.bgLight,
  }
})
