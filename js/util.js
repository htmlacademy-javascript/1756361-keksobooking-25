const getRandomInteger = (min, max) => {
  if (max <= min) {
    throw new Error(`Максимальное ${max} число не может быть меньше или равно ${min}`);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = (min, max, count) => {
  if (max <= min) {
    throw new Error(`Максимальное ${max} число не может быть меньше или равно ${min}`);
  }
  return (min + Math.random() * (max - min)).toFixed(count);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomInteger, debounce};
