import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const CardCategory = ({id, img, name , func}) => {
  return (
    <TouchableOpacity
        style={styles.categoryItem}
        key={id}
        onPress={func}
    >
        <Image
        style={styles.categoryItemImage}
        source={img}
        />
        <Text style={styles.categoryItemTitle}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CardCategory

const styles = StyleSheet.create({
    categoryItem: {
        backgroundColor: colors.white,
        alignItems: 'center',
        padding: 10,
        width: '30%',
        borderRadius: 5,
        marginBottom: 10,
    },
    categoryItemImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    categoryItemTitle: {
        marginTop: 5,
        overflow: 'hidden',
        fontFamily: 'ms-regular',
        fontSize: 12,
    },
})