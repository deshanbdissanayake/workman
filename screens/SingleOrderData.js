import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'

const SingleOrderData = ({data}) => {
    const {
        order_desc,
        order_date,
        order_token,
        order_status,
        pkg_weight,
        client_name,
        client_contact_1,
        client_contact_2,
        waybill_no,
        recv_name,
        recv_contact_1,
        recv_contact_2,
        recv_address,
        type,
        amount,
        discount,
        del_fee,
        driver_feedback,
        driver_m_date,
    } = data;

    const handleCall = () => {
        Linking.openURL(`tel:${recv_contact_1}`)
            .catch(error => console.error('Error opening phone app:', error));
    }

    return (
        <View style={styles.container}>
            <View style={[styles.callWrapper, styles.cardStyles]}>
                <View style={styles.callNameWrapper}>
                    <Text style={styles.receiverNameStyles}>{recv_name}</Text>
                    <Text style={styles.receiverAddrStyles}>{recv_address}</Text>
                </View>
                <TouchableOpacity onPress={handleCall}>
                    <View style={styles.callBtnWrapper}>
                        <View style={styles.callBtnStyles}>
                            <Ionicons name="call" size={24} color={colors.textDark} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.cardStyles}>
                <View style={styles.orderTopWrapper}>
                    <View style={styles.orderTopLeftWrapper}>
                        <Text style={styles.orderNumStyles}>#{order_token}</Text>
                        <Text style={styles.orderDateStyles}>{order_date}</Text>
                    </View>
                    <View>
                        <Text style={styles.orderTypeStyles}>{type}</Text>
                    </View>
                </View>
                <View style={styles.orderBottomWrapper}>
                    <Text style={styles.orderWeightStyles}>Package Weight : {pkg_weight}kg</Text>
                    <Text style={styles.orderDescStyles}>{order_desc}</Text>
                </View>
                <View>
                    <View style={styles.priceRowWrapper}>
                        <Text style={styles.priceRowTitle}>Amount</Text>
                        <Text style={styles.priceRowAmount}>{(parseFloat(amount)).toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRowWrapper}>
                        <Text style={styles.priceRowTitle}>Discount</Text>
                        <Text style={styles.priceRowAmount}>{(parseFloat(discount)).toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRowWrapper}>
                        <Text style={styles.priceRowTitle}>Delivery</Text>
                        <Text style={styles.priceRowAmount}>{(parseFloat(del_fee)).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.priceRowWrapper, styles.totalAmountWrapper]}>
                        <Text style={styles.totalAmountTitleStyles}>Total</Text>
                        <Text style={styles.totalAmountStyles}>{(parseFloat(amount)-parseFloat(discount)+parseFloat(del_fee)).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SingleOrderData

const styles = StyleSheet.create({
    container : {
        marginBottom: 10,
    },
    cardStyles : {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        //borderWidth: 1,
        //borderColor: colors.border,
        marginBottom: 10,
    },
    callWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    callNameWrapper : {
        flex: 4,
        marginRight: 5,
    },
    receiverNameStyles : {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
    },
    receiverAddrStyles : {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textGray,
    },
    callBtnWrapper : {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    callBtnStyles : {
        backgroundColor: colors.secondary, 
        padding: 15, 
        borderRadius: 50,
    },
    orderTopWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderTopLeftWrapper : {
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        paddingLeft: 10,
    },
    orderNumStyles : {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
    },
    orderDateStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGray,
    },
    orderTypeStyles : {
        backgroundColor: colors.border,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
    },
    orderBottomWrapper : {
        marginBottom: 10,
    },
    orderWeightStyles : {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        marginBottom: 2,
    },
    orderDescStyles : {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
    },
    priceRowWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceRowTitle : {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
    },
    priceRowAmount : {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
    },
    totalAmountWrapper : {
        borderTopColor: colors.border,
        borderTopWidth: 1,
        marginTop: 5,
        paddingTop: 5,
    },
    totalAmountTitleStyles : {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
    },
    totalAmountStyles : {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.primaryDark,
    },
})