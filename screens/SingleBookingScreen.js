import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MiniButton from '../components/general/MiniButton'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import Button from '../components/general/Button'

const SingleBookingScreen = ({ route }) => {
    const { booking } = route.params;
    //console.log(booking)
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleRateClick = () => {
        navigation.navigate('RateJobScreen', { booking })
    }

    const renderStars = (rating) => {
        const fullStars = Math.round(rating);
    
        const stars = [];
    
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Ionicons key={i} name="star-sharp" size={24} color={colors.primary} />);
            } else {
                stars.push(<Ionicons key={i} name="star-outline" size={24} color={colors.primary} />);
            }
        }
    
        return stars;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton 
                    bgColor={colors.border}
                    func={handleGoBack}
                    content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
            </View>
            <ScrollView style={styles.bottomWrapper} showsVerticalScrollIndicator={false}>
                <Text style={styles.titleStyles}>Job Details</Text>
                <Text style={styles.subtitleStyles}>{booking.posted_date} - {booking.prof_name}</Text>
                
                <View style={styles.sectionWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Profession : </Text>
                        <Text style={styles.valueStyle}>{booking.prof_name}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Job Type : </Text>
                        <Text style={styles.valueStyle}>{booking.job_type === null ? '-' : booking.job_type}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Your Note : </Text>
                        <Text style={styles.valueStyle}>{booking.note === null ? '-' : booking.note}</Text>
                    </View>
                </View>

                <View style={styles.sectionWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Posted Date : </Text>
                        <Text style={styles.valueStyle}>{booking.posted_date === null ? '-' : booking.posted_date}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Start Date : </Text>
                        <Text style={styles.valueStyle}>{booking.start_date === null ? '-' : booking.start_date}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>End Date : </Text>
                        <Text style={styles.valueStyle}>{booking.end_date === null ? '-' : booking.end_date}</Text>
                    </View>
                </View>

                <View style={styles.sectionWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Job Status: </Text>
                        <Text style={[styles.valueStyle, styles.statusStyle(booking.job_status)]}>
                            {booking.job_status}
                        </Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Payment Status: </Text>
                        <Text style={[styles.valueStyle, styles.statusStyle(booking.payment_status)]}>
                            {booking.payment_status}
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Address : </Text>
                        <Text style={styles.valueStyle}>{booking.address === null ? '-' : booking.address}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>City : </Text>
                        <Text style={styles.valueStyle}>{booking.city === null ? '-' : booking.city}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Area : </Text>
                        <Text style={styles.valueStyle}>{booking.area === null ? '-' : booking.area}</Text>
                    </View>
                </View>

                <View style={styles.sectionWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Duration : </Text>
                        <Text style={styles.valueStyle}>{booking.duration === null ? '-' : `${booking.duration} days`}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Total Workers : </Text>
                        <Text style={styles.valueStyle}>{booking.total_workers === null ? '-' : booking.total_workers}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Estimate Amount : </Text>
                        <Text style={styles.valueStyle}>{booking.estimate === null ? '0.00' : (parseFloat(booking.estimate)).toFixed(2)}</Text>
                    </View>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.labelStyle}>Estimate Note : </Text>
                        <Text style={styles.valueStyle}>{booking.estimate_note === null ? '-' : booking.estimate_note}</Text>
                    </View>
                </View>

                    {(parseInt(booking.rate) === 0 && booking.job_status === 'completed' && booking.payment_status === 'paid') ? 
                    (
                        <View style={styles.sectionWrapper}>
                            <Button 
                                bgColor={colors.primaryDark}
                                txtColor={colors.textLight}
                                text={'Rate This Job'}
                                func={handleRateClick}
                            />
                        </View>
                    )
                    : 
                    (
                        <View style={styles.sectionWrapper}>
                            <View style={styles.rowWrapper}>
                                <Text style={styles.labelStyle}>Your Rating : </Text>
                                <View style={styles.ratingWrapper}>
                                    {(booking.job_status === 'completed' && booking.payment_status === 'paid') ? 
                                        (
                                            renderStars(booking.rate)
                                        ) : (
                                            <Text style={styles.valueStyle}>This job isn't finished yet to rate.</Text>
                                        )
                                    }
                                </View>
                            </View>

                            <View style={styles.rowWrapper}>
                                <Text style={styles.labelStyle}>Your Feedback : </Text>
                                <Text style={styles.valueStyle}>{booking.feedback === null ? '-' : booking.feedback}</Text>
                            </View>
                        </View>
                    )
                }
                
            </ScrollView>
        </View>
    )
}

export default SingleBookingScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    topWrapper : {
        marginBottom: 20,
    },
    bottomWrapper : {},
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
    },
    subtitleStyles: {
        fontFamily: 'ms-regular',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 15,
    },
    sectionWrapper: {
        backgroundColor: colors.white,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    labelStyle: {
        flex: 1,
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
    },
    valueStyle: {
        flex: 1,
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
    },
    ratingWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    statusStyle: status => ({
        color: colors.textLight,
        backgroundColor: status === 'completed' ? colors.success : status === 'active' ? colors.success : status === 'paid' ? colors.success : 'pending' ? colors.warning : colors.danger,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        textTransform: 'capitalize',
        textAlign: 'center',
    }),
})