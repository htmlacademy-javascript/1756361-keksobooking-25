import {getData} from './data.js';
import {makePoints} from './map.js';
import {debounce} from './util.js';

const DEBOUNCE_TIME = 500;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const features = document.querySelectorAll('.map__checkbox');


const checkType = (item) => {
  if (type.value === 'any'){
    return true;
  }
  return type.value === item.offer.type;
};

const checkPrice = (item) => {
  if (price.value === 'any'){
    return true;
  }
  if (price.value === 'middle') {
    return item.offer.price >= MIN_PRICE && item.offer.price < MAX_PRICE;
  }
  if (price.value === 'low') {
    return item.offer.price < MIN_PRICE;
  }
  if (price.value === 'high') {
    return item.offer.price >= MAX_PRICE;
  }
  return false;
};

const checkRooms = (item) => {
  if (rooms.value === 'any'){
    return true;
  }
  return (parseInt(rooms.value, 10) === item.offer.rooms);
};

const checkGuests = (item) => {
  if (guests.value === 'any'){
    return true;
  }
  return (parseInt(guests.value, 10) === item.offer.guests);
};

const checkFeature = (item) => {
  const checkedFeatures = Array.from(features).filter((element)=>element.checked);
  if (checkedFeatures.length === 0) {
    return true;
  }
  if (!item.offer.features) {
    return false;
  }
  return Array.from(checkedFeatures).every((element)=>item.offer.features.includes(element.value));
};

const debounceGetData = debounce( ()=> getData(makePoints), DEBOUNCE_TIME);

const filter = (item) => checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeature(item);
type.addEventListener('change', ()=>{
  debounceGetData();
});
price.addEventListener('change', ()=>{
  debounceGetData();
});
rooms.addEventListener('change', ()=>{
  debounceGetData();
});
guests.addEventListener('change', ()=>{
  debounceGetData();
});
features.forEach((element)=>{
  element.addEventListener('change', ()=>{
    debounceGetData();
  });
});

export {filter};
