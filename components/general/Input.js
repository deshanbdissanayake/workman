import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import colors from "../../assets/colors/colors";

const Input = ({keyboardType, value, onChangeText, placeholder, secureTextEntry, icon, editable, multiline, textArea, maxLength, disabled}) => {
    const inputRef = useRef(null);useRef

    const handleInputWrapperClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
  
    return (
    <View 
        style={[
            styles.inputWrapper, 
            textArea ? { height: 150, alignItems: 'flex-start' } : {alignItems:'center'},
            disabled && { backgroundColor: colors.disabled} 
        ]}
        onTouchStart={handleInputWrapperClick}
    >
        {icon}
        <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={[
                styles.inputTextStyles, 
                disabled && { color: colors.textGraySecondary } 
            ]}
            editable={editable}
            multiline={multiline}
            maxLength={maxLength}
            ref={inputRef}
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
