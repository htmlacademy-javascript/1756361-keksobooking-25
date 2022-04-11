import {createActive, createDisable} from './form-status.js';
import {makePopup} from './card.js';

const LAT = 35.6895;
const LNG = 139.692;

createDisable();

const map = L.map('map-canvas')
  .on('load', () => {
    createActive();
  })
  .setView({
    lat: LAT,
    lng:  LNG,
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
address.value = `${LAT} / ${LNG}`;

mainPinMarker.on('moveend', (evt) => {
  const markerPosition = (evt.target.getLatLng());
  address.value = `${markerPosition.lat.toFixed(5)} / ${markerPosition.lng.toFixed(5)}`;
});

const makePoints = (advert) => {
  advert.slice(0, 9).forEach((item) => {
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

export {makePoints};
