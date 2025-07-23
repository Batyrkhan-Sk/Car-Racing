function generateRandomCars(count: number) {
  const brandModelsMap: Record<string, string[]> = {
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    Ford: ['Mustang', 'F-150', 'Explorer', 'Focus'],
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Prius'],
    BMW: ['X5', '3 Series', '5 Series', 'i8'],
    Audi: ['A4', 'Q5', 'A6', 'TT'],
    Chevrolet: ['Camaro', 'Impala', 'Tahoe', 'Malibu'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
    Nissan: ['Altima', 'Sentra', 'Rogue', 'Leaf'],
    Mercedes: ['C-Class', 'E-Class', 'GLA', 'S-Class'],
    Kia: ['Sportage', 'Sorento', 'Optima', 'Rio'],
  };

  const colors = [
    'Purple',
    'Blue',
    'Beige',
    'Yellow',
    'Orange',
    'Red',
    'Green',
    'Black',
    'White',
    'Silver',
  ];

  const brands = Object.keys(brandModelsMap);

  return Array.from({ length: count }, () => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const models = brandModelsMap[brand];
    const model = models[Math.floor(Math.random() * models.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return { name: `${brand} ${model}`, color };
  });
}

export default generateRandomCars;
