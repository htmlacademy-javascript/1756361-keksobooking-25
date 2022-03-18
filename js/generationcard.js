import {
  getRandomInteger,
  getRandomFloat
} from './util.js';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

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

const avatars = [
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

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const booktimes = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAuthors= () => {
  const authors = {
    avatar: `img/avatars/user${avatars[getRandomInteger(0,  avatars.length - 1)]}.png`,
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
      type: types[getRandomInteger(0,  types.length - 1)],
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guest: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: booktimes[getRandomInteger(0,  booktimes.length - 1)],
      checkout: booktimes[getRandomInteger(0,  booktimes.length - 1)],
      feature: shuffleArray(features).slice(getRandomInteger(0,  features.length - 1)),
      description: 'Такой жил-площади позавидует любой кот! Сушеная рыба вместо штор!',
      photo: shuffleArray(photos).slice(getRandomInteger(0, photos.length - 1)),
    },
    location: createLocations(),
  };
};

export const makeSimilarAdvertisements = () => {
  const similarAdvertisements = Array.from({length: SIMILAR_AUTHOR_COUNT}, createNearestPlaces);
  return similarAdvertisements;
};

makeSimilarAdvertisements();
