import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../assets/colors/colors'; 

const handleDrawer = () => {
    console.log('handle drawer')
}

const handleUser = () => {
    console.log('handle user')
}

const Header = ({name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={handleDrawer}>
            <View style={styles.buttonClickAreaStyles}>
                <Ionicons name="menu" size={24} color={colors.textLight} />
            </View>
        </TouchableOpacity>
        <Text style={styles.headerTextStyles}>{name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handleUser}>
            <View style={styles.buttonClickAreaStyles}>
                <Ionicons name="person" size={24} color={colors.textLight} />
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        height: 60,
        backgroundColor: colors.bgDark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    leftContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTextStyles : {
        fontFamily: 'ms-bold',
        fontSize: 18,
        color: colors.textLight,
        marginLeft: 10,
    },
    rightContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonClickAreaStyles: {
        padding: 10,
    },
});

export default Header;
