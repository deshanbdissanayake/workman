import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const CardProduct = ({ product, catName }) => {
  return (
    <View style={styles.cardWrapper}>
        <View>
            <Text style={styles.proNameStyles}>{product.pro_name}</Text>
            <Text style={styles.proCatNameStyles}>{catName}</Text>
        </View>
        <View>
            <Text style={styles.proProPriceStyles}>{parseFloat(product.pro_price).toFixed(2)}</Text>
        </View>
    </View>
  )
}

export default CardProduct

const styles = StyleSheet.create({
    cardWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    proNameStyles: {
        fontFamily: 'ms-semibold',
    },
    proCatNameStyles: {
        fontFamily: 'ms-regular',
        fontSize: 11,
        color: colors.textGraySecondary
    },
    proProPriceStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 16,
    }
})