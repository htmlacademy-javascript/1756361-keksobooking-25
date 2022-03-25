const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

const userInfoInput = document.querySelector('#title');

userInfoInput.addEventListener('input', () => {
  const valueLength = userInfoInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userInfoInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userInfoInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    userInfoInput.setCustomValidity('');
  }

  userInfoInput.reportValidity();
});

const userTypeSelect = document.querySelector('#type');

const userPriceSelect = document.querySelector('#price');

const apartmentMinPrice  = {
  palace:10000,
  flat:1000,
  house:5000,
  bungalow:0,
  hotel:3000,
};

userTypeSelect.addEventListener('change', (evt) => {
  userPriceSelect.min = apartmentMinPrice[evt.target.value];
  userPriceSelect.placeholder = apartmentMinPrice[evt.target.value];
});

const form = document.querySelector('.ad-form');

const formMap = document.querySelector('.map__filters');

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
