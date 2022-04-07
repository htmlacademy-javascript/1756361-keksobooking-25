import './util.js';
import './form.js';
import './slider.js';
import {makePoints} from './map.js';
import {getData} from './data.js';
import {makePopup} from './card.js';

getData((advert) => {
  makePoints(advert, makePopup);
}, () => {
  const errorDataMessage = document.querySelector('#errorData').content.querySelector('.error').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(errorDataMessage);
});
