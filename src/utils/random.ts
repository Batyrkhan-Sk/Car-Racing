function generateRandomCars(count: number) {
  const names = ['Ferrari', 'Lamborghini', 'Porsche', 'Bugatti', 'McLaren'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black'];
  const result = [];

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    result.push({ name, color });
  }

  return result;
}

export default generateRandomCars;