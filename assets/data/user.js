import AsyncStorage from "@react-native-async-storage/async-storage";

// get and save userToken in AsyncStorage
const authenticateUser = async (username, password) => {
    let userToken = null;
    try {
      const url = 'https://deliver.introps.com/api_delivery_app/authenticate_user';
  
      const body = {
        username: username,
        password: password,
      };
  
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, options);
      const json = await response.json();
  
      // Check if the response is 'ok'
      if (json.stt === 'ok') {
        userToken = json.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return userToken;
    }
  };
  

// check AsyncStorage userToken with Database
const validateUser = async () => {
    let result = false;

    try{
        const userToken = await AsyncStorage.getItem('userToken');
        const url = `https://deliver.introps.com/api_delivery_app/validate_user/${userToken}`;
        const response = await fetch(url);
        result = response;
    }catch(error){
        console.error(error);
    }finally{
        return result;
    }

}

// get user notifications
const getNotificationsByUserId = async () => {
  let result = null;
  try{
    const userToken = await AsyncStorage.getItem('userToken');
    const url = `https://deliver.introps.com/api_delivery_app/get_notifications_by_user_id/${userToken}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.length > 0){
      result = data;
    }
  }catch(error){
    console.error(error);
  }finally{
    return result;
  }
}

// mark as read user notifications
const markReadNotifications = async (nu_id) => {
  let result = {'stt': 'error', 'msg': 'Something went wrong. Try Again later!', 'data': ''};
  try{
    const userToken = await AsyncStorage.getItem('userToken');
    const url = `https://deliver.introps.com/api_delivery_app/mark_read_notifications/${userToken}/${nu_id}`;
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(error){
    console.error(error);
  }finally{
    return result;
  }
}

export { authenticateUser, validateUser, getNotificationsByUserId, markReadNotifications }