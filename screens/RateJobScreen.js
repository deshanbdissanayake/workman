import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import MiniButton from '../components/general/MiniButton';
import Input from '../components/general/Input';
import Button from '../components/general/Button';
import { saveJobRating } from '../assets/data/saveData';
import CustomAlert from '../components/general/CustomAlert'
import CustomModal from '../components/general/CustomModal'
import FormErrorMsg from '../components/general/FormErrorMsg';


const RateJobScreen = ({ route }) => {
    const { booking } = route.params;
    
    const navigation = useNavigation();

    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState('');

    const [ratingError, setRatingError] = useState(false);
    const [ratingTextError, setRatingTextError] = useState(false);

    const [successMessage, setSuccessMessage] = useState({});
    const [buttonLoading, setButtonLoading] = useState(false); //modal refresh

    const handleSubmitClick = async () => {
        let isValid = true;
    
        if (rating === 0) {
            setRatingError(true);
            isValid = false;
        } else {
            setRatingError(false);
        }
    
        if (ratingText === '') {
            setRatingTextError(true);
            isValid = false;
        } else {
            setRatingTextError(false);
        }
    
        if (isValid) {
            submitJobRatingFunc();
        }
    };

    const submitJobRatingFunc = async () => {
        setButtonLoading(true);

        try {
            const formData = new FormData();

            formData.append('jobId', booking.job_id);
            formData.append('rating', rating);
            formData.append('ratingText', ratingText);

            const response = await saveJobRating(formData);

            setButtonLoading(false);
        
            if (response.stt === 'ok') {
                console.log('Rating saved');
                setSuccessMessage({ type: 'success', msg: response.msg });
            } else {
                setSuccessMessage({ type: 'danger', msg: response.msg });
            }
        
            // Show the alert for 1 second and then clear the success message
            setTimeout(() => {
                setSuccessMessage({});
                navigation.popToTop();
            }, 700);

        } catch ( error ) {
            console.error('Job Rating error RateJobScreen try');
        } finally {
            setButtonLoading(false);
        }
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleRatingPress = (selectedRating) => {
        if (selectedRating === rating) {
            setRating(0);
        } else {
            setRating(selectedRating);
        }
    };
    

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleRatingPress(i)}
                    activeOpacity={0.7}
                    style={styles.starStyles}
                >
                    <Ionicons
                        name={i <= rating ? 'star-sharp' : 'star-outline'}
                        size={30}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            );
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
                <Text style={styles.titleStyles}>Rate This Job</Text>
            </View>
            <View style={styles.bottomWrapper}>
                <Text style={styles.subtitleStyles}>{booking.posted_date} - {booking.prof_name}</Text>

                <ScrollView style={styles.formWrapper} showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelStyles}>Choose Your Rating :</Text>
                        <View style={styles.starWrapper}>{renderStars()}</View>
                        {ratingError && (
                            <FormErrorMsg msg={'Please Enter Your Rating!'} />
                        )}
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelStyles}>Your Feedback About Job :</Text>
                        <Input
                            keyboardType={'default'}
                            value={ratingText}
                            onChangeText={(text)=>setRatingText(text)}
                            placeholder={'Enter Your Feedback Here'}
                            icon={<MaterialIcons name="comment" size={24} color={colors.textGray} />}
                            editable={true}
                            multiline={true}
                            textArea={true}
                        />
                        {ratingTextError && (
                            <FormErrorMsg msg={'Please Enter Your Review!'} />
                        )}
                    </View>
                    {
                        buttonLoading ?
                        (
                            <Button loading={true} />
                        )
                        :
                        (
                            <Button
                                bgColor={colors.primaryDark}
                                txtColor={colors.textLight}
                                text={'Add My Rating'}
                                func={handleSubmitClick}
                            />
                        )
                    }
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
    subtitleStyles: {
        fontFamily: 'ms-regular',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 25,
    },
    formGroup: {
        marginBottom: 30,
    },
    labelStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        marginBottom: 5,
    },
    starWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starStyles: {
        marginRight: 5,
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

export default RateJobScreen;
