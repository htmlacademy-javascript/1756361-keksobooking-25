import {apartmentType} from './card.js';

const form = document.querySelector('.ad-form');

//валидация имени
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

form.addEventListener('submit',  (e) => {
  e.preventDefault();
  pristine.validate();
});

//валидация прайса

const price = document.querySelector('#price');
const type = document.querySelector('#type');

const typeMinPrice  = {
  palace:10000,
  flat:1000,
  house:5000,
  bungalow:0,
  hotel:3000,
};

let currentType;
let currentValidPrice;

const textError = () => {
  currentValidPrice = typeMinPrice[type.value];
  currentType = apartmentType[type.value];
  return `Минимальная цена для ${currentType} ${currentValidPrice}₽.`;
};

const priceValid = (userPrice) => {
  userPrice = true;
  return typeMinPrice[type.value] <= userPrice; //взять значение, перечень значений соответсвую назначить цену
};

pristine.addValidator(price, priceValid, textError);

// комнаты
const numberSelector = form.querySelector('#room_number');
const capacitySelector = form.querySelector('#capacity');

const numberCapacity = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const validNumberCapasity = () => {
  if (numberCapacity[numberSelector.value].includes(capacitySelector.value)) {
    return true;
  }
  else {
    return false;
  }
};

pristine.addValidator(capacitySelector, validNumberCapasity, 'Недопустимое количество гостей при заданном количестве комнат');

//время выезда время заезда

const  timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const validateTimeError = () => {
  if (timeIn.value !== timeOut.value){
    return false;
  } else {
    return true;
  }
};

pristine.addValidator(timeOut, validateTimeError, 'Время выезда должно соответствовать времени заезда');

// const validateTimeOut = () => {
//   timeOut.value = timeIn.value;
//   pristine.validate(timeOut);
// };

// const validateTimeIn = () => {
//   timeIn.value = timeOut.value;
//   pristine.validate(timeOut);
// };

// validateTimeIn();
// validateTimeOut();
