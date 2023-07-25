import AsyncStorage from "@react-native-async-storage/async-storage";

const getAllOrders = async ( orderStatus = "all", driverStatus = "all" ) => {
    let data = null;
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        const response = await fetch(`https://deliver.introps.com/Api_delivery_app/get_all_orders/${userToken}/${orderStatus}/${driverStatus}`);
        data = await response.json();
    } catch (e) {
        console.log('error fetching orders', e);
    } finally {
        return data;
    }

};

const markDriverFeedback = async (order_id, status) => {
    let data = {'stt': 'error', 'msg': 'Check your Network Connection!', 'data': ''}
    try {
        const userToken = await AsyncStorage.getItem('userToken');

        const url = 'https://deliver.introps.com/Api_delivery_app/mark_driver_feedback';
  
        const body = {
            order_id: order_id,
            status: status,
        };
    
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                userToken: userToken,
            },
        };
    
        const response = await fetch(url, options);
        data = await response.json();
    } catch(e) {
        console.log('error fetching orders', e);
    } finally {
        return data;
    }
}

const acceptOrders = async (acceptItem) => {
    let data = {'stt': 'error', 'msg': 'Check your Network Connection!', 'data': ''}

    try {
        const userToken = await AsyncStorage.getItem('userToken');

        const url = `https://deliver.introps.com/Api_delivery_app/driver_accept_orders`;
  
        const body = {
            acceptItem: acceptItem
        };
    
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                userToken: userToken,
            },
        };
    
        const response = await fetch(url, options);
        data = await response.json();
        console.log(data)
    } catch (e) {
        console.log('error fetching orders', e);
    } finally {
        return data;
    }
}


export { getAllOrders, acceptOrders, markDriverFeedback }