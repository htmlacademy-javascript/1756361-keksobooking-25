const getData = (insertAdvert, err) => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    response.json();
  })
  .then((advert) => {
    insertAdvert(advert);
  })
  .catch(() => {
    document.querySelector('.map__filters').classList.add('map__filters--disabled');
    err('Не удалось загрузить данные!');
  });

const postData = (onSuccess, onErr, data) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onErr('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onErr('Не удалось отправить форму. Попробуйте ещё раз!!');
    });
};

export {getData, postData};
