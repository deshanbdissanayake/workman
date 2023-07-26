import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MiniButton from '../components/MiniButton';
import colors from '../assets/colors/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';

const SingleCategoryScreen = ({ route, navigation }) => {
    const { cat } = route.params;

    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCalendar = () => {
        setShowDatePicker(true);
    }

    const handleAddress = async () => {
        try {
            const log_data_string = await AsyncStorage.getItem('log_data');
    
            if (log_data_string !== null) {
                const log_data = JSON.parse(log_data_string);
    
                if (log_data.log_status === undefined || log_data.log_status === false) {
                    navigation.navigate('Register Screen')
                } else {
                    setAddress(log_data.log_userAddress)
                    console.log('Already Registered');
                }
            } else {
                navigation.navigate('Register Screen')
            }
        } catch (error) {
            // Handle AsyncStorage retrieval errors here
            console.error('Error retrieving log_data:', error);
        }
    };
    

    const handleBooking = async () => {
        console.log('booking')
        const asd = await AsyncStorage.removeItem('log_data')
        console.log('asd', asd)
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(formatDate(currentDate));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton 
                    bgColor={colors.border}
                    func={handleGoBack}
                    content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
                <Text style={styles.titleStyles}>{cat.name}</Text>
            </View>
            <View style={styles.formWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Service required on</Text>
                        <TouchableOpacity onPress={handleCalendar}>
                            <Input
                                value={date}
                                placeholder={'Select the Date'}
                                icon={<Feather name="calendar" size={24} color={colors.gray} />}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Service required at</Text>
                        <TouchableOpacity onPress={handleAddress}>
                            <Input
                                value={address}
                                placeholder={'Enter Your Address'}
                                icon={<Feather name="map-pin" size={24} color={colors.gray} />}
                                editable={false}
                                multiline={true}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Additional Details. If any.</Text>
                        <Input
                            keyboardType={'default'}
                            value={note}
                            onChangeText={(text) => setNote(text)}
                            placeholder={'Enter Your Note'}
                            icon={<Feather name="pen-tool" size={24} color={colors.gray} />}
                            multiline={true}
                            textArea={true}
                        />
                    </View>
                </ScrollView>
                <View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.bottomTextStyles}>To verify your booking and discuss pricing details, our experts will contact you.</Text>
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Button
                            bgColor={colors.primaryDark}
                            txtColor={colors.white}
                            text={'Continue Booking'}
                            func={handleBooking}
                        />
                    </View>
                </View>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="datePicker"
                    value={date ? new Date(date) : new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    )
}

export default SingleCategoryScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    topWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleStyles : {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginLeft: 20,
    },
    formWrapper : {
        flex: 1,
        justifyContent: 'space-between',
    },
    formGroupWrapper : {
        marginBottom: 10,
    },
    formLabelStyles : {
        fontFamily: 'ms-semibold',
        fontSize: 12,
        color: colors.textDark,
        marginBottom: 5,
        marginLeft: 2,
    },
    bottomTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
    }
})