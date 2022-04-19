const form = document.querySelector('.ad-form');
const formFieldset = form.querySelectorAll('.ad-form__element');
const formFieldsetHeader = form.querySelectorAll('.ad-form-header');
const mapForm = document.querySelector('.map__filters');

const createDisable = () => {
  form.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');
  Array.from(formFieldset).forEach((element) => {
    element.disabled = true;
  });
  Array.from(mapForm).forEach((element) => {
    element.disabled = true;
  });
  Array.from(formFieldsetHeader).forEach((element) => {
    element.disabled = true;
  });
};


const createActive = () => {
  form.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');
  Array.from(formFieldset).forEach((element) => {
    element.disabled = false;
  });
  Array.from(mapForm).forEach((element) => {
    element.disabled = false;
  });
  Array.from(formFieldsetHeader).forEach((element) => {
    element.disabled = false;
  });
};


export {createActive, createDisable};
