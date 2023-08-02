import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon, editable, multiline, textArea, maxLength}) => {
  return (
    <View style={[styles.inputWrapper, textArea ? { height: 150, alignItems: 'flex-start' } : {alignItems:'center'}]}>
        {icon}
        <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={styles.inputTextStyles}
            editable={editable}
            multiline={multiline}
            maxLength={maxLength}
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
        flexDirection: 'row',
    },
    inputTextStyles: {
        width: '100%',
        fontFamily: 'ms-regular',
        marginLeft: 10,
    },
});
