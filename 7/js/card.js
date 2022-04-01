const fillFeatures = (featuresElement, featuresArray) => {
  featuresElement.innerHTML = '';

  featuresArray.forEach((item) => {
    const liElement = document.createElement('li');

    liElement.classList.add('popup__feature' , `popup__feature--${item}` );
    featuresElement.appendChild(liElement);
  });
  return fillFeatures;
};

const fillPhotos = (photosElement, photosArray) => {
  photosElement.innerHTML = '';

  photosArray.forEach((item) => {
    const imgElement = document.createElement('img');
    imgElement.classList.add('popup__photo');
    imgElement.src=`${item}`;
    imgElement.width='45';
    imgElement.height='40';
    imgElement.alt='Фотография жилья';

    photosElement.appendChild(imgElement);
  });
};

const templateAdvertisements = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const apartmentType  = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

export const makePopup = (item) => {
  const cardElement = templateAdvertisements.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = apartmentType [item.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guest} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} , выезд до  ${item.offer.checkout}`;
  fillFeatures(cardElement.querySelector('.popup__features'), item.offer.feature);
  cardElement.querySelector('.popup__description').textContent = item.offer.description;
  fillPhotos(cardElement.querySelector('.popup__photos'), item.offer.photo);
  return cardElement;
};
