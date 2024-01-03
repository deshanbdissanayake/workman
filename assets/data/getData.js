import AsyncStorage from "@react-native-async-storage/async-storage";

const getCategories = async () => {
  const url = 'https://jobs2.introps.com/App_api/get_all_categories';
  let result = null;
  try{
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(e){
    console.log('something went wrong getting categories', e)
  }finally{
    return result;
  }
}

const getLatestStories = async () => {
  const url = 'https://jobs2.introps.com/App_api/get_all_stories';
  let result = null;
  try{
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(e){
    console.log('something went wrong getting categories', e)
  }finally{
    return result;
  }
}

const getSlides = async () => {
  const url = 'https://jobs2.introps.com/App_api/get_all_slides';
  let result = null;
  try{
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(e){
    console.log('something went wrong getting categories', e)
  }finally{
    return result;
  }
}

const getCities = async () => {
  const url = 'https://jobs2.introps.com/App_api/get_all_cities';
  let result = null;
  try{
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(e){
    console.log('something went wrong getting categories', e)
  }finally{
    return result;
  }
}

const getAreasByCityId = async (cityId) => {
  const url = `https://jobs2.introps.com/App_api/get_areas_by_city_id/${cityId}`;
  let result = null;
  try{
    const response = await fetch(url);
    const data = await response.json();
    result = data;
  }catch(e){
    console.log('something went wrong getting categories', e)
  }finally{
    return result;
  }
}

const getMyBookings = async () => {
  const data = await AsyncStorage.getItem('log_data');
  let result = null;

  if (!data || data === '') {
    console.log('log_data does not exist in AsyncStorage (saveData.js)');
    return result;
  } else {
    const logData = JSON.parse(data);
    const userToken = logData.log_userToken;

    const url = `https://jobs2.introps.com/App_api/get_my_bookings/${userToken}`;
    
    try {
      const response = await fetch(url);
      const getData = await response.json();
      result = getData;
    } catch (e) {
      console.log('something went wrong getting my bookings', e);
    } finally {
      return result;
    }

  }
};

const getUserData = async () => {
  const data = await AsyncStorage.getItem('log_data');
  let result = null;

  if (!data || data === '') {
    console.log('log_data does not exist in AsyncStorage (saveData.js)');
    return result;
  } else {
    const logData = JSON.parse(data);
    const userToken = logData.log_userToken;

    const url = `https://jobs2.introps.com/App_api/get_user_details/${userToken}`;
    
    try {
      const response = await fetch(url);
      const getData = await response.json();
      result = getData;
    } catch (e) {
      console.log('something went wrong getting user data', e);
    } finally {
      return result;
    }

  }
}


const getProducts = async () => {
  /*
  const data = await AsyncStorage.getItem('log_data');
  let result = null;

  if (!data || data === '') {
    console.log('log_data does not exist in AsyncStorage (saveData.js)');
    return result;
  } else {
*/
    const url = `https://jobs2.introps.com/App_api/get_products`;
    
    try {
      const response = await fetch(url);
      const getData = await response.json();
      result = getData;
    } catch (e) {
      console.log('something went wrong getting products', e);
    } finally {
      return result;
    }

  //}
};

export { getCategories, getLatestStories, getSlides, getCities, getAreasByCityId, getMyBookings, getUserData, getProducts };