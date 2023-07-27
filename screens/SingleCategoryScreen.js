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
import { getAreasByCityId, getCities } from '../assets/data/getData';
import { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

const SingleCategoryScreen = ({ route, navigation }) => {
    const { prof } = route.params;

    const profId = prof.prof_id;
    const [userToken, setUserToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const [city, setCity] = useState('');
    const [area, setArea] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [dateError, setDateError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [areaError, setAreaError] = useState(false);

    const [cityList, setCityList] = useState(null);
    const [areaList, setAreaList] = useState(null);

    //=========================================================================================

    useEffect(()=>{
        fetchCities()
    },[])

    const fetchCities = async () => {
        const res = await getCities(); 
        setCityList(res);
    }

    const setCityFunc = async (cityId) => {
        setCity(cityId);
        fetchAreas(cityId);
    }

    const fetchAreas = async (cityId) => {
        setArea('');
        setAreaList(null);
        const res = await getAreasByCityId(cityId);
        setAreaList(res);
    }

    //=========================================================================================

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCalendar = () => {
        setShowDatePicker(true);
    }

    const handleCheckRegistered = async () => {
        try {
            const log_data_string = await AsyncStorage.getItem('log_data');
    
            if (log_data_string !== null) {
                const log_data = JSON.parse(log_data_string);
    
                if (log_data.log_status === undefined || log_data.log_status === false) {
                    navigation.navigate('Register Screen')
                } else {
                    setPhoneNumber(log_data.log_userNumber);
                    setUserToken(log_data.log_userToken);
                    setCity(log_data.log_userCity);
                    fetchAreas(log_data.log_userCity);
                    setArea(log_data.log_userArea)
                    console.log('Auto filled from AsyncStorage');
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
        //const asd = await AsyncStorage.removeItem('log_data')
        //console.log('asd', asd)
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
                <Text style={styles.titleStyles}>{prof.prof_name}</Text>
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
                        <Text style={styles.formLabelStyles}>Your Contact Number</Text>
                        <TouchableOpacity onPress={handleCheckRegistered}>
                            <Input
                                value={phoneNumber}
                                placeholder={'Enter Your Phone Number'}
                                icon={<Ionicons name="call-outline" size={24} color={colors.gray} />}
                                editable={false}
                                multiline={true}
                            />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.formGroupWrapper}>
                            <Text style={styles.formLabelStyles}>Select Your City</Text>
                            <View style={styles.dropDownStyles}>
                                <Picker
                                    selectedValue={city}
                                    onValueChange={(itemValue, itemIndex) => setCityFunc(itemValue)}
                                >
                                    <Picker.Item 
                                        key={0} 
                                        label={'Select Your City'} 
                                        value={''} 
                                    />
                                    
                                    {cityList &&
                                    cityList.map((city) => (
                                        <Picker.Item 
                                            key={city.city_id} 
                                            label={city.city} 
                                            value={city.city_id} 
                                        />
                                    ))}
                                </Picker>
                            </View>
                            {cityError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Select a City!
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.formGroupWrapper}>
                            <Text style={styles.formLabelStyles}>Select Your Area</Text>
                            <View style={styles.dropDownStyles}>
                                <Picker
                                    selectedValue={area}
                                    onValueChange={(itemValue, itemIndex) => setArea(itemValue)}
                                >
                                    {
                                        city ? (
                                            <Picker.Item 
                                                key={0} 
                                                label={'Select Your Area'} 
                                                value={''} 
                                            />
                                        ) : (
                                            <Picker.Item 
                                                key={0} 
                                                label={'Select A City First'} 
                                                value={''} 
                                            />
                                        )
                                    }

                                    
                                    {
                                        areaList &&
                                            areaList.map((area) => (
                                                <Picker.Item 
                                                    key={area.area_id} 
                                                    label={area.area} 
                                                    value={area.area_id} 
                                                />
                                            ))
                                    }
                                </Picker>
                            </View>

                            {areaError && (
                                <View style={styles.errorWrapper}>
                                    <Text style={styles.errorMessage}>
                                        Select an Area!
                                    </Text>
                                </View>
                            )}
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
    },
    dropDownStyles: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        marginBottom: 10,
    },
})