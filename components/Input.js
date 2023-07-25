import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon}) => {
  return (
    <View style={styles.inputWrapper}>
        {icon}
        <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={styles.inputTextStyles}
        />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputTextStyles: {
        width: '100%',
        fontFamily: 'ms-regular',
        marginLeft: 10,
    },
});
