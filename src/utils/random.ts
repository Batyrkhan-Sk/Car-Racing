function generateRandomCars(count: number) {
  const names = ['Biro', 'Cobalt', 'Lada', 'Moskvich', 'Zhiguli'];
  const colors = ['Purple', 'Blue', 'Beige', 'Yellow', 'Orange'];
  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    result.push({ name, color });
  }

  return result;
}

export default generateRandomCars;
