import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import MiniButton from '../components/general/MiniButton';
import { Ionicons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';

const screenWidth = Dimensions.get('window').width;

const SingleBlogScreen = ({ route, navigation }) => {
    const { item } = route.params;

    const handleGoBack = () => {
        navigation.goBack();
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
                <Text style={styles.titleStyles}>{item.title}</Text>

                <View>
                    <Image source={{ uri : item.image }} style={styles.imageStyles} />
                    <Text style={styles.descStyles}>{item.description}</Text>

                    <View style={styles.rowWrapper}>
                        <View style={styles.rowWrapper}>
                            <Ionicons name="location" size={18} color={colors.secondary} />
                            <Text style={styles.cityStyles}>{item.city}</Text>
                        </View>
                        <View style={styles.rowWrapper}>
                            <Ionicons name="calendar" size={18} color={colors.secondary} />
                            <Text style={styles.dateStyles}>{item.c_date}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SingleBlogScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    topWrapper: {
        marginBottom: 20,
    },
    bottomWrapper: {},
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 20,
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageStyles: {
        backgroundColor: colors.white,
        width: screenWidth - 30,
        height: screenWidth - 30,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
    },
    descStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
        textAlign: 'justify',
        marginBottom: 20,
    },
    dateStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGray,
        marginLeft: 5,
    },
    cityStyles: {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textGraySecondary,
        marginLeft: 5,
    },
})