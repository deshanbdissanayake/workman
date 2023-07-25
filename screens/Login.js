import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Input from "../components/Input";
import Button from '../components/Button';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import Gif from "../components/Gif";
import Introps from "../components/Introps";
import { AuthContext } from "../context/AuthContext";
import CustomAlert from "../components/CustomAlert";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const { loginError, login } = useContext(AuthContext);

    const handleUserName = (text) =>{
        setUserName(text)
    }

    const handleUserPassword = (text) =>{
        setUserPassword(text)
    }

    const handleLogin = () => {
        login(userName, userPassword);
    };

    const [showAlert, setShowAlert] = useState(false);

    // Use useEffect to watch for changes in loginError
    useEffect(() => {
        if (loginError !== null) {
            setShowAlert(true);
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            // Clean up the timeout on unmount or if loginError changes
            return () => clearTimeout(timeout);
        }
    }, [loginError]);

    return (
        <View style={styles.loginContainer}>
            {showAlert &&
                <View style={styles.alertStyles}>
                    <CustomAlert type={'danger'} msg={loginError}/>
                </View>
            }
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.loginTopWrapper}>
                    <Text style={styles.loginTitle}>Welcome Back</Text>
                    <Text style={styles.loginSubTitle}>Enter your credentials to continue</Text>
                    <View style={styles.gifWrapper}>
                        <Gif/>
                    </View>
                </View>

                <View style={styles.loginBottomWrapper}>
                    <Input
                        keyboardType={'default'}
                        value={userName}
                        onChangeText={handleUserName}
                        placeholder={'Enter User Name Here'}
                        secureTextEntry={false}
                        icon={<AntDesign name="user" size={20} color={colors.textGray}  />}
                    />
                    <Input
                        keyboardType={'default'}
                        value={userPassword}
                        onChangeText={handleUserPassword}
                        placeholder={'Enter Password Here'}
                        secureTextEntry={true}
                        icon={<Ionicons name="lock-open-outline" size={20} color={colors.textGray} />}
                    />

                    <Button bgColor={colors.primary} txtColor={colors.textLight} text={'LOGIN'} func={handleLogin}/>

                    <View style={styles.intropsStyles}>
                        <Introps/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        padding: 20,
    },
    loginTopWrapper : {
        flex: 1,
    },
    gifWrapper : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        fontFamily: 'ms-bold',
        fontSize: 20,
        color: colors.textDark,
        marginTop: 20,
        marginBottom: 2,
    },
    loginSubTitle: {
        fontFamily: 'ms-regular',
        color: colors.textGray,
    },
    loginBottomWrapper : {
        flex: 1,
        justifyContent: 'flex-end',
    },
    intropsStyles: {
        marginTop: 10,
        borderTopColor: colors.border,
        borderTopWidth: 1,
    },
    alertStyles: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});
