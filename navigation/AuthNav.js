import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Other Imports
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AuthNav = () => {

    const {loginError} = useContext(AuthContext);

    return (
        <Stack.Navigator>
            {loginError === null &&
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false,
                    }}
                />
            }
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthNav;
