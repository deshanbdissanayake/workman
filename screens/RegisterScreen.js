import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import MiniButton from '../components/MiniButton';
import colors from '../assets/colors/colors';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';

import { sendOtp, verifyNumber, saveUser, saveAsyncStorage } from '../assets/data/user';
import { log_data } from '../assets/data/system';

const RegisterScreen = ({ navigation }) => {

    //========================================================================================= 
    //form states
    const [userToken, setUserToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const [whatsapp, setWhatsapp] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    //errors
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [otpError, setOtpError] = useState(false);

    const [whatsappError, setWhatsappError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //other states
    const [buttonLoading, setButtonLoading] = useState(false); //button get disabled while loading
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
    const [showResend, setShowResend] = useState(false);

    const [buttonTitle, setButtonTitle] = useState('Send OTP');

    const [logData, setLogData] = useState(log_data);

    //=========================================================================================
    // handle button click
    const handleButtonClick = () => {

        if (!phoneNumberVerified) {
            // otp sending and phone number verification
            if (!otpSent) {
                // Phone Number Validation check
                if (phoneNumber.length !== 9 || phoneNumber.charAt(0) !== '7') {
                    setPhoneNumberError(true);
                } else {
                    setPhoneNumberError(false);
                    setButtonLoading(true);

                    sendOtpFunc(); //send otp
                }
            } else {
                // OTP Validation
                if (otp.length !== 4) {
                    setOtpError(true);
                } else {
                    setOtpError(false);
                    setButtonLoading(true);

                    verifyNumberFunc(); //confirm otp and verify number
                }
            }
        } else {
            // details validation
            let isValid = true;

            //validations here
            // Validation for WhatsApp
            if (!whatsapp) {
                setWhatsappError(true);
                isValid = false;
            } else {
                setWhatsappError(false);
            }

            // Validation for Name
            if (!name || name.length < 4) {
                setNameError(true);
                isValid = false;
            } else {
                setNameError(false);
            }

            // Validation for Address
            if (!address) {
                setAddressError(true);
                isValid = false;
            } else {
                setAddressError(false);
            }

            // Validation for Email
            if (!email) {
                setEmailError(true);
                isValid = false;
            } else if (!isValidEmail(email)) {
                setEmailError(true);
                isValid = false;
            }  else {
                setEmailError(false);
            }

            // If all fields are valid, proceed with save details
            if (isValid) {
                setButtonLoading(true);

                //save user data
                saveUserFunc();
            }
        }
    };

    const isValidEmail = (input) => {
        // Basic email validation regex pattern
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(input);
    };

    //send otp function
    const sendOtpFunc = () => {
        console.log('otp send')
        sendOtp(phoneNumber)
        .then((otpStatus) => {
            if (otpStatus.stt == 'ok') {
            setOtpSent(true);
            setButtonTitle('Confirm OTP')
            setTimeout(() => {
                setShowResend(true);
            }, 20000);
            } else {
            setPhoneNumberError(true);
            }
        })
        .catch((error) => {
            console.error('Verification error:', error);
            setPhoneNumberError(true);
        })
        .finally(() => {
            setButtonLoading(false); // Disable loading state
        });
    };

    // confirm otp and verify number
    const verifyNumberFunc = async () => {
        try {
            const verifyData = await verifyNumber(phoneNumber, otp);

            if (verifyData.stt === 'ok') {

                // =================================================

                if(verifyData.payload.reg === 'required'){
                    // Update log data
                    const updatedLogData = {
                        ...logData,
                        log_userToken: verifyData.payload.token
                    };
                    // Call saveAsyncStorage and wait for it to complete
                    setUserToken(verifyData.payload.token)
                    await saveAsyncStorage(updatedLogData);

                    setButtonTitle('Save My Details')
                    setPhoneNumberVerified(true);
                }else{ // if user already registered
                    // Update log data
                    const updatedLogData = {
                        ...logData,
                        log_status: true,
                        log_userToken: verifyData.payload.token,
                        log_userNumber: verifyData.payload.user.phone1,
                        log_userName: verifyData.payload.user.client_name,
                        log_userEmail: verifyData.payload.user.email,
                        log_userWhsp: verifyData.payload.user.phone2,
                        log_userAddress: verifyData.payload.user.address,
                    };

                    // Call saveAsyncStorage and wait for it to complete
                    await saveAsyncStorage(updatedLogData);

                    //navigate back to form
                    navigation.goBack();

                }

                // =================================================

            } else {
                setOtpError(true);
            }
        } catch (error) {
            console.error('Verification error:', error);
            setOtpError(true);
        } finally {
            setButtonLoading(false); // Disable loading state
        }
    };

    //save user
    const saveUserFunc = async () => {

        const formData = new FormData();

        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('whatsapp', whatsapp);
        formData.append('user_phone', phoneNumber);

        try {
        const verifyStatus = await saveUser(formData);
        if (verifyStatus.stt === 'ok') {
            console.log('User saved');

            // Update log data
            const updatedLogData = {
            ...logData,
            log_status: true,
            log_userToken: userToken,
            log_userNumber: phoneNumber,
            log_userName: name,
            log_userEmail: email,
            log_userWhsp: whatsapp,
            log_userAddress: address,
            };

            // Call saveAsyncStorage and wait for it to complete
            await saveAsyncStorage(updatedLogData);

            navigation.goBack();
            
        }else{
            console.log(verifyStatus)
        }
        } catch (error) {
        console.error('Verification error:', error);
        } finally {
        setButtonLoading(false); // Disable loading state
        }
    };

    //resend button click
    const resendButtonClick = () => {
        setOtp('');
        setShowResend(false);
        sendOtpFunc();
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton 
                    bgColor={colors.border}
                    func={handleGoBack}
                    content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
                <Text style={styles.titleStyles}>Register</Text>
            </View>



            {!phoneNumberVerified ? (
                <View style={styles.formWrapper}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/*==========================================================================*/}
                        {/* phone number & otp */}
                        {/*==========================================================================*/}
                        {!otpSent ? (
                        <View style={styles.formGroup}>

                            <Text style={styles.formLabelStyles}>Enter Your Phone Number</Text>
                            <Input
                                keyboardType={'numeric'}
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text)}
                                placeholder={'Ex: 71xxxxxxx'}
                                secureTextEntry={false}
                                icon={<Ionicons name="call-outline" size={24} color={colors.gray} />}
                                editable={true}
                                maxLength={9}
                            />

                            {phoneNumberError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Check your phone number again!
                                    </Text>
                                </View>
                            )}
                        </View>
                        ) : (
                        <View style={styles.formGroup}>

                            <Text style={styles.formLabelStyles}>Enter OTP</Text>
                            <Input
                                keyboardType={'numeric'}
                                value={otp}
                                onChangeText={(text) => setOtp(text)}
                                placeholder={'Check Your Messages for OTP'}
                                secureTextEntry={false}
                                icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color={colors.gray} />}
                                editable={true}
                                maxLength={4}
                            />

                            {otpError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Check your OTP again!
                                    </Text>
                                </View>
                            )}
                        </View>
                        )}
                        {/*==========================================================================*/}
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.formWrapper}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        
                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Your Confirmed Phone Number</Text>
                            <Input
                                value={phoneNumber}
                                icon={<Ionicons name="call-outline" size={24} color={colors.gray} />}
                                editable={false}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Enter Your WhatsApp Number</Text>
                            <Input
                                keyboardType={'numeric'}
                                value={whatsapp}
                                onChangeText={(text) => setWhatsapp(text)}
                                placeholder={'Ex: 71xxxxxxx'}
                                secureTextEntry={false}
                                icon={<Ionicons name="call-outline" size={24} color={colors.gray} />}
                                editable={true}
                                maxLength={9}
                            />

                            {whatsappError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Check your WhatsApp Number again!
                                    </Text>
                                </View>
                            )}

                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Enter Your Name</Text>    
                            <Input
                                keyboardType={'default'}
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder={'Name Here'}
                                icon={<Feather name="user" size={24} color={colors.gray} />}
                                editable={true}
                            />

                            {nameError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Name should have more than 4 letters!
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.formGroup}>

                            <Text style={styles.formLabelStyles}>Enter Your Email Address</Text>    
                            <Input
                                keyboardType={'default'}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder={'Email Here'}
                                icon={<Entypo name="email" size={24} color={colors.gray} />}
                                editable={true}
                            />

                            {emailError ? (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Check your Email again!
                                    </Text>
                                </View>
                            ) : (
                                ''
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Enter Your Address</Text>    
                            <Input
                                keyboardType={'default'}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder={'Address Here'}
                                icon={<Ionicons name="home-outline" size={24} color={colors.gray} />}
                                editable={true}
                                multiline={true}
                                textArea={true}
                            />

                            {addressError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Check your Address again!
                                    </Text>
                                </View>
                            )}
                        </View>

                    </ScrollView>
                </View>
            )}



            <View>
                <View style={styles.formGroup}>
                    {buttonLoading ? (
                        <Button loading={true} />
                    ) : (
                        <Button
                            bgColor={colors.primaryDark}
                            txtColor={colors.white}
                            text={buttonTitle}
                            func={handleButtonClick}
                        />
                    )}

                    {showResend && (
                        <TouchableOpacity onPress={resendButtonClick}>
                            <Text style={styles.resendButton}>Resend OTP</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>


        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    topWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleStyles : {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginLeft: 20,
    },
    formWrapper : {
        flex: 1,
        justifyContent: 'space-between',
    },
    formGroup : {
        marginBottom: 10,
    },
    formLabelStyles : {
        fontFamily: 'ms-semibold',
        fontSize: 12,
        color: colors.textDark,
        marginBottom: 5,
        marginLeft: 2,
    },
    resendButton: {
        fontFamily: 'ms-regular',
        fontSize: 11,
        marginTop: 20,
        textDecorationLine: 'underline',
        alignSelf: 'center',
    },

    //=========================================================
    errorWrapper: {
        width: '100%',
    },
    errorMessage: {
        color: colors.danger,
        fontSize: 11,
        textAlign: 'right',
        fontFamily: 'ms-regular',
    },
    //=========================================================
})