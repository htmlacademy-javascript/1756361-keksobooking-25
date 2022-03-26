import {apartmentType} from './card.js';

const form = document.querySelector('.ad-form');

const formMap = document.querySelector('.map__filters');


// валидация заголовка

const title = document.querySelector('#title');

const pristine = new Pristine(title, {
  classTo: 'title',
  errorClass: 'title--invalid',
  successClass: 'title--valid',
});

title.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// валидация прайса

const apartmentMinPrice  = {
  palace:10000,
  flat:1000,
  house:5000,
  bungalow:0,
  hotel:3000,
};

const userTypeSelect = form.querySelector('#type');
const userPriceSelect = form.querySelector('#price');

const validatePrice = (value) => value >= apartmentMinPrice(userTypeSelect.value);

const getPriceErrorMessage = () => `Минимальная цена для жилья
'${apartmentType[userTypeSelect.value]}' должна быть '${apartmentMinPrice(userTypeSelect.value)}' руб.`;

pristine.addValidator(
  validatePrice,
  getPriceErrorMessage,
  `Минимальное значение ${apartmentMinPrice}`
);

pristine.addValidator(
  validatePrice,
  getPriceErrorMessage,
  'Слишком низкая стоимость'
);

userTypeSelect.addEventListener('change', (evt) => {

  userPriceSelect.placeholder = apartmentMinPrice(evt.target.value);
  pristine.validate(userPriceSelect);
});

// валидация комнат

const select1 = [
  {
    value: 1,
    text: '1 комната'
  }, {
    value: 3,
    text: '2 комнаты'
  }, {
    value: 3,
    text: '3 комнаты'
  }, {
    value: 100,
    text: '100 комнат'
  }
];

const select2 = [
  {
    id: 0,
    is: [0, 1, 2],
    text: 'для 1 гостя'
  }, {
    id: 1,
    is: [1, 2],
    text: 'для 2 гостей'
  }, {
    id: 2,
    is: [2],
    text: 'для 3 гостей'
  }, {
    id: 3,
    is: [3],
    text: 'Не для гостей'
  }
];

const fieldOne = document.getElementById('#room_number');
const fieldTwo = document.getElementById('#capacity');

createOptions(fieldOne, select1);
eventChange.call(fieldOne, fieldTwo);

fieldOne.addEventListener('change', eventChange.bind(fieldOne, fieldTwo));

function eventChange(field) {
  field.textContent = '';
  const filtered = select2.filter((o) => o.is.includes(+this.value));
  createOptions(field, filtered);
}


function createOptions(field, arrO) {
  for (const o of arrO) {
    const option = document.createElement('option');
    option.textContent = o.text;
    option.setAttribute('value', o.id);
    field.append(option);
  }
}

// неактивное состояние

const createDisable = (element, className) => {
  element.classList.add(`${className}--disabled`);
  Array.from(element.elements).forEach ((formElement) => {formElement.disabled = true;});
};

createDisable(form, 'ad-form');
createDisable(formMap, 'map__filters');

// активное состояние

const createActive = (element, className) => {
  element.classList.remove(`${className}--disabled`);
  Array.from(element.elements).forEach((formElement) => {formElement.disabled = false;});
};

createActive(form, 'ad-form');
createActive(formMap, 'map__filters');
