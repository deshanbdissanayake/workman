import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { Ionicons } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton';
import colors from '../assets/colors/colors';
import { getMyBookings } from '../assets/data/getData';
import NoData from '../components/app/NoData';
import CardMyBooking from '../components/app/CardMyBooking';

const MyBookingList = ({ navigation }) => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };



  const getMyBookingsFunc = async () => {
    setLoading(true);
    try {
      const response = await getMyBookings();
      setBookings(response);
    } catch (error) {
      console.error('Get Booking Func error', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getMyBookingsFunc();
  };

  useFocusEffect(
    React.useCallback(() => {
      getMyBookingsFunc(); // This will be called whenever the screen gains focus
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <MiniButton
          bgColor={colors.border}
          func={handleGoBack}
          content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
        />
        <Text style={styles.titleStyles}>My Bookings</Text>
      </View>
      <View style={styles.bottomWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Add RefreshControl component
          }
        >
          {loading ? (
            <NoData msg={'Loading...'} />
          ) : (bookings !== null && bookings.length !== 0 ) ? (
            bookings.map((booking, index) => <CardMyBooking booking={booking} key={index} />)
          ) : (
            <NoData msg={'No Bookings Yet!'} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyBookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 18,
    color: colors.textDark,
    marginLeft: 20,
  },
});
