import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

import colors from '../assets/colors/colors';
import Header from '../components/Header';
import { getCategories, getLatestStories, getSlides } from '../assets/data/getData';
import CardLatestStory from '../components/CardLatestStory';
import CardCategory from '../components/CardCategory';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const swiperRef = useRef(null);

    const [slides, setSlides] = useState(null);
    const [categories, setCategories] = useState(null);
    const [latestStories, setLatestStories] = useState(null); 

    useEffect(() => {
        fetchSlides();
        fetchCategories();
        fetchLatestStories();
    },[]);

    const fetchSlides = async () => {
        const sli = await getSlides();
        setSlides(sli);
    };

    const fetchCategories = async () => {
        const cat = await getCategories();
        setCategories(cat);
    };

    const fetchLatestStories = async () => {
        const ls = await getLatestStories();
        setLatestStories(ls);
    };

    useEffect(() => {
        const timer = setInterval(() => {
        if (swiperRef.current && swiperRef.current.state.index < slides.length - 1) {
            swiperRef.current.scrollBy(1);
        } else {
            swiperRef.current.scrollBy(-slides.length + 1);
        }
        }, 3000);

        return () => clearInterval(timer);
    }, [slides]);

    const handleClickCategory = (cat) => {
        navigation.navigate('Single Screen', { cat });
    }

    const handleViewMore = () => {
        console.log('handle click view more')
    }


  const renderLatestStory = ({ item }) => (
    <CardLatestStory item={item} />
  );

  return (
    <>
      <Header name={'WORKMAN'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
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
                  <ImageBackground
                    source={slide.image}
                    style={styles.imageBackground}
                  >
                    <Text style={styles.title}>{slide.title}</Text>
                    <Text style={styles.subTitle}>{slide.subTitle}</Text>
                  </ImageBackground>
                </View>
              ))}
            </Swiper>
          )}
        </View>

        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoriesTitle}>All Categories</Text>
          <View style={styles.categories}>
            {categories &&
              categories.slice(0, 8).map((category) => (
                <CardCategory 
                  id={category.id} 
                  key={category.id} 
                  img={category.image} 
                  name={category.name} 
                  func={() => handleClickCategory(category)}
                />
              ))}
            {categories && categories.length > 7 && (
                <CardCategory 
                  id={"view-more"} 
                  key={"view-more"} 
                  img={require("../assets/images/category/view-more.png")} 
                  name={'View More'} 
                  func={handleViewMore}
                />
            )}
          </View>
        </View>

        <View style={styles.latestWrapper}>
          <Text style={styles.latestTitle}>Latest Items</Text>
          {latestStories && (
            <FlatList
              data={latestStories}
              renderItem={renderLatestStory}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sliderCard: {
    height: 150,
    padding: 10,
  },
  slide: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'ms-bold',
    fontSize: 20,
    color: colors.white,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subTitle: {
    fontFamily: 'ms-regular',
    fontSize: 14,
    color: colors.white,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
});

export default Home;
