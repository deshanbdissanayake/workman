import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useFonts } from 'expo-font';
import SplashScreen from "../screens/SplashScreen";
import { authenticateUser } from "../assets/data/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Initialize to true, assuming loading starts initially
  const [userToken, setUserToken] = useState(null);
  const [loginError, setLoginError] = useState(null);

  // load fonts
  const [fontsLoaded] = useFonts({
    'ms-regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'ms-semibold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'ms-bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'pop-regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
    'pop-semibold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'pop-bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
  });

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await authenticateUser(username, password);
      setIsLoading(false);

      if (response) {
        setLoginError(null);
        setUserToken(response);
        AsyncStorage.setItem('userToken', response)
        AsyncStorage.setItem('userName', username)
      }else{
        setLoginError('Check your Username and Password Again!')
      }
    } catch (error) {
      console.error('Login error', error);
      setLoginError('Check your Network Connection!')
      setIsLoading(false);
    }
  };


  const logout = async () => {
    setIsLoading(true);
    try {
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userName');
      setUserToken(null);
    } catch (error) {
      console.error('Logout error', error);
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error('Loggedin error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <SplashScreen/>
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};
