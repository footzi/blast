export const getRandomValueFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

export const mixArray = (array) => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }

  return newArray;
};
