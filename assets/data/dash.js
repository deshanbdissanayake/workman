import AsyncStorage from "@react-native-async-storage/async-storage";

const getOrderCountByStatus = async (startDate, endDate) => {
    let data = {
        "pending": 0,
        "delivered": 0,
        "no_answer": 0,
        "returned": 0
      }

    try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(`https://deliver.introps.com/Api_delivery_app/getOrderCountByStatus/${userToken}/${startDate}/${endDate}`);
        data = await response.json();
    } catch (e) {
        console.log('error fetching orders', e);
    } finally {
        return data;
    }
}

const getFinancialData = async (startDate, endDate) => {
    let data = null;
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(`https://deliver.introps.com/Api_delivery_app/getFinancialData/${userToken}/${startDate}/${endDate}`);
        data = await response.json();
    } catch (e) {
        console.log('error fetching orders', e);
    } finally {
        return data;
    }
}

export { getOrderCountByStatus, getFinancialData }