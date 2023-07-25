import { DeviceEventEmitter, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import colors from '../assets/colors/colors'
import SecondaryButton from './SecondaryButton'
import { useNavigation } from '@react-navigation/native'; 
import { useEffect } from 'react';

const OrderCard = ({ orderData, removedItem }) => {

    const navigation = useNavigation();

    const handleRemoveChangedItem = useCallback(
        (orderId) => {
        removedItem(orderId);
        },
        [removedItem]
    );

    useEffect(() => {
        const removeChangedItemListener = DeviceEventEmitter.addListener( 'removeChangedItem', handleRemoveChangedItem);

        return () => {
            removeChangedItemListener.remove();
        };
    }, [handleRemoveChangedItem]);

    const handleButtonClick = ({type, data}) => {
        if(type === 'more'){
            navigation.navigate('Single Order', { orderData: data.orderData });
        }else if(type === 'call'){
            Linking.openURL(`tel:${data}`)
            .catch(error => console.error('Error opening phone app:', error));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardTopWrapper}>
                <View style={styles.cardOrderDataWrapper}>
                    <View style={styles.cardOrderTextWrapper}>
                        <Text style={styles.cardOrderTokenStyles}>#{orderData.order_token}</Text>
                        <Text style={styles.cardOrderDateStyles}>Ord Date - {orderData.order_date}</Text>
                    </View>
                    <View style={styles.cardPriceWrapper}>
                        <Text style={styles.cardOrderPriceStyles}>{(parseFloat(orderData.amount) - parseFloat(orderData.discount) + parseFloat(orderData.del_fee)).toFixed(2)}</Text>
                    </View>
                </View>
                {
                    orderData.driver_feedback === 'pending' || orderData.driver_feedback === 'active' || orderData.driver_feedback === 'no_answer' ? (
                        <View style={styles.cardReceiverWrapper}>
                            <Text style={styles.cardReceiverNameStyles} numberOfLines={1}>{orderData.recv_name}</Text>
                            <Text style={styles.cardReceiverAddressStyles} numberOfLines={2}>{orderData.recv_address}</Text>
                        </View>
                    ) : (null)
                }

            </View>
            {
                orderData.driver_feedback === 'pending' || orderData.driver_feedback === 'active' || orderData.driver_feedback === 'no_answer' ? (
                    <View style={styles.cardBottomWrapper}>
                        <View style={styles.cardCallWrapper}>
                            <SecondaryButton
                                content={<Text style={[styles.cardButtonStyles, {color: colors.textDark}]}>Call 1</Text>}
                                bgColor={colors.border}
                                margin={{marginRight:10}}
                                func={() => handleButtonClick({type: 'call', data: orderData.recv_contact_1})}
                            />
                            {orderData.recv_contact_2 !== '' && (
                                <SecondaryButton
                                    content={<Text style={[styles.cardButtonStyles, {color: colors.textDark}]}>Call 2</Text>}
                                    bgColor={colors.border}
                                    func={() => handleButtonClick({type: 'call', data: orderData.recv_contact_2})}
                                />
                            )}
                        </View>
                        <View>
                            <SecondaryButton
                                content={<Text style={[styles.cardButtonStyles, {color: colors.textLight}]}>More</Text>}
                                bgColor={colors.primaryDark}
                                func={() => handleButtonClick({type: 'more', data: {orderData}})}
                            />
                        </View>
                    </View>
                ) : (
                    <View>
                        <SecondaryButton
                            content={<Text style={[styles.cardButtonStyles, {color: colors.textLight}]}>More</Text>}
                            bgColor={colors.primaryDark}
                            func={() => handleButtonClick({type: 'more', data: {orderData}})}
                        />
                    </View>
                )
            }
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    container : {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    cardTopWrapper : {
        marginBottom: 10,
    },
    cardOrderDataWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardOrderTextWrapper : {
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        borderRadius: 3,
        marginBottom: 10,
        paddingLeft: 10,
    },
    cardOrderTokenStyles : {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 5,
    },
    cardOrderDateStyles : {
        fontFamily: 'ms-regular',
        fontSize: 10,
        color: colors.textGray,
    },
    cardPriceWrapper : {
        
    },
    cardOrderPriceStyles : {
        fontFamily: 'ms-bold',
        fontSize: 20,
        color: colors.primaryDark,
    },
    cardReceiverWrapper : {
        marginBottom: 5,
    },
    cardReceiverNameStyles : {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 2,
    },
    cardReceiverAddressStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGray,
    },
    cardBottomWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardCallWrapper : {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardButtonStyles : {
        fontFamily: 'ms-regular',
    },
})