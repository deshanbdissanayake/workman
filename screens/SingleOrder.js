import { BackHandler, DeviceEventEmitter, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import MiniButton from '../components/MiniButton'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'
import SingleOrderData from './SingleOrderData'
import SingleOrderHistory from './SingleOrderHistory'
import Button from '../components/Button'
import { markDriverFeedback } from '../assets/data/order'
import CustomModal from '../components/CustomModal'
import CustomAlert from '../components/CustomAlert'
import { useFocusEffect } from '@react-navigation/native';

const SingleOrder = ({ route, navigation }) => {
    const { orderData } = route.params;

    const [modalContent, setModalContent] = useState({ title : '', content : '' });

    const [showAlert, setShowAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [status, setStatus] = useState(orderData.driver_feedback);
    const [driverFeedback, setDriverFeedback] = useState(orderData.driver_feedback);

    const [refresh, setRefresh] = useState(false);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const removeChangedItem = () => {
        DeviceEventEmitter.emit('removeChangedItem', orderData.order_id);
    }
      
    
    // Use useFocusEffect hook to hide the CustomAlert when the screen gains focus
    useFocusEffect(
        useCallback(() => {
            return () => {
                handleModalCancel()
            };
        }, [])
    );

    const handleDriverFeedback = (status) => {
        let title, content;
        if (status === 'returned') {
            title = 'Mark Returned';
            content = 'Are you sure to mark this order as returned?';
        } else if (status === 'no_answer') {
            title = 'Mark No Answer';
            content = 'Are you sure to mark this order as no answer?';
        } else if (status === 'delivered') {
            title = 'Mark Delivered';
            content = 'Are you sure to mark this order as delivered?';
        }
        setModalContent({ title, content });
        setStatus(status);
        setShowAlert(true);
    };


    const handleModalCancel = () => {
        setStatus(orderData.driver_feedback);
        setShowAlert(false);
        setSuccessMessage({});
        setModalContent({ title : '', content : '' })
    }

    const handleModalOk = () => {
        handleDriverFeedbackFunc();
    }

    const handleDriverFeedbackFunc = async () => {
        setRefresh(true)
        const response = await markDriverFeedback(orderData.order_id, status);
        setRefresh(false)
        setShowAlert(false); // Hide the confirmation modal

        if(response.stt === 'ok'){
            removeChangedItem()
            setSuccessMessage({ type: 'success', msg: response.msg });
            setDriverFeedback(status)
        }else{
            setSuccessMessage({ type: 'danger', msg: response.msg });
        }

        // Show the alert for 1 second and then clear the success message
        setTimeout(() => {
            setSuccessMessage({});
        }, 700);
    }


    return (
        <>
        <View style={styles.container}>
            <MiniButton
                bgColor={colors.border}
                func={handleBackButton}
                content={<Ionicons name="chevron-back" size={18} color={colors.textDark} />}
            />
            <ScrollView style={styles.singleOrderWrapper} showsVerticalScrollIndicator={false} >

                <SingleOrderData data={orderData} />
                <SingleOrderHistory data={orderData.order_history} />

                {(driverFeedback === 'active' || driverFeedback === 'no_answer') ? (
                    <View style={styles.buttonSetWrapper}>
                        <Button
                            bgColor={colors.border}
                            txtColor={colors.textDark}
                            text={'Mark Returned'}
                            func={()=>handleDriverFeedback('returned')}
                        />
                        <Button
                            bgColor={colors.border}
                            txtColor={colors.textDark}
                            text={'Mark No Answer'}
                            func={()=>handleDriverFeedback('no_answer')}
                        />
                        <Button
                            bgColor={colors.primary}
                            txtColor={colors.textLight}
                            text={'Mark Delivered'}
                            func={()=>handleDriverFeedback('delivered')}
                        />
                    </View>
                ) : (
                    <View style={styles.buttonSetWrapper}>
                        <Text style={styles.driverFeedbackStyles}>
                            {driverFeedback === 'returned' ? 'Returned' : driverFeedback === 'no_answer' ? 'No Answer' : driverFeedback === 'delivered' ? 'Delivered' : ''}
                        </Text>
                    </View>
                )
                }
            </ScrollView>
        </View>
            {showAlert && (
                <View style={styles.alertStyles}>
                    <CustomModal
                        title={modalContent.title}
                        content={modalContent.content}
                        cancelButtonText={'Cancel'}
                        okButtonText={'Confirm'}
                        pressCancel={handleModalCancel}
                        pressOk={handleModalOk}
                        refresh={refresh}
                    />
                </View>
            )}
            {Object.keys(successMessage).length > 0 && (
                <View style={styles.alertStyles}>
                    <CustomAlert type={successMessage.type} msg={successMessage.msg} />
                </View>
            )}
        </>
    )
}

export default SingleOrder

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    singleOrderWrapper : {
        marginTop: 20,
    },
    buttonSetWrapper : {
        marginBottom: 20,
    },
    driverFeedbackStyles: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        fontFamily: 'ms-semibold',
        fontSize: 16,
        color: colors.textLight,
    },
    alertStyles: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})