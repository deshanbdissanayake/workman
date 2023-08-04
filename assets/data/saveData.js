import AsyncStorage from "@react-native-async-storage/async-storage";

const saveBookingJob = async (formData) => {
  let result = { stt: 'error', msg: 'Something went wrong, please try again!', data: '' };
  try {
    const data = await AsyncStorage.getItem('log_data');
  
    if (!data || data.log_userToken === '') {
      console.log('log_data does not exist in AsyncStorage (saveData.js)');
      result = { stt: 'error', msg: 'Please Sign in before continue!', data: '' };
    }else{
        const logData = JSON.parse(data);
        const userToken = logData.log_userToken;
    
        const url = `https://jobs2.introps.com/App_api/save_booking_job?token=${userToken}`;
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
    
        const response = await fetch(url, options);
        result = await response.json();
    }

  } catch (error) {
    console.error('Save booking job error', error);
  } finally {
    return result;
  }
  
}

const saveJobRating = async (formData) => {
  let result = { stt: 'error', msg: 'Something went wrong, please try again!', data: '' };
  try {
    const data = await AsyncStorage.getItem('log_data');
  
    if (!data || data.log_userToken === '') {
      console.log('log_data does not exist in AsyncStorage (saveData.js)');
      result = { stt: 'error', msg: 'Please Sign in before continue!', data: '' };
    }else{
        const logData = JSON.parse(data);
        const userToken = logData.log_userToken;
    
        const url = `https://jobs2.introps.com/App_api/rate_job?token=${userToken}`;
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
    
        const response = await fetch(url, options);
        result = await response.json();
    }

  } catch (error) {
    console.error('Save booking job error', error);
  } finally {
    return result;
  }
  
}

const updateUserDetails = async (formData) => {
  let result = { stt: 'error', msg: 'Something went wrong, please try again!', data: '' };
  try {
    const data = await AsyncStorage.getItem('log_data');
  
    if (!data || data.log_userToken === '') {
      console.log('log_data does not exist in AsyncStorage (saveData.js)');
      result = { stt: 'error', msg: 'Please Sign in before continue!', data: '' };
    }else{
        const logData = JSON.parse(data);
        const userToken = logData.log_userToken;
    
        const url = `https://jobs2.introps.com/App_api/update_user_details?token=${userToken}`;
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
    
        const response = await fetch(url, options);
        result = await response.json();
    }

  } catch (error) {
    console.error('update user error saveData.js', error);
  } finally {
    return result;
  }
  
}

export { saveBookingJob, saveJobRating, updateUserDetails };
