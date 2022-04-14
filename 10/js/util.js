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

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, debounce};
