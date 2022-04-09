
const templateAdvertisements = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardElement = templateAdvertisements.cloneNode(true);
const imgElement = document.createElement('img');
const featuresAd = cardElement.querySelector('.popup__features');

const fillFeatures = (featuresElement, featuresArray) => {
  if (featuresElement) {
    featuresArray.innerHTML = '';
    featuresArray.forEach((item) => {
      const liElement = document.createElement('li');
      liElement.classList.add('popup__feature' , `popup__feature--${item}` );
      featuresAd.append(liElement);
    });
  } else {
    featuresAd.remove();
  }
};

const fillPhotos = (photosElement, photosArray) => {
  if (photosElement) {
    photosElement.innerHTML = '';
    photosArray.forEach((item) => {
      imgElement.classList.add('popup__photo');
      imgElement.src=`${item}`;
      imgElement.width='45';
      imgElement.height='40';
      imgElement.alt='Фотография жилья';
      photosElement.appendChild(imgElement);
    });
  } else {
    imgElement.remove();
  }
};

const apartmentType  = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const makePopup = (item) => {
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = apartmentType [item.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guest} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} , выезд до  ${item.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;
  fillFeatures();
  fillPhotos();
  return cardElement;
};

export {makePopup, apartmentType};
