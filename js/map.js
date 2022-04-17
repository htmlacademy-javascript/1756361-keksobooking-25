import {createActive, createDisable} from './form-status.js';
import {makePopup} from './card.js';
import {filter} from './filter.js';

const CENTER_TOKYO = {
  lat: 35.6895,
  lng: 139.692,
};

const LAT = 35.6895;
const LNG = 139.692;

const ZOOM_MAP = 10;

createDisable();

const map = L.map('map-canvas')
  .on('load', () => {
    createActive();
  })
  .setView(CENTER_TOKYO, ZOOM_MAP);


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
  CENTER_TOKYO,
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

const markerGroup = L.layerGroup().addTo(map);

const makePoints = (adverts) => {
  markerGroup.clearLayers();
  adverts.filter(filter).slice(0, 9).forEach((item) => {
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
      .addTo(markerGroup)
      .bindPopup(makePopup(item));
  });
};

const resetMap = () => {
  const latlng = L.latLng(LAT, LNG);
  mainPinMarker.setLatLng(latlng);
};

export {makePoints, resetMap};
