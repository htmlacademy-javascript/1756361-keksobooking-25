const getRandomInteger = (min, max) => {
  if (max <= min) {
    return(`Максимальное ${max} число не может быть меньше или равно ${min}`);

  }
  return Math.floor(min + Math.random() * (max - min));
};

const getRandomFloat = (min, max) => {
  if (max <= min) {
    return(`Максимальное ${max} число не может быть меньше или равно ${min}`);
  }
  return (min + Math.random() * (max - min)).toFixed(5);
};

getRandomInteger(1,2);
getRandomFloat(1,10);
