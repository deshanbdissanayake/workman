import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

import colors from '../assets/colors/colors';
import Header from '../components/Header';

const slides = [
  {
    title: 'Title 1',
    subTitle: 'Subtitle 1',
    image: '../assets/images/slider/slider-1.jpeg',
  },
  {
    title: 'Title 2',
    subTitle: 'Subtitle 2',
    image: '../assets/images/slider/slider-2.jpeg',
  },
  {
    title: 'Title 3',
    subTitle: 'Subtitle 3',
    image: '../assets/images/slider/slider-3.jpeg',
  },
];

const categories = [
  // Add your category data here
];

const latestStories = [
  // Add your latest stories data here
];

const Home = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        swiperRef.current &&
        swiperRef.current.state.index < slides.length - 1
      ) {
        swiperRef.current.scrollBy(1);
      } else {
        swiperRef.current.scrollBy(-slides.length + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const renderLatestStory = ({ item }) => (
    <TouchableOpacity style={styles.latestItem} key={item.id}>
      <Image style={styles.latestItemImage} source={item.image} />
      <View style={styles.latestItemText}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.date}</Text>
        </View>
        <Text style={styles.latestItemTitle}>{item.title}</Text>
        <View style={styles.iconWrapper}>
          <Ionicons name="location" size={16} color={colors.secondary} />
          <Text style={styles.iconText}>{item.place}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header name={'WORKMAN'} />
      <View style={styles.container}>
        <Text style={styles.homeTitle}>Home</Text>
        <View style={styles.sliderCard}>
          <Swiper
            ref={swiperRef}
            loop={true}
            showsPagination={true}
            index={0}
            autoplay={true}
            dotStyle={styles.paginationDot}
            activeDotStyle={styles.activePaginationDot}>
            {slides.map((slide, index) => (
              <View key={index} style={styles.slide}>
                <ImageBackground
                  source={slide.image}
                  style={styles.imageBackground}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.subTitle}>{slide.subTitle}</Text>
                </ImageBackground>
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoriesTitle}>All Categories</Text>
          <View style={styles.categories}>
            {categories.slice(0, 8).map((category) => (
              <TouchableOpacity
                style={styles.categoryItem}
                key={category.id}
              >
                <Image style={styles.categoryItemImage} source={category.image} />
                <Text style={styles.categoryItemTitle}>{category.name}</Text>
              </TouchableOpacity>
            ))}
            {categories.length > 7 && (
              <TouchableOpacity style={styles.categoryItem} key="view-more">
                <Image
                    style={styles.categoryItemImage}
                    source={require("../assets/images/category/view-more.png")}
                />

                <Text style={styles.categoryItemTitle}>View More</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.latestWrapper}>
          <Text style={styles.latestTitle}>Latest Items</Text>
          <FlatList
            data={latestStories}
            renderItem={renderLatestStory}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    fontFamily: 'montserrat',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subTitle: {
    fontFamily: 'montserrat',
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
    fontFamily: 'montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 10,
    width: '30%',
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryItemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  categoryItemTitle: {
    marginTop: 5,
    overflow: 'hidden',
    fontFamily: 'montserrat',
    fontSize: 12,
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
    fontFamily: 'montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    fontFamily: 'montserrat',
    fontSize: 10,
    color: colors.gray,
    marginLeft: 5,
  },
  latestItemTitle: {
    overflow: 'hidden',
    textAlign: 'left',
    fontFamily: 'montserrat',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Home;
