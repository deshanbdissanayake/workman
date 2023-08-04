// AuthContext.js
import React, { useState, createContext, useEffect } from 'react';
import { getDataAsyncStorage, removeAsyncStorage } from '../assets/data/user'; // Import the user validation function
import { log_data } from '../assets/data/system';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [logData, setLogData] = useState(log_data);
  const [userStatus, setUserStatus] = useState(log_data.log_status);

    // Check user validity when the component mounts
    useEffect(() => {
        getDataFromAsyncStorage();
    }, []);

    const login = async () => {
        console.log('login');
        getDataFromAsyncStorage();
    }

    const logout = async () => {
        console.log('logout');
        await removeAsyncStorage();
        getDataFromAsyncStorage();
    }

    const getDataFromAsyncStorage = async () => {
        setIsLoading(true);
        try {
            let data = await getDataAsyncStorage();
            setLogData(data);
            setUserStatus(data.log_status);
        } catch (error) {
            console.error('Error retrieving log_data from AsyncStorage:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, logData, userStatus }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
