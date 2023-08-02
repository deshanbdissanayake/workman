import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import MiniButton from '../components/general/MiniButton';
import Input from '../components/general/Input';
import Button from '../components/general/Button';

const RateJobScreen = ({ route }) => {
    const { booking } = route.params;
    const navigation = useNavigation();

    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState('');

    const handleSubmitClick = () => {
        console.log('add rating')
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
            </View>
            <View style={styles.bottomWrapper}>
                <Text style={styles.titleStyles}>Rate This Job</Text>
                <Text style={styles.subtitleStyles}>{booking.posted_date} - {booking.prof_name}</Text>

                <View style={styles.formWrapper}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelStyles}>Choose Your Rating :</Text>
                        <View style={styles.starWrapper}>{renderStars()}</View>
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
                    </View>
                    <Button
                        bgColor={colors.primaryDark}
                        txtColor={colors.textLight}
                        text={'Add My Rating'}
                        func={handleSubmitClick}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 15,
    },
    topWrapper: {
        marginBottom: 20,
    },
    bottomWrapper: {},
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
    },
    subtitleStyles: {
        fontFamily: 'ms-regular',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 25,
    },
    formGroup: {
        marginBottom: 20,
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
});

export default RateJobScreen;
