import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { Ionicons } from 'react-native-vector-icons';
import colors from '../assets/colors/colors';

import { sendOtp, verifyNumber, saveUser } from '../assets/data/user';
//import AuthContext from '../context/AuthContext';

const RegistrationScreen = ({ asyncLogData }) => {

  //const { saveAsyncStorage } = useContext(AuthContext)

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
  const [showResend, setShowResend] = useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);

  const [logData, setLogData] = useState(asyncLogData);

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
        await saveAsyncStorage(updatedLogData, 'register_required');

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
        await saveAsyncStorage(updatedLogData, 'registered');

        // Check the updated logData.log_status value
        //navigation.navigate('Home');

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
        await saveAsyncStorage(updatedLogData, 'registered');

        // Check the updated logData.log_status value
        //navigation.navigate('Home');

        //clearAsyncStorage();
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

  const goBack = () => {
    setOtp('');
    setOtpSent(false);
    setShowResend(false);
    setPhoneNumberVerified(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {(otpSent && !phoneNumberVerified) ? (
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ): ('')}

        <View style={styles.registrationWrapper}>
          <Text style={styles.registrationTitle}>Get Started</Text>
          <Text style={styles.registrationDescription}>
            We extend a warm welcome to you! We hope you have a great experience with us.
          </Text>
        </View>
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
                <View style={styles.formContainer}>
                  <TextInput
                    style={[styles.input, styles.inputNumberCode, styles.disabled]}
                    placeholder="Enter phone number"
                    value={'+94'}
                    editable={false}
                  />
                  <TextInput
                    style={[styles.input, styles.inputNumber]}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                </View>

                {phoneNumberError ? (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>
                      Check your phone number again!
                    </Text>
                  </View>
                ) : (
                  ''
                )}
              </View>
            ) : (
              <View style={styles.formGroup}>
                <View>
                  <TextInput
                    style={[styles.input, styles.otpStyles]}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>

                {otpError ? (
                  <View style={styles.errorWrapper}>
                    <Text style={styles.errorMessage}>
                      Check your OTP again!
                    </Text>
                  </View>
                ) : (
                  ''
                )}
              </View>
            )}
            {/*==========================================================================*/}

            <View style={styles.formGroup}>
              {buttonLoading ? (
                <View style={[styles.buttonStyle, styles.buttonLoading]}>
                  <ActivityIndicator color={colors.white} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleButtonClick}>
                  <Text style={styles.buttonText}>
                    {!otpSent ? 'Send OTP' : 'Confirm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {showResend ? (
              <TouchableOpacity onPress={resendButtonClick}>
                <Text style={styles.resendButton}>Resend OTP</Text>
              </TouchableOpacity>
            ) : (
              ''
            )}

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
              <View style={styles.formContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputNumberCode,
                    styles.disabled,
                  ]}
                  value={'+94'}
                  editable={false}
                />
                <TextInput
                  style={[styles.input, styles.inputNumber, styles.disabled]}
                  value={phoneNumber}
                  maxLength={9}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputNumberCode,
                    styles.disabled,
                  ]}
                  value={'+94'}
                  editable={false}
                />
                <TextInput
                  style={[styles.input, styles.inputNumber]}
                  placeholder="Enter Phone Number 2"
                  value={whatsapp}
                  onChangeText={setWhatsapp}
                  maxLength={9}
                  keyboardType="numeric"
                />
              </View>
              {whatsappError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your WhatsApp Number again!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                />
              </View>

              {nameError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Name should have more than 4 letters!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  value={address}
                  onChangeText={setAddress}
                  keyboardType="default"
                />
              </View>

              {addressError ? (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorMessage}>
                    Check your Address again!
                  </Text>
                </View>
              ) : (
                ''
              )}
            </View>
            <View style={styles.formGroup}>
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="default"
                />
              </View>

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
              {buttonLoading ? (
                <View style={[styles.buttonStyle, styles.buttonLoading]}>
                  <ActivityIndicator color={colors.white} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={handleButtonClick}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              )}
            </View>

          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerWrapper: {
    flex: 2,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  registrationWrapper: {
    marginTop: 30,
  },
  registrationTitle: {
    color: colors.textDark,
    fontFamily: 'ms-bold',
    fontSize: 24,
    marginBottom: 10,
  },
  registrationDescription: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 20,
  },
  formWrapper: {
    flex: 4,
    backgroundColor: colors.bgLight,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formGroup: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  formContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  inputNumberCode: {
    flex: 2,
    marginRight: 5,
  },
  inputNumber: {
    flex: 8,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    fontFamily: 'ms-regular',
    fontSize: 12,
    color: colors.textDark,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
  },
  otpStyles: {
    textAlign: 'center',
  },
  buttonStyle: {
    minWidth: 220,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textDark,
  },
  buttonLoading: {
    backgroundColor: colors.gray,
  },
  buttonText: {
    fontFamily: 'ms-semibold',
    fontSize: 12,
    color: colors.white,
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
});
