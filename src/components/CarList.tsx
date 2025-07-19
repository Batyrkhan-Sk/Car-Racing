import { useState } from 'react';
import styles from '../styles/CarList.module.css';
import { Car } from '../types/carTypes';

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, color: string) => void;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
}

// eslint-disable-next-line max-lines-per-function
export default function CarList({ cars, onDelete, onEdit, onStart, onStop }: CarListProps) {
  const [movingCars, setMovingCars] = useState<number[]>([]);

  const handleStart = (id: number) => {
    onStart(id);
    setMovingCars((prev) => [...prev, id]);
  };

  const handleStop = (id: number) => {
    onStop(id);
    setMovingCars((prev) => prev.filter((carId) => carId !== id));
  };

  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id} className={styles.carItem}>
          <span className={styles.carName}>{car.name}</span>
          <div
            className={`${styles.carBox} ${movingCars.includes(car.id) ? styles.moving : ''}`}
            style={{ backgroundColor: car.color }}
          />
          <div>
            <button type="button" onClick={() => onDelete(car.id)}>
              Delete
            </button>
            <button type="button" onClick={() => onEdit(car.id, car.name, car.color)}>
              Edit
            </button>
            <button type="button" onClick={() => handleStart(car.id)}>
              Start
            </button>
            <button type="button" onClick={() => handleStop(car.id)}>
              Stop
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
