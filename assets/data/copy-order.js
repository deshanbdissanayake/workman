const getAllOrders = async ( status = "all" ) => {
    /*try {
        const response = await fetch('your-api-url/orders'); // Replace 'your-api-url' with the actual URL
        const data = await response.json();
        return data;
    } catch (e) {
        console.log('error fetching orders', e);
        throw e;
    }*/

    const data = [
        {
            order_id : 1,
            order_desc : 'this is the order description',
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 5,

            recv_name : 'Deshan Dissanayake Deshan Dissanayake Deshan Dissanayake',
            recv_contact_1 : '0714124766',
            recv_contact_2 : '0714124766',
            recv_address : 'Peradeniya Rd, Gannoruwa',

            type : 'cod',
            amount : 2500.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'pending',
            driver_m_date : '',

            order_history : [
                {
                    ord_his_id : 1,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 2,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 3,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 4,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
        {
            order_id : 2, 
            order_desc : 'this is the order 2 description', 
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 3,

            recv_name : 'Nadun Tharaka', 
            recv_contact_1 : '0714124766', 
            recv_contact_2 : '0714124766', 
            recv_address : '212/1, Uduwawala , Katugastota, kandy', 

            type : 'cod', 
            amount : 3400.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'delivered',
            driver_m_date : '2023-07-12',

            order_history : [
                {
                    ord_his_id : 5,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 6,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 7,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 8,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
        {
            order_id : 3, 
            order_desc : 'this is the order 2 description', 
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 3,

            recv_name : 'Anu Ariyasena', 
            recv_contact_1 : '0714124766', 
            recv_contact_2 : '0714124766', 
            recv_address : '212/1, Uduwawala , Katugastota, kandy', 

            type : 'cod', 
            amount : 3400.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'return',
            driver_m_date : '2023-07-12',

            order_history : [
                {
                    ord_his_id : 5,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 6,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 7,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 8,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
        {
            order_id : 4, 
            order_desc : 'this is the order 2 description', 
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 3,

            recv_name : 'Sampath Wickamasinghe', 
            recv_contact_1 : '0714124766', 
            recv_contact_2 : '0714124766', 
            recv_address : '212/1, Uduwawala , Katugastota, kandy', 

            type : 'cod', 
            amount : 3400.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'no_answer',
            driver_m_date : '2023-07-12',

            order_history : [
                {
                    ord_his_id : 5,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 6,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 7,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 8,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
        {
            order_id : 5, 
            order_desc : 'this is the order 2 description', 
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 3,

            recv_name : 'Sampath Wickamasinghe', 
            recv_contact_1 : '0714124766', 
            recv_contact_2 : '0714124766', 
            recv_address : '212/1, Uduwawala , Katugastota, kandy', 

            type : 'cod', 
            amount : 3400.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'pending',
            driver_m_date : '2023-07-12',

            order_history : [
                {
                    ord_his_id : 5,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 6,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 7,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 8,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
        {
            order_id : 6, 
            order_desc : 'this is the order 2 description', 
            order_date : '2023-07-11',
            order_token : '1100011085555',
            order_status : 'driver_assigned',
            pkg_weight : 3,

            recv_name : 'Sampath Wickamasinghe', 
            recv_contact_1 : '0714124766', 
            recv_contact_2 : '0714124766', 
            recv_address : '212/1, Uduwawala , Katugastota, kandy', 

            type : 'cod', 
            amount : 3400.00,
            discount : 0.00,
            del_fee : 0.00,

            driver_feedback : 'delivered',
            driver_m_date : '2023-07-12',

            order_history : [
                {
                    ord_his_id : 5,
                    ord_status : 'pending',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 6,
                    ord_status : 'processing',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 7,
                    ord_status : 'active',
                    c_date : '2023-07-11'
                },
                {
                    ord_his_id : 8,
                    ord_status : 'driver_assigned',
                    c_date : '2023-07-11'
                },
            ]
        },
    ]

    return data;
};

const acceptOrders = async () => {
    return {'stt': 'ok', 'msg': 'Accepted successfully!', 'data': '1'}
}

const markDriverFeedback = async (order_id, status) => {
    return {'stt': 'ok', 'msg': 'Accepted successfully!', 'data': status}
}

export { getAllOrders, acceptOrders, markDriverFeedback }