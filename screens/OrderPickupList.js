import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import PickupCard from '../components/PickupCard';
import colors from '../assets/colors/colors';
import CustomModal from '../components/CustomModal';
import SecondaryButton from '../components/SecondaryButton';
import CustomAlert from '../components/CustomAlert';
import Button from '../components/Button'

import { acceptOrders, getAllOrders } from '../assets/data/order';

const OrderPickupList = () => {
  const [orders, setOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [acceptItem, setAcceptItem] = useState('');
  const [successMessage, setSuccessMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false); //modal refresh

  const fetchOrders = async () => {
    try {
        const data = await getAllOrders('driver_assigned', 'pending');
        setOrders(data);
    } catch (e) {
      console.log('error fetching data', e);
    } finally {
        setIsLoading(false);
        setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIsRefreshing(true);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  // Use useFocusEffect hook to hide the CustomAlert when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setShowAlert(false);
      return () => {
        // Cleanup function to reset showAlert when the screen loses focus
        setShowAlert(false);
        setSuccessMessage({});
        setAcceptItem('');
      };
    }, [])
  );

  const acceptOrdersFunc = async () => {
    setRefresh(true);
    const response = await acceptOrders(acceptItem);
    setRefresh(false);
    setShowAlert(false); // Hide the confirmation modal

    if (response.stt === 'ok') {
      setSuccessMessage({ type: 'success', msg: response.msg });
    } else {
      setSuccessMessage({ type: 'danger', msg: response.msg });
    }

    // Show the alert for 1 second and then clear the success message
    setTimeout(() => {
      setSuccessMessage({});
    }, 700);
  };

  const handleAccept = async (acceptOrder) => {
    setAcceptItem(acceptOrder);
    setShowAlert(true);
  };

  const handleModalCancel = () => {
    setAcceptItem('');
    setShowAlert(false);
  };

  const handleModalOk = async () => {
    await acceptOrdersFunc();
    setShowAlert(false);
  };

  const renderItem = ({ item }) => (
    <PickupCard pickupData={item} handleAccept={() => handleAccept(item.order_id)} />
  );

  return (
    <>
      <Header showSearch={false} name={'Order Pickup List'} searchFunc={''} />
      <View style={styles.container}>
        <View style={styles.acceptAllWrapper}>
          <View style={styles.acceptAllTextWrapper}>
            <Text style={styles.acceptAllTitleStyles}>Number of Packages : {String(orders.length).padStart(2, "0")}</Text>
            <Text style={styles.acceptAllSubtitleStyles}></Text>
          </View>
          <View>
            <SecondaryButton
              content={<Text style={styles.btnTextStyles}>Accept All</Text>}
              bgColor={colors.primary}
              func={() => handleAccept('all')}
            />
          </View>
        </View>

        {isLoading ? (
            <View style={styles.loadingStyles}>
                <ActivityIndicator size={'large'} color={colors.textDark}/>
            </View>
        ) : orders.length > 0 ? (
          <FlatList
            data={orders}
            renderItem={renderItem}
            keyExtractor={(item) => item.order_id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          />
        ) : (
          
            <>
                <Text style={styles.noDataText}>No Orders Available Yet</Text>

                <Button
                    bgColor={colors.white}
                    txtColor={colors.primaryDark}
                    text={'Reload Order List'}
                    func={()=>handleRefresh()} 
                />
            </>
        )}
      </View>
      {showAlert && (
        <View style={styles.alertStyles}>
          <CustomModal
            title={'Pick up Order'}
            content={'Have you picked up the order ?'}
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
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  noDataText: {
    backgroundColor: colors.border,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'ms-regular',
    fontSize: 12,
    borderRadius: 10,
    marginBottom: 10,
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
  acceptAllWrapper: {
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  acceptAllTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  acceptAllTitleStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 14,
    color: colors.textDark,
  },
  acceptAllSubtitleStyles: {
    fontFamily: 'ms-regular',
    fontSize: 12,
    color: colors.textGray,
  },
  btnTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 12,
    color: colors.textLight,
  },
  loadingStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrderPickupList;
