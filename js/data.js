const onErr = () => {
  const errorDataMessage = document.querySelector('#errorData').content.querySelector('.error').cloneNode(true);
  const mapCanvas = document.querySelector('#map-canvas');
  mapCanvas.appendChild(errorDataMessage);
};

const responseData = (response) => response.json();

const getData = (onSuccess) => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then(responseData)
  .then(onSuccess)
  .catch(() => {
    document.querySelector('.map__filters').classList.add('map__filters--disabled');
    onErr('Не удалось загрузить данные!');
  });

const postData = (onSuccess, err, data) => {
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
        err('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      err('Не удалось отправить форму. Попробуйте ещё раз!!');
    });
};

export {getData, postData};
