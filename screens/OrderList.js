import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import FilterButton from '../components/FilterButton'
import OrderCard from '../components/OrderCard'
import { getAllOrders } from '../assets/data/order'
import colors from '../assets/colors/colors'
import Input from '../components/Input'
import { Ionicons } from '@expo/vector-icons'
import Button from '../components/Button'

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [prevOrders, setPrevOrders] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState('active');
    const [searchStatus, setSearchStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [itemStatusChange, setItemStatusChange] = useState(false);

    const handleSearchClick = () => {
        setSearchStatus(prevStt => !prevStt)
    }

    const handleSearch = (text) => {
        let filteredOrders;

        if (text.length > 0) {
            filteredOrders = orders.filter((order) => {
                const recvNameIncludesText = order.recv_name.includes(text);
                const recvAddressIncludesText = order.recv_address.includes(text);
                const recvContactIncludesText = order.order_token.includes(text);
                return recvNameIncludesText || recvAddressIncludesText || recvContactIncludesText;
            });
        } else {
            filteredOrders = prevOrders;
        }

        setOrders(filteredOrders);
    }

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
    }

    const fetchOrders = async (filter) => {
        setIsLoading(true)
        try {
            const data = await getAllOrders('all', filter);
            setOrders(data);
            setPrevOrders(data);
        } catch (e) {
            console.log('error fetching data', e);
        } finally {
            setIsLoading(false)
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setSearchStatus(false);
        setIsRefreshing(true);
        fetchOrders(selectedFilter);
    };

    useEffect(() => {
        fetchOrders(selectedFilter);
    }, [itemStatusChange, selectedFilter]);

    const removedItem = (removedOrderId) => {
        setItemStatusChange(prevStt => !prevStt)
        //console.log('remove',removedOrderId)
    }

    const renderOrderCard = ({item}) => {
        return <OrderCard orderData={item} removedItem={removedItem} />
    }

    return (
        <>
            <Header showSearch={true} name={"Order List"} searchFunc={handleSearchClick} />
            {searchStatus && (
                <View style={styles.searchBoxStyles}>
                    <Input
                        keyboardType = {"default"}
                        onChangeText = {handleSearch}
                        placeholder = {"Order Search"}
                        secureTextEntry = {false}
                        icon = {<Ionicons name="search-sharp" size={24} color={colors.textGray} />}
                    />
                </View>
            )}

            <View style={styles.container}>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        //contentContainerStyle={{flex: 1, justifyContent:'space-between'}}
                    >
                        <FilterButton
                            name={"Active"}
                            func={() => handleFilter('active')}
                            selected={selectedFilter === 'active'}
                        />
                        <FilterButton
                            name={"No Answer"}
                            func={() => handleFilter('no_answer')}
                            selected={selectedFilter === 'no_answer'}
                        />
                        <FilterButton
                            name={"Delivered"}
                            func={() => handleFilter('delivered')}
                            selected={selectedFilter === 'delivered'}
                        />
                        <FilterButton
                            name={"Returns"}
                            func={() => handleFilter('returned')}
                            selected={selectedFilter === 'returned'}
                        />
                    </ScrollView>
                </View>
                <View style={styles.orderListWrapper}>
                    <Text style={styles.orderListTitle}>{selectedFilter.replace(/_/g, ' ')} Order List</Text>
                    <View style={styles.orderListStyle}>
                        {isLoading ? (
                            <View style={styles.loadingStyles}>
                                <ActivityIndicator size={'large'} color={colors.textDark}/>
                            </View>
                            ) : orders.length > 0 ? (
                                <FlatList
                                    data={orders}
                                    renderItem={renderOrderCard}
                                    keyExtractor={(order) => order.order_id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl  isRefreshing={isRefreshing} onRefresh={handleRefresh}/>
                                    }
                                />
                            ) : (
                                <>
                                    <Text style={styles.noDataText}>No Orders Available Yet</Text>

                                    <Button
                                        bgColor={colors.white}
                                        txtColor={colors.primaryDark}
                                        text={'Reload Order List'}
                                        func={()=>handleRefresh()} 
                                    />
                                </>
                            )
                        }
                    </View>
                </View>
            </View>
        </>
    )
}

export default OrderList

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    searchBoxStyles: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    orderFilterWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderListWrapper: {
        flex: 1,
    },
    orderListTitle: {
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
        textTransform: 'capitalize',
        marginBottom: 20,
    },
    orderListStyle: {
        flex: 1,
    },
    noDataText: {
        backgroundColor: colors.border,
        padding: 10,
        textAlign: 'center',
        fontFamily: 'ms-regular',
        fontSize: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    loadingStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
