import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import React from 'react';
import colors from '../assets/colors/colors';

const CustomModal = ({
  title,
  content,
  cancelButtonText,
  okButtonText,
  pressCancel = '',
  pressOk,
  refresh
}) => {

  return (
    <View style={styles.container}>
      {!refresh ? (
        <>
          <View style={styles.alertWrapper}>
            <View style={styles.headerWrapper}>
              <Text style={styles.titleStyles}>{title}</Text>
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={styles.contentStyles}>{content}</Text>
            </View>
          </View>
          <View style={styles.footerWrapper}>
              {pressCancel !== '' && (
                <TouchableOpacity onPress={pressCancel} style={styles.cancelBtnStyles}>
                    <Text style={styles.cancelTextStyles}>{cancelButtonText}</Text>
                </TouchableOpacity>
              )}
                <TouchableOpacity onPress={pressOk} style={styles.okBtnStyles}>
                  <Text style={styles.okTextStyles}>{okButtonText}</Text>
                </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size={'large'} color={colors.primaryDark} />
        </View>
      )}
      

    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    width: 300,
    zIndex: 2,
  },
  alertWrapper: {
    padding: 20,
  },
  headerWrapper: {
    marginBottom: 5,
  },
  titleStyles: {
    fontFamily: 'ms-bold',
    fontSize: 18,
    color: colors.textDark,
  },
  bodyWrapper: {
    marginBottom: 5,
  },
  contentStyles: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textDark,
  },

  footerWrapper: {
    flexDirection: 'row',
  },
  cancelBtnStyles : {
    flex: 1,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 12,
    color: colors.textDark,
    padding: 10,
  },
  okBtnStyles : {
    flex: 1,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okTextStyles: {
    fontFamily: 'ms-semibold',
    fontSize: 12,
    color: colors.textLight,
    padding: 10,
  },
  loadingWrapper:{
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
