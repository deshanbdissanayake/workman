import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MiniButton from '../components/general/MiniButton';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import { getMyBookings } from '../assets/data/getData';
import NoData from '../components/app/NoData';
import CardMyBooking from '../components/app/CardMyBooking';

const MyBookingList = ({ navigation }) => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
      navigation.goBack();
  };

  useEffect(()=>{
    getMyBookingsFunc()
  },[])

  const getMyBookingsFunc = async () => {
    setLoading(true)
    try{
      const response = await getMyBookings();
      setBookings(response);
    } catch ( error ) {
      console.error('Get Booking Func error', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.topWrapper}>
            <MiniButton 
                bgColor={colors.border}
                func={handleGoBack}
                content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
            />
        </View>
        <View style={styles.bottomWrapper}>
          <Text style={styles.titleStyles}>My Previous Bookings</Text>
          {
            loading ? (
              <NoData msg={'Loading...'}/>
            ) : 
            bookings !== null ? 
              bookings.map((booking, index)=>(
                <CardMyBooking booking={booking} key={index} />
              ))
            : 
            (<NoData msg={'No Bookings Yet!'}/>)
          }
        </View>
    </View>
  )
}

export default MyBookingList

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  topWrapper : {
    marginBottom: 20,
  },
  bottomWrapper : {
    
  },
  titleStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 15,
  },
})