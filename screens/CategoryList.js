import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import MiniButton from '../components/MiniButton';
import colors from '../assets/colors/colors';
import CardCategory from '../components/CardCategory';

const CategoryList = ({ route, navigation }) => {
  const { categories } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClickCategory = (prof) => {
    navigation.navigate('Single Screen', { prof });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <MiniButton
          bgColor={colors.border}
          func={handleGoBack}
          content={<Ionicons name="arrow-back-outline" size={24} color={colors.textDark} />}
        />
        <Text style={styles.titleStyles}>All Categories</Text>
      </View>
      <ScrollView>
        {categories.map((category) => (
          <View style={styles.sectionWrapper} key={category.cat_id}>
            <Text style={styles.sectionTitle}>{category.cat_name}</Text>
            <View style={styles.sectionProfWrapper}>
              {category.professions.map((prof) => (
                <View style={styles.profWrapper} key={prof.prof_id}>
                  <CardCategory
                    id={prof.prof_id}
                    img={{ uri: prof.icon }}
                    name={prof.prof_name}
                    func={() => handleClickCategory(prof)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
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
  sectionWrapper: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'ms-semibold',
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 10,
  },
  sectionProfWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  profWrapper: {
    marginHorizontal: 5,
  }
});
