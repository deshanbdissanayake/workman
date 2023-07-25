import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../assets/colors/colors";
import { getOrderCountByStatus } from "../assets/data/dash";

const ReportOrders = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [titleText, setTitleText] = useState('Orders');

  const [isLoading, setIsLoading] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [orderCounts, setOrderCounts] = useState({});

  const fetchOrderCountData = async () => {
    setIsLoading(true)
    try {
      const response = await getOrderCountByStatus(formatDate(startDate),formatDate(endDate));
      //console.log(response)
      setOrderCounts(response);
    } catch (error) {
      console.error("Error fetching order count data:", error);
    } finally {
        setIsLoading(false)
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
    setTitleText(`Orders from ${formatDate(startDate)} to ${formatDate(endDate)}`)
    fetchOrderCountData();
  };

  return (
    <>
      <Header showSearch={false} name={'Orders Report'} />
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

                {
                    !isLoading ? (
                        Object.entries(orderCounts).map(([status, count]) => (
                        <View key={status} style={styles.cardWrapper}>
                            <Text style={styles.cardNameStyles}>{status === 'pending' ? 'Pending' : status === 'delivered' ? 'Delivered' : status === 'returned' ? 'Returned' : status === 'no_answer' ? 'No Answer' : '' }</Text>
                            <Text style={styles.cardCountStyles}>{count}</Text>
                        </View>
                    ))
                    ) : (
                        <View style={styles.loadingStyles}>
                            <ActivityIndicator size={'large'} color={colors.textDark}/>
                        </View>
                    )
                }
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
        paddingVertical: 15,
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
});

export default ReportOrders;
