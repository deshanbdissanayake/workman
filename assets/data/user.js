import AsyncStorage from '@react-native-async-storage/async-storage';

// After clicking the Send OTP button
const sendOtp = async (phoneNumber) => {
  const url = `https://jobs2.introps.com/App_auth/auth_mobile?mob=${phoneNumber}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Failed to send OTP request in user.js:', error);
    return { payload: "Error", ref: "", stt: "error" };
  }
  //return { payload: "ok", ref: "", stt: "ok" }; 
};

// Verify phone number after confirming OTP
const verifyNumber = async (phoneNumber, otp) => {
  const url = `https://jobs2.introps.com/App_auth/auth_otp?mob=${phoneNumber}&otp=${otp}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Failed to verify request in user.js:', error);
    return { payload: "Error", ref: "", stt: "error" };
  }
};

// Save user details
const saveUser = async (formData) => {
  try {
    const data = await AsyncStorage.getItem('log_data');
    
    if (!data) {
      console.log('log_data does not exist in AsyncStorage (user.js)');
      return { payload: "Error", ref: "", stt: "error" };
    }
    
    const logData = JSON.parse(data);
    const userToken = logData.log_userToken;
    
    const url = `https://jobs2.introps.com/App_auth/save_udetail?token=${userToken}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };

    //console.log('formdata',formData)

    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Failed to save user in user.js:', error);
    return { payload: "Error", ref: "", stt: "error" };
  }
};

//validate user
const validateUser = async (userNumber, userToken) =>{

  try {
    const url = 'https://jobs2.introps.com/App_api/userValidity';
  
    const headers = {
      'userToken': userToken,
      'userPhone': userNumber
    };
  
    const options = {
      method: 'GET',
      headers: headers,
    };
  
    const response = await fetch(url, options);
    const json = await response.json();

    // Check if the response is 0
    if (json == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  
}

const saveAsyncStorage = async (asyncData) => {
  try {
    const logDataString = JSON.stringify(asyncData);
    await AsyncStorage.setItem('log_data', logDataString);
    
  } catch (error) {
    console.error('Error saving log_data to AsyncStorage:', error);
  }
};

export { sendOtp, verifyNumber, saveUser, validateUser, saveAsyncStorage };
