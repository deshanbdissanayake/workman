import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyBookingList from '../screens/MyBookingList'
import SingleBookingScreen from '../screens/SingleBookingScreen';
import RateJobScreen from '../screens/RateJobScreen';

const MyBookingNav = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyBookingList"
                component={MyBookingList}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SingleBookingScreen"
                component={SingleBookingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="RateJobScreen"
                component={RateJobScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default MyBookingNav

const styles = StyleSheet.create({})