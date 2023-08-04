import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../assets/colors/colors';
import Input from '../components/general/Input';
import { Picker } from '@react-native-picker/picker';
import { getAreasByCityId, getCities } from '../assets/data/getData';
import MiniButton from '../components/general/MiniButton';
import Button from '../components/general/Button';
import { updateUserDetails } from '../assets/data/saveData';
import CustomAlert from '../components/general/CustomAlert';
import FormErrorMsg from '../components/general/FormErrorMsg';
import { saveAsyncStorage } from '../assets/data/user';
import AuthContext from '../context/AuthContext';

const UserSettingsScreen = ({ navigation, route }) => {
    const { user } = route.params;
    const { logData, login } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        name: user.client_name,
        email: user.email,
        whatsapp: user.phone2,
        address: user.address,
        cityId: user.city_id,
        areaId: user.area_id,
        image: user.client_img,
    });

    const [userErrors, setUserErrors] = useState({
        nameError: false,
        emailError: false,
        whatsappError: false,
        addressError: false,
        cityError: false,
        areaError: false,
        imageError: false,
    });

    const [successMessage, setSuccessMessage] = useState({});
    const [loading, setLoading] = useState(false);

    //=========================================================================================

    const [cityList, setCityList] = useState(null);
    const [areaList, setAreaList] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await fetchCities()
        await fetchAreas(user.city_id)
        setAreaFunc()
    }

    const fetchCities = async () => {
        const res = await getCities();
        setCityList(res);
    };

    const setCityFunc = async (city_id) => {
        setUserData(prevData => ({ ...prevData, cityId: city_id }));
        fetchAreas(city_id);
    };

    const setAreaFunc = async () => {
        setUserData(prevData => ({ ...prevData, areaId: user.area_id })); 
    }

    const fetchAreas = async (city_id) => {
        setUserData(prevData => ({ ...prevData, areaId: '' })); 
        setAreaList(null);
        const res = await getAreasByCityId(city_id);
        setAreaList(res);
    };
    
    //=========================================================================================
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleImageUpload = async () => {
        const showImagePickerOptions = () => {
            Alert.alert(
                'Select Image Source',
                'Choose the source of the image',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Camera', onPress: () => launchCamera() },
                    { text: 'Library', onPress: () => launchImageLibrary() },
                ],
                { cancelable: true }
            );
        };
    
        const launchCamera = async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            if (cameraStatus === 'granted') {
                launchImagePicker(true);
            } else if (cameraStatus === 'denied') {
                // User denied camera permissions
                Alert.alert('Camera Access Denied', 'Please enable camera access in your device settings.');
            } else {
                // Camera permission request was rejected
                Alert.alert('Permission Required', 'Permission to access the camera is required.');
            }
        };
    
        const launchImageLibrary = async () => {
            const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (libraryStatus === 'granted') {
                launchImagePicker(false);
            } else if (libraryStatus === 'denied') {
                // User denied media library permissions
                Alert.alert('Media Library Access Denied', 'Please enable media library access in your device settings.');
            } else {
                // Media library permission request was rejected
                Alert.alert('Permission Required', 'Permission to access the media library is required.');
            }
        };
    
        const launchImagePicker = async (isCamera) => {
    
            const result = isCamera ? 
            await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            })
            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
    
            if (!result.canceled) {
                setUserData(prevData => ({ ...prevData, image: result.assets[0].uri }));
            }
              
        };
    
        showImagePickerOptions();
      };
    

    //=========================================================================================

    const handleUpdateClick = async () => {
        console.log('update');

        let isValid = true;
    
        if (userData.name === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, nameError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, nameError: false }));
        }
    
        if (userData.email === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, emailError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, emailError: false }));
        }
    
        if (userData.whatsapp === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, whatsappError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, whatsappError: false }));
        }
    
        if (userData.address === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, addressError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, addressError: false }));
        }
    
        if (userData.cityId === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, cityError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, cityError: false }));
        }
    
        if (userData.areaId === '') {
            isValid = false;
            setUserErrors(prevData => ({ ...prevData, areaError: true }));
        } else {
            setUserErrors(prevData => ({ ...prevData, areaError: false }));
        }
    
        if (isValid) {
            updateFunc(); 
        }
    };
    

    const updateFunc = async () => {
        setLoading(true);

        const formData = new FormData();

        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('whatsapp', userData.whatsapp);
        formData.append('address', userData.address);
        formData.append('cityId', userData.cityId);
        formData.append('areaId', userData.areaId);

        if (userData.image !== user.client_img) {
            if (userData.image) {
                formData.append('image', {
                    uri: userData.image,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                });
            }
        }

        try {
            const response = await updateUserDetails(formData);

            if (response.stt === 'ok') {
                const asyncData = {
                    ...logData, 
                    log_userName : userData.name,
                    log_userEmail : userData.email,
                    log_userWhsp : userData.whatsapp,
                    log_userAddress : userData.address,
                    log_userCity : userData.cityId,
                    log_userArea : userData.areaId
                }

                await saveAsyncStorage(asyncData)
                await login();

                console.log('User Updated');
                setSuccessMessage({ type: 'success', msg: response.msg });

                // Show the alert for 1 second and then clear the success message
                setTimeout(() => {
                    setSuccessMessage({});
                    navigation.goBack();
                }, 700);

            } else {
                setSuccessMessage({ type: 'danger', msg: response.msg });
            }

        } catch (error) {
            console.error('update user try error', error)
        } finally {
            setLoading(false);
            
            setTimeout(() => {
                setSuccessMessage({});
            }, 700);
        }

    }

    //=========================================================================================
    
    
    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton
                    bgColor={colors.border}
                    func={handleGoBack}
                    content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
                <Text style={styles.titleStyles}>User Details Update</Text>
            </View>
            <View style={styles.bottomWrapper}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Profile Picture</Text>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{ uri: userData.image }}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
                                <Feather name="camera" size={24} color={colors.textGraySecondary} />
                            </TouchableOpacity>
                        </View>
                        {userErrors.imageError && (
                            <FormErrorMsg msg={'Image is Required!'} />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New Name</Text>
                        <Input
                            keyboardType={'default'}
                            value={userData.name}
                            onChangeText={(text) => setUserData(prevData => ({ ...prevData, name: text }))}
                            placeholder={'Enter Your Name Here'}
                            icon={<Feather name="user" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                        {userErrors.nameError && (
                            <FormErrorMsg msg={'Name is Required!'} />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New Email</Text>
                        <Input
                            keyboardType={'email-address'}
                            value={userData.email}
                            onChangeText={(text) => setUserData(prevData => ({ ...prevData, email: text }))}
                            placeholder={'Enter Your Email Here'}
                            icon={<Feather name="mail" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                        {userErrors.emailError && (
                            <FormErrorMsg msg={'Email is Required!'} />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New WhatsApp</Text>
                        <Input
                            keyboardType={'phone-pad'}
                            value={userData.whatsapp}
                            onChangeText={(text) => setUserData(prevData => ({ ...prevData, whatsapp: text }))}
                            placeholder={'Enter Your WhatsApp Number Here'}
                            icon={<Feather name="phone" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                        {userErrors.whatsappError && (
                            <FormErrorMsg msg={'Whatsapp Number is Required!'} />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>New Address</Text>
                        <Input
                            keyboardType={'default'}
                            value={userData.address}
                            onChangeText={(text) => setUserData(prevData => ({ ...prevData, address: text }))}
                            placeholder={'Enter Your Address Here'}
                            icon={<Feather name="map-pin" size={24} color={colors.textGray} />}
                            editable={true}
                        />
                        {userErrors.addressError && (
                            <FormErrorMsg msg={'Address is Required!'} />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Select Your City</Text>
                        <View style={styles.dropDownStyles}>
                            <MaterialIcons name="location-city" size={24} color={colors.textGray} />
                            <View style={styles.pickerStyles}>
                                <Picker
                                    selectedValue={userData.cityId}
                                    onValueChange={(itemValue) => setCityFunc(itemValue)}
                                >
                                    <Picker.Item key={0} label={'Select Your City'} value={''} />
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
                            {userErrors.cityError && (
                                <FormErrorMsg msg={'City is Required!'} />
                            )}
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Select Your Area</Text>
                        <View style={styles.dropDownStyles}>
                            <Ionicons name="location-outline" size={24} color={colors.textGray} />
                            <View style={styles.pickerStyles}>
                                <Picker
                                    selectedValue={userData.areaId}
                                    onValueChange={(itemValue) => setUserData(prevData => ({ ...prevData, areaId: itemValue }))}
                                >
                                    {userData.cityId ? (
                                        <Picker.Item key={0} label={'Select Your Area'} value={''} />
                                    ) : (
                                        <Picker.Item key={0} label={'Select A City First'} value={''} />
                                    )}

                                    {areaList &&
                                        areaList.map((area) => (
                                            <Picker.Item key={area.area_id} label={area.area} value={area.area_id} />
                                        ))
                                    }
                                </Picker>
                            </View>
                            {userErrors.areaError && (
                                <FormErrorMsg msg={'Area is Required!'} />
                            )}
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        {loading ? (
                            <Button loading={true} />
                        ) : (
                            <Button
                                bgColor={colors.primaryDark}
                                txtColor={colors.textLight}
                                text={'Update My Details'}
                                func={handleUpdateClick}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
            {Object.keys(successMessage).length > 0 && (
                <View style={styles.alertStyles}>
                    <CustomAlert type={successMessage.type} msg={successMessage.msg} />
                </View>
            )}
        </View>
    );
};

export default UserSettingsScreen;

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
    bottomWrapper: {
        flex: 1,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    imageUploadButton: {
        position: 'absolute',
        bottom: -10,
        right: -20,
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 50,
    },
    formGroup: {
        marginBottom: 15,
    },
    formLabel: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        marginLeft: 2,
        marginBottom: 5,
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
});

