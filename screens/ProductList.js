import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MiniButton from '../components/general/MiniButton';
import colors from '../assets/colors/colors';

import { getProducts } from '../assets/data/getData';
import NoData from '../components/app/NoData';
import CardProduct from '../components/app/CardProduct';
import Select from '../components/general/Select';

const ProductList = ({ navigation }) => {
    const [productCats, setProductCats] = useState(null);
    const [products, setProducts] = useState(null);
    const [productsOriginal, setProductsOriginal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [selectedCatName, setSelectedCatName] = useState(null);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const getProductsFunc = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            setProductCats(response);

            if (response !== null && response.length !== 0) {
                const productsToSet = response.flatMap(category => category.products);
                setProducts(productsToSet);
                setProductsOriginal(productsToSet);
            }

        } catch (error) {
          console.error('Get Booking Func error', error);
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
    };      

    const onRefresh = () => {
        setRefreshing(true);
        getProductsFunc();
    };
    
    useEffect(()=>{
        getProductsFunc();
    },[])

    const selectCatFunc = (catId) => {
        setSelectedCat(catId)

        
        if (catId !== null) {
            //get category name
            const selectedCatArr = productCats.filter((cat) => cat.pro_cat_id == catId); 
            setSelectedCatName(selectedCatArr[0].cat_name)

            //product filter by cat id
            setProducts(productsOriginal.filter((product) => product.fk_pro_cat_id == catId));
        } else {
            setProducts(productsOriginal);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <MiniButton
                    bgColor={colors.border}
                    func={handleGoBack}
                    content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
                />
                <Text style={styles.titleStyles}>Products</Text>
            </View>
            <View>
                <View style={styles.selectWrapper}>
                    <Select
                        data={
                        productCats !== null && productCats.length !== 0
                            ? productCats.map(cat => ({ id: cat.pro_cat_id, name: cat.cat_name }))
                            : null
                        }
                        selectedValue={selectedCat}
                        onValueChange={value => selectCatFunc(value)}
                    />
                    
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Add RefreshControl component
                    }
                >
                {loading ? (
                    <NoData msg={'Loading...'} />
                ) : (products !== null && products.length !== 0 ) ? (
                    products.map((product, index) => (
                        <CardProduct product={product} catName={selectedCatName} key={index} />
                    ))
                ) : (
                    <NoData msg={'No Products Yet!'} />
                )}
                </ScrollView>
            </View>
        </View>
    )
}

export default ProductList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    topWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleStyles: {
        fontFamily: 'ms-semibold',
        fontSize: 18,
        color: colors.textDark,
        marginLeft: 20,
    },
    selectWrapper: {
        marginBottom: 20,
    }
})