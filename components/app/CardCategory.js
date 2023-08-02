import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const CardCategory = ({id, img, name , func}) => {
  return (
    <TouchableOpacity
        style={styles.categoryItem}
        key={id}
        onPress={func}
    >
        <Image
            style={ styles.categoryItemImage }
            source={ img }
        />
        <Text numberOfLines={2} style={styles.categoryItemTitle}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CardCategory

const styles = StyleSheet.create({
    categoryItem: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 100,
        height: 100,
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
        textAlign: 'center',
    },
})