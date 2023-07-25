import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../assets/colors/colors";
import { getFinancialData } from "../assets/data/dash";

const ReportFinance = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [titleText, setTitleText] = useState('Records');

  const [isLoading, setIsLoading] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [financeData, setFinanceData] = useState([]);

  const fetchOrderCountData = async () => {
    setIsLoading(true)
    try {
      const response = await getFinancialData(formatDate(startDate),formatDate(endDate));
      setFinanceData(response);
      //console.log(response)
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    setTitleText(`Records from ${formatDate(startDate)} to ${formatDate(endDate)}`)
    fetchOrderCountData();
  };

  return (
    <>
      <Header showSearch={false} name={'Finance Report'} />
      <View style={styles.container}>
        <View style={styles.filterWrapper}>
          {/* Start Date */}
          <View style={styles.dateFilterWrapper}>
            <View style={styles.filterContentWrapper}>
              <Text style={styles.textStyles}>Start Date</Text>
              <TouchableOpacity onPress={showStartDatepicker} style={styles.dateFilterStyles}>
                <Text style={styles.dateTextStyles}>{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>
            {/* End Date */}
            <View style={styles.filterContentWrapper}>
              <Text style={styles.textStyles}>End Date</Text>
              <TouchableOpacity onPress={showEndDatepicker} style={styles.dateFilterStyles}>
                <Text style={styles.dateTextStyles}>{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filterContentWrapper}>
              <TouchableOpacity onPress={handleSearch} style={styles.filterButtonStyles}>
                <Text style={styles.buttonTextStyles}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
        </View>
        <View style={styles.reportContentWrapper}>
          <Text style={styles.reportTitleStyles}>{titleText}</Text>
          <ScrollView>
            {!isLoading ? (
              financeData !== null ? (
                financeData.map(({ name, value }) => (
                  <View key={name} style={styles.cardWrapper}>
                    <Text style={styles.cardNameStyles}>{name}</Text>
                    <Text style={styles.cardCountStyles}>{parseFloat(value).toFixed(2)}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.errorWrapper}>
                  <Text style={styles.errorTextStyles}>No Records Yet!</Text>
                </View>
              )
            ) : (
              <View style={styles.loadingStyles}>
                <ActivityIndicator size={'large'} color={colors.textDark} />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    filterWrapper: {
        marginBottom: 20,
    },
    dateFilterWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    dateFilterStyles: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        width: '100%',
    },
    filterButtonStyles: {
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    buttonTextStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 14,
        color: colors.textDark,
        textAlign: 'center',
    },
    dateTextStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
    },
    textStyles: {
        fontFamily: 'ms-regular',
        fontSize: 14,
        color: colors.textDark,
    },
    filterContentWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    reportContentWrapper: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 15,
    },

    reportTitleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginBottom: 20,
    },

    loadingStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },

    cardWrapper: {
        backgroundColor: colors.white,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardNameStyles: {
        fontFamily: 'ms-regular',
        fontSize: 16,
        color: colors.textDark,
    },
    cardCountStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 20,
        color: colors.textDark,
    },
    errorWrapper : {
      backgroundColor: colors.border,
      padding: 10,
      borderRadius: 10,
    },
    errorTextStyles : {
      fontFamily: 'ms-regular',
      fontSize: 14,
      color: colors.textDark,
      textAlign: 'center',
    },
});

export default ReportFinance;
