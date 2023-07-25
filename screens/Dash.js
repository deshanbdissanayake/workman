import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { PieChart } from 'react-native-chart-kit';
import colors from '../assets/colors/colors';
import DashStatusCard from '../components/DashStatusCard';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFinancialData, getOrderCountByStatus } from '../assets/data/dash';

const Dash = ({navigation}) => {

  const [refresh, setRefresh] = useState(false);

  const [cardData, setCardData] = useState({
    "pending": {
      title: "Pending",
      icon: <MaterialIcons name="pending-actions" size={24} color={colors.info} />,
      bgColor: colors.white,
      txtColor: colors.textDark,
      value: 0,
    },
    "delivered": {
      title: "Delivered",
      icon: <Ionicons name="checkmark-circle-outline" size={24} color={colors.success} />,
      bgColor: colors.white,
      txtColor: colors.textDark,
      value: 0,
    },
    "no_answer": {
      title: "No Answer",
      icon: <MaterialIcons name="phone-disabled" size={24} color={colors.warning} />,
      bgColor: colors.white,
      txtColor: colors.textDark,
      value: 0,
    },
    "returned": {
      title: "Returns",
      icon: <MaterialIcons name="assignment-return" size={24} color={colors.danger} />,
      bgColor: colors.white,
      txtColor: colors.textDark,
      value: 0,
    },
  });

  const [pieData, setPieData] = useState([
      { name: 'Pending', value: 0, color: colors.danger, legendFontColor: colors.textDark, legendFontSize: 14 },
      { name: 'No Answer', value: 0, color: colors.warning, legendFontColor: colors.textDark, legendFontSize: 14 },
      { name: 'Delivered', value: 0, color: colors.success, legendFontColor: colors.textDark, legendFontSize: 14 },
      { name: 'Returned', value: 0, color: colors.info, legendFontColor: colors.textDark, legendFontSize: 14 },
  ])

  const [financeData, setFinanceData] = useState(null)

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const startDate = (formatDate(new Date())).toString();
  const endDate = (formatDate(new Date())).toString();

  const fetchTodayOrders = async () => {
    try {
      const orders = await getOrderCountByStatus(startDate, endDate);

      //for cards
      const updatedCardData = { ...cardData };
      Object.keys(updatedCardData).forEach((key) => {
        updatedCardData[key].value = orders[key] || 0;
      });
      setCardData(updatedCardData);

      // For pie chart
      const updatedPieData = pieData.map((item) => {
        const key = item.name === "No Answer" ? "no_answer" : item.name.toLowerCase();
        return {
          ...item,
          value: parseInt(orders[key]) || 0,
        };
      });

      setPieData(updatedPieData);

    } catch (e) {
      console.log('Fetch orders failed 1', e);
    }
  };


  const fetchDashFinanceData = async () => {
    try {
      const data = await getFinancialData(startDate, endDate);
      setFinanceData(data);
    } catch (e) {
      console.log('Fetch orders failed', e);
    }
  };

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  }

  const handleMore = (type) => {
    if(type === 'Orders'){
      navigation.navigate('Report Orders');
    }else{
      navigation.navigate('Report Finance');
    }
  }

  useEffect(() => {
    fetchTodayOrders();
    fetchDashFinanceData();
  }, [refresh]);

  return (
    <>
      <Header showSearch={false} name={'My Dashboard'} />

      <TouchableOpacity onPress={handleRefresh} style={styles.refreshStyles}>
        <FontAwesome name="refresh" size={30} color={colors.primaryDark} />
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Cards for today's orders */}
          <View style={styles.section}>
            <Text style={styles.titleStyles}>Today Orders</Text>
            <View>

            <View style={styles.cardsContainer}>
              {Object.entries(cardData).map(([key, { title, value, bgColor, txtColor, icon }], index) => (
                <DashStatusCard
                  key={key}
                  title={title}
                  value={value}
                  bgColor={bgColor}
                  txtColor={txtColor}
                  icon={icon}
                />
              ))}
            </View>
            </View>
          </View>

          {/* Financial report */}
          <View style={styles.section}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleStyles}>Financial Report (Today)</Text>
              <TouchableOpacity onPress={() => handleMore('Finance')}>
                <Text style={styles.moreTextStyles}>More</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.financialReportContainer}>
              {financeData !== null ? (
                financeData.map((item, index) => (
                  <View style={styles.financialReportRow} key={index}>
                    <Text style={styles.financialReportLabel}>{item.name}</Text>
                    <Text style={styles.financialReportValue}>{item.value.toFixed(2)}</Text>
                  </View>
                ))
              ) : (<Text style={styles.moreTextStyles}>No Data Yet</Text>)
            }
            </View>
          </View>

          {/* Pie chart for past month orders */}
          <View style={styles.section}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleStyles}>Today Orders</Text>
              <TouchableOpacity onPress={() => handleMore('Orders')}>
                <Text style={styles.moreTextStyles}>More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardWrapper}>
              <PieChart
                data={pieData}
                width={300}
                height={200}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="value"
                backgroundColor={colors.white}
                paddingLeft="15"
                absolute
                hasLegend={true}
                style={{ marginVertical: 10 }}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  titleWrapper : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyles : {
    fontFamily: 'ms-bold',
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
  },
  moreTextStyles : {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.textDark,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  financialReportContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  financialReportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  financialReportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  financialReportLabel: {
    fontFamily: 'ms-regular',
    fontSize: 14,
  },
  financialReportValue: {
    fontFamily: 'ms-semibold',
    fontSize: 16,
  },
  cardWrapper:{
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshStyles:{
    backgroundColor: colors.dangerLight,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    right: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dash;
