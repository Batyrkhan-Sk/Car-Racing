function generateRandomCars(count: number) {
  const names = ['Biro', 'Cobalt', 'Lada', 'Moskvich', 'Zhiguli'];
  const colors = ['Purple', 'Blue', 'Beige', 'Yellow', 'Orange'];

  return Array.from({ length: count }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { name, color };
  });
}

export default generateRandomCars;
