import React, { useEffect } from 'react';
import { View, Keyboard, StatusBar, StyleSheet } from 'react-native';

// Other Imports
import AppNav from './navigation/AppNav';
import colors from './assets/colors/colors';
import { AuthProvider } from './context/AuthContext';

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


    return (
      <AuthProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor={colors.bgLight} barStyle="dark-content" />
            <AppNav />
          </View>
      </AuthProvider>
    );
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.bgLight,
  }
})
