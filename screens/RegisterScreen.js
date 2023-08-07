import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useContext } from 'react'
import MiniButton from '../components/general/MiniButton';
import colors from '../assets/colors/colors';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/general/Button';
import Input from '../components/general/Input';

import { sendOtp, verifyNumber, saveUser, saveAsyncStorage } from '../assets/data/user';
import { log_data } from '../assets/data/system';
import { getAreasByCityId, getCities } from '../assets/data/getData';
import { Picker } from '@react-native-picker/picker';
import AuthContext from '../context/AuthContext';
import FormErrorMsg from '../components/general/FormErrorMsg';

const RegisterScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext)

    //========================================================================================= 
    //form states
    const [userToken, setUserToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const [whatsapp, setWhatsapp] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');

    //errors
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [otpError, setOtpError] = useState(false);

    const [whatsappError, setWhatsappError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [areaError, setAreaError] = useState(false);

    //other states
    const [buttonLoading, setButtonLoading] = useState(false); //button get disabled while loading
    const [otpSent, setOtpSent] = useState(false);
    const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
    const [showResend, setShowResend] = useState(false);

    const [buttonTitle, setButtonTitle] = useState('Send OTP');

    const [logData, setLogData] = useState(log_data);

    const [cityList, setCityList] = useState(null);
    const [areaList, setAreaList] = useState(null);

    //=========================================================================================

    useEffect(()=>{
        fetchCities()
    },[])

    const fetchCities = async () => {
        const res = await getCities();
        setCityList(res);
    }

    const setCityFunc = async (cityId) => {
        setCity(cityId);
        fetchAreas(cityId);
    }

    const fetchAreas = async (cityId) => {
        setArea('');
        setAreaList(null);
        const res = await getAreasByCityId(cityId);
        setAreaList(res);
    }

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

            // Validation for City
            if (!city) {
                setCityError(true);
                isValid = false;
            } else {
                setCityError(false);
            }

            // Validation for Area
            if (!area) {
                setAreaError(true);
                isValid = false;
            } else {
                setAreaError(false);
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
                    await login();

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
                        log_userCity: verifyData.payload.user.cities_city_id,
                        log_userArea: verifyData.payload.user.areas_area_id,
                    };

                    // Call saveAsyncStorage and wait for it to complete
                    await saveAsyncStorage(updatedLogData);
                    await login();

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
        setButtonLoading(true);
        
        const formData = new FormData();

        formData.append('name', name);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('whatsapp', whatsapp);
        formData.append('user_phone', phoneNumber);
        formData.append('city', city);
        formData.append('area', area);

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
                log_userCity: city,
                log_userArea: area,
                };

                // Call saveAsyncStorage and wait for it to complete
                await saveAsyncStorage(updatedLogData);
                await login();

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
                                icon={<Ionicons name="call-outline" size={24} color={colors.textGray} />}
                                editable={true}
                                maxLength={9}
                            />

                            {phoneNumberError && (
                                <FormErrorMsg msg={'Check your phone number again!'} />
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
                                icon={<MaterialCommunityIcons name="form-textbox-password" size={24} color={colors.textGray} />}
                                editable={true}
                                maxLength={4}
                            />

                            {otpError && (
                                <FormErrorMsg msg={'Check your OTP again!'} />
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
                                icon={<Ionicons name="call-outline" size={24} color={colors.textGray} />}
                                editable={false}
                                disabled={true}
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
                                icon={<Ionicons name="logo-whatsapp" size={24} color={colors.textGray} />}
                                editable={true}
                                maxLength={9}
                            />

                            {whatsappError && (
                                <FormErrorMsg msg={'Check your WhatsApp Number again!'} />
                            )}

                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Enter Your Name</Text>    
                            <Input
                                keyboardType={'default'}
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholder={'Name Here'}
                                icon={<Feather name="user" size={24} color={colors.textGray} />}
                                editable={true}
                            />

                            {nameError && (
                                <FormErrorMsg msg={'Name should have more than 4 letters!'} />
                            )}
                        </View>

                        <View style={styles.formGroup}>

                            <Text style={styles.formLabelStyles}>Enter Your Email Address</Text>    
                            <Input
                                keyboardType={'default'}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder={'Email Here'}
                                icon={<Entypo name="email" size={24} color={colors.textGray} />}
                                editable={true}
                            />

                            {emailError ? (
                                <FormErrorMsg msg={'Check your Email again!'} />
                            ) : (
                                ''
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Select Your City</Text>
                            <View style={styles.dropDownStyles}>
                                <Picker
                                    selectedValue={city}
                                    onValueChange={(itemValue, itemIndex) => setCityFunc(itemValue)}
                                >
                                    <Picker.Item 
                                        key={0} 
                                        label={'Select Your City'} 
                                        value={''} 
                                    />
                                    
                                    {cityList &&
                                    cityList.map((city) => (
                                        <Picker.Item 
                                            key={city.city_id} 
                                            label={city.city} 
                                            value={city.city_id} 
                                        />
                                    ))}
                                </Picker>
                            </View>
                            {cityError && (
                                <FormErrorMsg msg={'Select a City!'} />
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Select Your Area</Text>
                            <View style={styles.dropDownStyles}>
                                <Picker
                                    selectedValue={area}
                                    onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
                                >
                                    {
                                        city ? (
                                            <Picker.Item 
                                                key={0} 
                                                label={'Select Your Area'} 
                                                value={''} 
                                            />
                                        ) : (
                                            <Picker.Item 
                                                key={0} 
                                                label={'Select A City First'} 
                                                value={''} 
                                            />
                                        )
                                    }

                                    
                                    {
                                        areaList &&
                                            areaList.map((area) => (
                                                <Picker.Item 
                                                    key={area.area_id} 
                                                    label={area.area} 
                                                    value={area.area_id} 
                                                />
                                            ))
                                    }
                                </Picker>
                            </View>

                            {areaError && (
                                <FormErrorMsg msg={'Select an Area!'} />
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabelStyles}>Enter Your Address</Text>    
                            <Input
                                keyboardType={'default'}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder={'Address Here'}
                                icon={<Ionicons name="home-outline" size={24} color={colors.textGray} />}
                                editable={true}
                                multiline={true}
                                textArea={true}
                            />

                            {addressError && (
                                <FormErrorMsg msg={'Check your Address again!'} />
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

                {!phoneNumberVerified && 
                    showResend && (
                        <TouchableOpacity onPress={resendButtonClick}>
                            <Text style={styles.resendButton}>Resend OTP</Text>
                        </TouchableOpacity>
                    )
                }
                </View>
            </View>


        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 20,
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
    dropDownStyles: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        marginBottom: 10,
    },
})