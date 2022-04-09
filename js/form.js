import {apartmentType} from './card.js';
import {postData} from './data.js';

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

const postButton = document.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  postButton.disabled = true;
};

const unblockSubmitButton = () => {
  postButton.disabled = false;
};

const DEFAULT_MARKER_POSITION = [35.69467, 139.76326];

const resetMap = () => {
  const title = document.querySelector('#title');
  const roomNumber = document.querySelector('#room_number');
  const capacity = document.querySelector('#capacity');
  const description = document.querySelector('#description');
  const address = document.querySelector('#address');
  const timein = document.querySelector('#timein');
  const timeout = document.querySelector('#timeout');
  title.value = '';
  type.value = 'flat';
  price.value ='5000';
  roomNumber.value = '1';
  capacity.value = '3';
  description.value = '';
  address.value = DEFAULT_MARKER_POSITION;
  timein.value = '12:00';
  timeout.value = '12:00';
  const input = document.querySelectorAll('.features__checkbox');
  for (let i = 0; i < input.length; ++i) {
    input[i].checked = false;
  }
};

const onSuccess = () => {
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(successMessage);
};

const onError = () => {
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(errorMessage);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    blockSubmitButton();
    postData(
      () => {
        resetMap();
        onSuccess();
        unblockSubmitButton();
      },
      () => {
        onError();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});
