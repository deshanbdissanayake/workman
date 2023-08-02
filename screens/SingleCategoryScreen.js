import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import MiniButton from '../components/general/MiniButton';
import colors from '../assets/colors/colors';
import { Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/general/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/general/Input';
import { getAreasByCityId, getCities } from '../assets/data/getData';
import { useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { saveBookingJob } from '../assets/data/saveData';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlert from '../components/general/CustomAlert'
import CustomModal from '../components/general/CustomModal'

const SingleCategoryScreen = ({ route, navigation }) => {
    const { prof } = route.params;

    const profId = prof.prof_id;
    const [userToken, setUserToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [dateError, setDateError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [areaError, setAreaError] = useState(false);
    const [addressError, setAddressError] = useState(false);

    const [cityList, setCityList] = useState(null);
    const [areaList, setAreaList] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({});
    const [refresh, setRefresh] = useState(false); //modal refresh

    //=========================================================================================

    const handleBooking = async () => {
        // details validation
        let isValid = true;

        if (!phoneNumber) {
            setPhoneNumberError(true);
            isValid = false;
        } else {
            setPhoneNumberError(false);
        }
    
        const today = new Date();
        const selectedDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (!date || selectedDate < today) {
            setDateError(true);
            isValid = false;
        } else {
            setDateError(false);
        }
    
        if (!city) {
            setCityError(true);
            isValid = false;
        } else {
            setCityError(false);
        }
    
        if (!area) {
            setAreaError(true);
            isValid = false;
        } else {
            setAreaError(false);
        }

        if (!address) {
            setAddressError(true);
            isValid = false;
        } else {
            setAddressError(false);
        }
        
        // If all fields are valid, proceed with save details
        if (isValid) {
            setShowModal(true); 
        }

    }

    const saveBookingFunc = async () => {
        setRefresh(true);
        const formData = new FormData();

        formData.append('profId', profId);
        formData.append('date', date);
        formData.append('note', note);
        formData.append('city', city);
        formData.append('area', area);
        formData.append('address', address);

        try {
            const response = await saveBookingJob(formData);
            setRefresh(false);
            setShowModal(false);
        
            if (response.stt === 'ok') {
                console.log('Booking saved');
                setSuccessMessage({ type: 'success', msg: response.msg });
            } else {
                setSuccessMessage({ type: 'danger', msg: response.msg });
            }
        
            // Show the alert for 1 second and then clear the success message
            setTimeout(() => {
              setSuccessMessage({});
              navigation.goBack();
            }, 700);

        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setRefresh(false);
            setShowModal(false); 
        }
    } 

    const handleModalCancel = () => {
        setShowModal(false);
    };
    
    const handleModalOk = async () => {
        await saveBookingFunc();
        setShowModal(false);
    };

    //=========================================================================================

    useEffect(()=>{
        fetchCities()
    },[])

    // Use useFocusEffect hook to hide the CustomAlert when the screen gains focus
    useFocusEffect(
        useCallback(() => {
        return () => {
            // Cleanup function to reset showModal when the screen loses focus
            setShowModal(false);
            setSuccessMessage({});
        };
        }, [])
    );


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
                    setAddress(log_data.log_userAddress)
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
                        {phoneNumberError && (
                            <View style={styles.errorWrapper}>
                                <Text style={styles.errorMessage}>
                                    Your Phone Number Cannot be Empty!
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Service Required On</Text>
                        <TouchableOpacity onPress={handleCalendar}>
                            <Input
                                value={date}
                                placeholder={'Select the Date'}
                                icon={<Feather name="calendar" size={24} color={colors.gray} />}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {dateError && (
                            <View style={styles.errorWrapper}>
                                <Text style={styles.errorMessage}>
                                    Please Select a Valid Future Date!
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Service Required At</Text>
                        <Input
                            keyboardType={'default'}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            placeholder={'Enter Your Address'}
                            icon={<Entypo name="location" size={24} color={colors.gray} />}
                            editable={true}
                            multiline={true}
                        />
                        {addressError && (
                            <View style={styles.errorWrapper}>
                                <Text style={styles.errorMessage}>
                                    Enter Your Address!
                                </Text>
                            </View>
                        )}
                    </View>        

                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Select Your City</Text>
                        <View style={styles.dropDownStyles}>
                            <MaterialIcons name="location-city" size={24} color={colors.gray} />
                            <View style={styles.pickerStyles}>
                                <Picker
                                    selectedValue={city}
                                    onValueChange={(itemValue, itemIndex) => setCityFunc(itemValue)}
                                >
                                    <Picker.Item 
                                        key={0} 
                                        label={'Select Your City'} 
                                        value={''} 
                                        color={colors.textDark}
                                    />
                                    
                                    {cityList &&
                                    cityList.map((city) => (
                                        <Picker.Item 
                                            key={city.city_id} 
                                            label={city.city} 
                                            value={city.city_id} 
                                            color={colors.textDark}
                                        />
                                    ))}
                                </Picker>
                            </View>
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
                            <Ionicons name="location-outline" size={24} color={colors.gray} />
                            <View style={styles.pickerStyles}>
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
                                                color={colors.textDark}
                                            />
                                        ) : (
                                            <Picker.Item 
                                                key={0} 
                                                label={'Select A City First'} 
                                                value={''}
                                                color={colors.textDark}
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
                                                    color={colors.textDark}
                                                />
                                            ))
                                    }
                                </Picker>
                            </View>
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

            {showModal && (
                <View style={styles.alertStyles}>
                    <CustomModal
                        title={'Confirm Booking'}
                        content={'Are you sure ?'}
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
        marginBottom: 15,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: 10,
    },
    pickerStyles: {
        width: '90%',
    },
    errorWrapper: {
        marginRight: 5,
    },
    errorMessage: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.danger,
        textAlign: 'right',
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