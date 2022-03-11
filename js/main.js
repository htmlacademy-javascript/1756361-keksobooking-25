const getRandomInteger = (min, max) => {
  if (max <= min) {
    throw new Error(`Максимальное ${max} число не может быть меньше или равно ${min}`);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, count) => {
  if (max <= min) {
    throw new Error(`Максимальное ${max} число не может быть меньше или равно ${min}`);
  }
  return (min + Math.random() * (max - min)).toFixed(count);
};

getRandomInteger(1,2);
getRandomFloat(1,10, 5);

const MIN_PRICE = 1;
const MAX_PRICE = 99999999;

const MIN_ROOMS = 1;
const MAX_ROOMS = 6;

const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;

const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const SIMILAR_AUTHOR_COUNT = 10;

const arrayOfAvatars = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const arrayOfTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const arrayOfBookTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const arrayOfFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const arrayOfPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthors= () => {
  const authors = {
    avatar: `img/avatars/user${arrayOfAvatars[getRandomInteger(0,  arrayOfAvatars.length - 1)]}.png`,
  };
  return authors;
};

const createLocations = () => {
  const locations = {
    lat: getRandomFloat(MIN_LAT, MAX_LAT),
    lng: getRandomFloat(MIN_LNG, MAX_LNG),
  };
  return locations;
};

const createNearestPlaces = () => {
  const geoLocation = createLocations();

  return {
    author: createAuthors(),
    offer: {
      title: 'Посмотрите на это предложение! Возможно вам понравится!',
      adress: `${geoLocation.lat}, ${geoLocation.lng}`,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: arrayOfTypes[getRandomInteger(0,  arrayOfTypes.length - 1)],
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guest: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: arrayOfBookTimes[getRandomInteger(0,  arrayOfBookTimes.length - 1)],
      checkout: arrayOfBookTimes[getRandomInteger(0,  arrayOfBookTimes.length - 1)],
      features: arrayOfFeatures.slice(getRandomInteger(0,  arrayOfFeatures.length - 1)),
      description: 'Такой жил-площади позавидует любой кот! Сушеная рыба вместо штор!',
      photos: arrayOfPhotos.slice(getRandomInteger(0, arrayOfPhotos.length - 1)),
    },
    location: createLocations(),
  };
};

const makeSimilarAdvertisements = () => {
  const similarAdvertisements = Array.from({length: SIMILAR_AUTHOR_COUNT}, createNearestPlaces);
  return similarAdvertisements;
};

makeSimilarAdvertisements();
