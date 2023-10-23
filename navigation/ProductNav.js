import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../screens/ProductList'

const ProductNav = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProductList"
                component={ProductList}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default ProductNav

const styles = StyleSheet.create({})