import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'

const CardLatestStory = ({ item }) => {
  return (
    <TouchableOpacity style={styles.latestItem} key={item.id}>
      <Image style={styles.latestItemImage} source={{ uri : item.image }} />
      <View style={styles.latestItemText}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.c_date}</Text>
        </View>
        <Text style={styles.latestItemTitle}>{item.title}</Text>
        <View style={styles.iconWrapper}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardLatestStory

const styles = StyleSheet.create({
    latestItem: {
        backgroundColor: colors.white,
        alignItems: 'center',
        padding: 10,
        width: 160,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
      },
      latestItemImage: {
        width: 140,
        height: 140,
        resizeMode: 'cover',
        marginBottom: 5,
        borderRadius: 8,
      },
      latestItemText: {
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
      },
      iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        marginTop: 3,
      },
      iconText: {
        fontFamily: 'ms-regular',
        fontSize: 10,
        color: colors.gray,
        marginLeft: 5,
      },
      latestItemTitle: {
        overflow: 'hidden',
        textAlign: 'left',
        fontFamily: 'ms-regular',
        fontSize: 12,
        fontWeight: '600',
      },
})