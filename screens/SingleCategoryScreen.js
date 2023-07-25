import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MiniButton from '../components/MiniButton';
import colors from '../assets/colors/colors';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/Button';

const SingleCategoryScreen = ({ route, navigation }) => {
    const { cat } = route.params;

    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCalendar = () => {
        console.log('calendar')
    }

    const handleBooking = () => {
        console.log('booking')
    }

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
                        <View style={styles.inputWrapper}>
                            <Feather name="calendar" size={24} color={colors.gray} />
                            <TextInput
                                keyboardType={'default'}
                                value={date}
                                onPressIn={handleCalendar}
                                placeholder={'Enter Your Date'}
                                style={styles.inputTextStyles}
                            />
                        </View>
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Service required at</Text>
                        <View style={[styles.inputWrapper, { height: 100 }]}>
                            <Feather name="map-pin" size={24} color={colors.gray} />
                            <TextInput
                                keyboardType={'default'}
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder={'Enter Your Address'}
                                secureTextEntry={false}
                                style={styles.inputTextStyles}
                                multiline={true}
                            />
                        </View>
                    </View>
                    <View style={styles.formGroupWrapper}>
                        <Text style={styles.formLabelStyles}>Additional Details. If any.</Text>
                        <View style={[styles.inputWrapper, { height: 150 }]}>
                            <Feather name="pen-tool" size={24} color={colors.gray} />
                            <TextInput
                                keyboardType={'default'}
                                value={note}
                                onChangeText={(text) => setNote(text)}
                                placeholder={'Enter Your Note'}
                                secureTextEntry={false}
                                style={styles.inputTextStyles}
                                multiline={true}
                            />
                        </View>
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
    inputWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    inputTextStyles: {
        width: '100%',
        fontFamily: 'ms-regular',
        marginLeft: 10,
        paddingRight: 10,
    },
    bottomTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
    }
})