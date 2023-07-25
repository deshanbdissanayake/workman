const getCategories = async () => {
  const categories = [
    {
      id: 1, 
      name : 'Cat-1',
      image : require('../images/category/default.png'),
    },
    {
      id: 2, 
      name : 'Cat 2',
      image : require('../images/category/default.png'),
    },
    {
      id: 3, 
      name : 'Cat-3',
      image : require('../images/category/default.png'),
    },
    {
      id: 4, 
      name : 'Cat-4',
      image : require('../images/category/default.png'),
    },
    {
      id: 5, 
      name : 'Cat 5',
      image : require('../images/category/default.png'),
    },
    {
      id: 6, 
      name : 'Cat-6',
      image : require('../images/category/default.png'),
    },
    {
      id: 7, 
      name : 'Cat-7',
      image : require('../images/category/default.png'),
    },
    {
      id: 8, 
      name : 'Cat 8',
      image : require('../images/category/default.png'),
    },
    {
      id: 9, 
      name : 'Cat-9',
      image : require('../images/category/default.png'),
    },
    {
      id: 10, 
      name : 'Cat-10',
      image : require('../images/category/default.png'),
    },
    {
      id: 11, 
      name : 'Cat 11',
      image : require('../images/category/default.png'),
    },
    {
      id: 12, 
      name : 'Cat-12',
      image : require('../images/category/default.png'),
    },
  ]
  return categories;
}

const getLatestStories = async () => {
  const latestStories = [
    {
      id: 1,
      date: 'June 1, 2023',
      place: 'New York',
      title: 'Exciting Adventure',
      image: require('../images/latest/latest-1.jpg'),
    },
    {
      id: 2,
      date: 'May 28, 2023',
      place: 'Paris',
      title: 'City of Love',
      image: require('../images/latest/latest-2.jpg'),
    },
    {
      id: 3,
      date: 'May 28, 2023',
      place: 'Paris',
      title: 'City of Love',
      image: require('../images/latest/latest-3.jpg'),
    },
    {
      id: 4,
      date: 'May 28, 2023',
      place: 'Paris',
      title: 'City of Love',
      image: require('../images/latest/latest-2.jpg'),
    },
  ]
  return latestStories;
}

const getSlides = async () => {
  const slides = [
    {
      title: 'Title 1',
      subTitle: 'Subtitle 1',
      image: require('../images/slider/slider-1.jpeg'),
    },
    {
      title: 'Title 2',
      subTitle: 'Subtitle 2',
      image: require('../images/slider/slider-2.jpeg'),
    },
    {
      title: 'Title 3',
      subTitle: 'Subtitle 3',
      image: require('../images/slider/slider-3.jpeg'),
    },
  ];
  return slides;
}

export { getCategories, getLatestStories, getSlides };