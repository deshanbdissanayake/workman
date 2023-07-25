import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const getStatusAndIcon = (ordStatus, driverFeedback) => {
  //console.log('ordStatus', ordStatus, '----', 'driverFeedback', driverFeedback)
  let status;
  let icon;
  
  if (ordStatus === 'pending') {
    status = 'Pending';
    icon = <MaterialIcons name="pending-actions" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'processing') {
    status = 'Processing';
    icon = <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'active') {
    status = 'Active';
    icon = <AntDesign name="playcircleo" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'driver_pending') {
    status = 'Driver Assign Pending';
    icon = <SimpleLineIcons name="user-follow" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'driver_assigned') {
    status = 'Assigned to you';
    icon = <SimpleLineIcons name="user-following" size={24} color={colors.primaryDark} />;

  } else if (ordStatus === 'delivery_pending' && driverFeedback === 'active') {
    status = 'On going';
    icon = <Feather name="map-pin" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'delivery_pending' && driverFeedback === 'delivered') {
    status = 'Marked Delivered';
    icon = <Feather name="map-pin" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'delivery_pending' && driverFeedback === 'returned') {
    status = 'Marked Returned';
    icon = <Feather name="map-pin" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'delivery_pending' && driverFeedback === 'no_answer') {
    status = 'Marked No Answer';
    icon = <Feather name="map-pin" size={24} color={colors.primaryDark} />;

  } else if (ordStatus === 'delivered' && driverFeedback === 'settled') {
    status = 'Settled';
    icon = <AntDesign name="checksquareo" size={24} color={colors.primaryDark} />;

  } else if (ordStatus === 'return_accepted') {
    status = 'Return Accepted';
    icon = <AntDesign name="checkcircleo" size={24} color={colors.primaryDark} />;
  } else if (ordStatus === 'returned') {
    status = 'Returned';
    icon = <MaterialIcons name="assignment-return" size={24} color={colors.primaryDark} />;
  } else {
    status = 'Error';
    icon = <MaterialIcons name="error-outline" size={24} color={colors.gray} />;
  }
  
  return { status, icon };
  
};

const SingleOrderHistory = ({ data }) => {
    return (
        <View style={styles.cardStyles}>
        <Text style={styles.historyMainTitleStyles}>Order History</Text>
        <View>
            {data.length > 0 ? (
            data.map((item, index) => {
                const { status, icon } = getStatusAndIcon(item.ord_status, item.driver_feedback);
                return (
                <View key={index} style={styles.historyItemWrapper}>
                    <View style={styles.historyIconWrapper}>{icon}</View>
                    <View>
                    <Text style={styles.historyTitleStyles}>{status}</Text>
                    <Text style={styles.historyDateStyles}>{item.c_date}</Text>
                    </View>
                </View>
                );
            })
            ) : (
            <View>
                <Text style={styles.historyDateStyles}>No History</Text>
            </View>
            )}
            <View style={styles.backLineStyles}></View>
        </View>
        </View>
    );
};

export default SingleOrderHistory;

const styles = StyleSheet.create({
    cardStyles: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    historyMainTitleStyles: {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 10,
    },
    historyItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    historyIconWrapper: {
        padding: 10,
        backgroundColor: colors.bgLight,
        borderColor: colors.primaryDark,
        borderWidth: 1,
        marginRight: 20,
        borderRadius: 50,
    },
    historyTitleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
        marginBottom: 2,
    },
    historyDateStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGray,
    },
    backLineStyles : {
        borderLeftWidth: 1, 
        borderLeftColor: 'red', 
        zIndex: -1, 
        height: '100%', 
        position:'absolute', 
        left: 22, 
    }
});
