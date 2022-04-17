const apartmentType  = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const templateAdvertisements = document.querySelector('#card')
  .content
  .querySelector('.popup');

const makePopup = (item) => {
  const cardElement = templateAdvertisements.cloneNode(true);
  const imgElement = document.createElement('img');
  const photoAd = cardElement.querySelector('.popup__photos');
  const featuresAd = cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__title').textContent = item.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = apartmentType [item.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} , выезд до  ${item.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = item.offer.description;

  const fillFeatures = (features) => {
    if (features) {
      featuresAd.classList.remove('.visually-hidden');
      featuresAd.innerHTML = '';
      features.forEach((feature) => {
        const liElement = document.createElement('li');
        liElement.classList.add('popup__feature' , `popup__feature--${feature}` );
        featuresAd.append(liElement);
      });
    } else {
      featuresAd.classList.add('.visually-hidden');
    }
  };
  fillFeatures(item.offer.features);

  const fillPhotos = (photos) => {
    if (photos) {
      photoAd.classList.remove('.visually-hidden');
      photoAd.innerHTML = '';
      photos.forEach((photo) => {
        imgElement.classList.add('popup__photo');
        imgElement.src=`${photo}`;
        imgElement.width='45';
        imgElement.height='40';
        imgElement.alt='Фотография жилья';
        photoAd.appendChild(imgElement);
      });
    } else {
      photoAd.classList.add('.visually-hidden');
    }
  };
  fillPhotos(item.offer.photos);

  return cardElement;
};

export {makePopup, apartmentType};
