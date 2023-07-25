import AsyncStorage from "@react-native-async-storage/async-storage";

// get and save userToken in AsyncStorage
const authenticateUser = async (username, password) => {
    let userToken = '1234';
    return userToken
    /*try {
      const url = '';
  
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
    }*/
  };
  
export { authenticateUser }