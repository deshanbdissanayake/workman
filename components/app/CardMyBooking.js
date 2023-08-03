import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const CardMyBooking = ({booking}) => {
    const navigation = useNavigation(); 

    const handleCardClick = () => {
        navigation.navigate('SingleBookingScreen', { booking });
    }

    return (
        <TouchableOpacity onPress={handleCardClick}>
            <View style={styles.container}>
                <View style={styles.imgWrapper}>
                    <Image source={{ uri: booking.icon }} style={styles.imgStyles}/>
                </View>
                <View style={styles.detailsWrapper}>
                    <View style={styles.topWrapper}>
                        <Text style={styles.titleStyles}>{booking.prof_name}</Text>
                        <View style={styles.ratingWrapper}>
                            <Text style={styles.ratingStyles}>{booking.rate}</Text>
                            <AntDesign name="star" size={24} color={parseInt(booking.rate) === 0 ? colors.textGray : colors.primary} />
                        </View>
                    </View>
                    <View style={styles.bottomWrapper}>
                        <View style={styles.dateWrapper}>
                            <View>
                                <Text style={styles.dateTextStyles}>Posted Date: {booking.posted_date}</Text>
                            </View>
                            <View>
                                <Text style={styles.dateTextStyles}>Start Date: {booking.start_date}</Text>
                            </View>
                        </View>
                        <Text style={[styles.statusStyles, styles.statusStyle(booking.job_status)]}>{booking.job_status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardMyBooking

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    imgWrapper: {
        backgroundColor: colors.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    imgStyles: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    detailsWrapper: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 16,
        color: colors.textDark,
    },
    ratingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 16,
        color: colors.textDark,
        marginRight: 5,
    },
    dateWrapper: {
        flex: 2,
        marginTop: 10,
    },
    dateTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 10,
        color: colors.textGray,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 1,
    },
    statusStyles: {
        flex: 1,
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textLight,
        backgroundColor: colors.primaryDark,
        padding: 5,
        borderRadius: 5,
    },
    statusStyle: status => ({
        color: colors.textLight,
        backgroundColor: status === 'completed' ? colors.success : status === 'active' ? colors.success : 'pending' ? colors.warning : colors.danger,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        textTransform: 'capitalize',
    }),
})