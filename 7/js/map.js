import {createActive, createDisable} from './form-status.js';
import { similarAdvertisement } from './generationcard.js';
import {makePopup} from './card.js';

//слой
// const pointsGroup = L.layerGroup().addTo(map);

createDisable();

const map = L.map('map-canvas')
  .on('load', () => {
    createActive();
  })
  .setView({
    lat: 35.6895,
    lng:  139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng:  139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const obgPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const address = document.querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  const markerPosition = (evt.target.getLatLng());
  address.value = `${markerPosition.lat.toFixed(5)} / ${markerPosition.lng.toFixed(5)}`;
});

const makePoints = () => {
  similarAdvertisement.forEach((item) => {
    const obgPinMarker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        draggable: true,
        icon: obgPinIcon,
      },
    );

    obgPinMarker
      .addTo(map)
      .bindPopup(makePopup(item));
  });
};

makePoints();

similarAdvertisement.forEach((point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;
  const similarMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: obgPinIcon,
    },
  );
  similarMarker
    .addTo(map)
    .bindPopup(makePopup(point));
});

// кнопка для очистки формы
// const resetButton = document.querySelector('ad-reset');

// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 35.6895,
//     lng: 139.692,
//   });
// });
