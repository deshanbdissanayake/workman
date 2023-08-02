import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../assets/colors/colors';

const CustomAlert = ({ type, msg }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    let icon = '';
    let bgColor = '';

    switch(type){
        case 'success':
            icon = <AntDesign name="checkcircleo" size={64} color={colors.success} />
            bgColor = colors.successLight;
            break;
        case 'danger':
            icon = <AntDesign name="closecircleo" size={64} color={colors.danger} />
            bgColor = colors.dangerLight;
            break;
        case 'warning':
            icon = <AntDesign name="warning" size={64} color={colors.warning} />
            bgColor = colors.warningLight;
            break;
        case 'info':
            icon = <AntDesign name="infocirlceo" size={64} color={colors.info} />
            bgColor = colors.infoLight;
            break;
        default:
            break;
    }

    return (
        <Animated.View style={[styles.container, { backgroundColor: bgColor, opacity: fadeAnim }]}>
            <View style={styles.iconWrapper}>
                {icon}
            </View>
            <View style={styles.msgWrapper}>
                <Text style={styles.msgTextStyles}>{msg}</Text>
            </View>
        </Animated.View>
    )
}

export default CustomAlert

const styles = StyleSheet.create({
    container: {
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    iconWrapper: {
        marginBottom: 20,
    },
    msgWrapper: {

    },
    msgTextStyles: {
        fontFamily:'ms-semibold',
        fontSize: 16,
        color: colors.textDark,
        textAlign: 'center',
    },
})
