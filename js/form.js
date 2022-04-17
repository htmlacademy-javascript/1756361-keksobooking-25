import {postData} from './data.js';

const form = document.querySelector('.ad-form');
const formReset = document.querySelector('.ad-form__reset');

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

const typeMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const changeMinPrice = () => {
  price.min = typeMinPrice[type.value];
  price.placeholder = typeMinPrice[type.value];
};

type.addEventListener('change', changeMinPrice);
const validatePrice = () => price.value && Number(document.querySelector('#price').value) >= Number(form.querySelector('#price').min);
const getPriceErrorMessage = () => `Минимальная цена - ${price.min}`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

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


const LAT = 35.6895;
const LNG = 139.692;

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
  price.value ='5000,00';
  roomNumber.value = '1';
  capacity.value = '3';
  description.value = '';
  address.value = `${LAT} / ${LNG}`;
  timein.value = '12:00';
  timeout.value = '12:00';
  const input = document.querySelectorAll('.features__checkbox');
  for (let i = 0; i < input.length; ++i) {
    input[i].checked = false;
  }
};

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
});

const isEscEvent = (evt) => evt.key === 'Escape'|| evt.key === 'Esc';

const removeMessageListener = (element, onDocumentKeydown) => {
  element.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};


const onSuccess = () => {
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(successMessage);

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageListener(successMessage);
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);
  successMessage.addEventListener('click', () => {
    removeMessageListener(successMessage);
  });
};

const onError = () => {
  const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(errorMessage);

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageListener(errorMessage);
    }
  };
  const closeErrorButton = errorMessage.querySelector('.error__button');

  document.addEventListener('keydown', onDocumentKeydown);
  closeErrorButton.addEventListener('click', () => {
    removeMessageListener(errorMessage);
  });
  errorMessage.addEventListener('click', () => {
    removeMessageListener(errorMessage);
  });
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
