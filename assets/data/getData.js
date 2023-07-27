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



export { getCategories, getLatestStories, getSlides, getCities, getAreasByCityId };