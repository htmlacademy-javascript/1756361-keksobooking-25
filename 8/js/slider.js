// import {typeMinPrice} from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
// const typeElement = document.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 500,
  connect: 'lower'
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});


// изменение в зависимости от типа жилья
// typeElement.addEventListener('change', (evt) => {
//   if  (typeElement.value === typeMinPrice.bungalow) {
//     range: {
//       min: 0,
//       max: 3000,
//     },
//     step: 200,
//   } else {

//   }
// };
