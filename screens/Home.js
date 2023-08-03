import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

import colors from '../assets/colors/colors';
import Header from '../components/app/Header';
import { getCategories, getLatestStories, getSlides } from '../assets/data/getData';
import CardLatestStory from '../components/app/CardLatestStory';
import CardCategory from '../components/app/CardCategory';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const swiperRef = useRef(null);

    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false); // To handle drag-to-refresh

    const [slides, setSlides] = useState(null);
    const [categories, setCategories] = useState(null);
    const [professions, setProfessions] = useState(null);
    const [latestStories, setLatestStories] = useState(null); 

    useEffect(() => {
        setLoading(true)
        fetchData();
    },[]);

    const fetchData = async () => {
        await Promise.all([fetchSlides(), fetchCategories(), fetchLatestStories()]);
        setLoading(false)
    };

    const fetchSlides = async () => {
        const sli = await getSlides();
        if(sli.length == 0){
            setSlides(null);
        }else{
            setSlides(sli);
        }
    };

    const fetchCategories = async () => {
        const cat = await getCategories();
        setCategories(cat);

        const professionsList = cat.flatMap(category => category.professions.map(profession => ({
          prof_id: profession.prof_id,
          prof_name: profession.prof_name,
          icon: profession.icon
        })));

        setProfessions(professionsList);
    };

    const fetchLatestStories = async () => {
        const ls = await getLatestStories();
        if(ls.length == 0){
            setLatestStories(null);
        }else{
            setLatestStories(ls);
        }
    };

    useEffect(() => {
        if(slides !== null){
            const timer = setInterval(() => {
                if (swiperRef.current && swiperRef.current.state.index < slides.length - 1) {
                    swiperRef.current.scrollBy(1);
                } else {
                    swiperRef.current.scrollBy(-slides.length + 1);
                }
            }, 5000);
    
            return () => clearInterval(timer);
        }
    }, [slides]);

    const handleClickCategory = (prof) => {
        navigation.navigate('Single Screen', { prof });
    }

    const handleViewMore = (categories) => {
        navigation.navigate('Category List', {categories});
    }

    const handleUser = () => {
        navigation.navigate('User Screen');
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const handleCardClick = (item) => {
        navigation.navigate('Single Story Screen', { item })
    }

    const renderLatestStory = ({ item }) => (
        <CardLatestStory item={item} handleCardClick={() => handleCardClick(item)} />
    );

    return (
        <>
            <Header name={'WORKMAN'} handleUser={handleUser} />
            <ScrollView 
                style={styles.container} 
                showsVerticalScrollIndicator={false} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                  <View style={styles.loadingWrapper}>
                    <ActivityIndicator size="small" color={colors.textDark} />
                  </View>
                ) : (
                    <>
                        <View style={styles.sliderCard}>
                            {slides && slides.length > 0 && (
                                <Swiper
                                    ref={swiperRef}
                                    loop={true}
                                    showsPagination={true}
                                    index={0}
                                    autoplay={true}
                                    dotStyle={styles.paginationDot}
                                    activeDotStyle={styles.activePaginationDot}
                                >
                                    {slides.map((slide, index) => (
                                        <View key={index} style={styles.slide}>
                                              <Image
                                                  source={{ uri : slide.image }}
                                                  style={styles.imageBackground}
                                              />
                                              <Text numberOfLines={2} style={styles.title}>{slide.title}</Text>
                                              <Text numberOfLines={2} style={styles.subTitle}>{slide.sub_title}</Text>
                                        </View>
                                    ))}
                                </Swiper>
                            )}
                        </View>

                        <View style={styles.categoriesWrapper}>
                            <Text style={styles.categoriesTitle}>All Categories</Text>
                            <View style={styles.categories}>
                                {professions && professions.length > 0 ? (
                                    professions.slice(0, 8).map((prof) => (
                                        <CardCategory 
                                            id={prof.prof_id} 
                                            key={prof.prof_id} 
                                            img={{ uri: prof.icon }} 
                                            name={prof.prof_name} 
                                            func={() => handleClickCategory(prof)}
                                        />
                                    ))
                                ) : (
                                    <View style={styles.noDataWrapper}>
                                        <Text style={styles.noDataStyles}>There are no categories yet.</Text>
                                    </View>
                                )}

                                {professions && professions.length > 7 && (
                                    <CardCategory 
                                        id={"view-more"} 
                                        key={"view-more"} 
                                        img={require("../assets/images/category/view-more.png")} 
                                        name={'View More'} 
                                        func={() => handleViewMore(categories)}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.latestWrapper}>
                            <Text style={styles.latestTitle}>Latest Stories</Text>
                            {latestStories && (
                                <FlatList
                                    data={latestStories}
                                    renderItem={renderLatestStory}
                                    keyExtractor={(item) => item.str_id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    sliderCard: {
        height: 150,
        padding: 10,
    },
    slide: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.4,
    },
    title: {
        position:'absolute',
        top: 10,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        fontFamily: 'ms-bold',
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 5,
        textAlign: 'center',
        opacity: 1,
    },
    subTitle: {
        position:'absolute',
        top: 55,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
        marginBottom: 20,
        textAlign: 'center',
        opacity: 1,
    },
    categoriesWrapper: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    categoriesTitle: {
        fontFamily: 'ms-bold',
        fontSize: 16,
        marginBottom: 10,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.white,
        marginHorizontal: 3,
    },
    activePaginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        marginHorizontal: 3,
    },
    latestWrapper: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    latestTitle: {
        fontFamily: 'ms-bold',
        fontSize: 16,
        marginBottom: 10,
    },
    noDataWrapper : {
        flex: 1,
        backgroundColor: colors.border,
        padding: 10,
        borderRadius: 5,
    },
    noDataStyles : {
        fontFamily: 'ms-regular',
        fontSize: 12,
        color: colors.textDark,
        textAlign: 'center',
    },
});

export default Home;
