const BASE = 'http://127.0.0.1:3000/';

export const getCars = async () => {
  const res = await fetch(`${BASE}/garage`);
  return res.json();
};

export const createCar = async (car: { name: string; color: string }) => {
  const res = await fetch(`${BASE}/garage`, {
    method: 'POST',
    body: JSON.stringify(car),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
};

// Add updateCar, deleteCar, startEngine, etc.
