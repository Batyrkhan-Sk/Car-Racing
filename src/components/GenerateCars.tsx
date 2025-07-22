import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCar, getCars } from '../api/cars';
import { AppDispatch } from '../store/store';
import generateRandomCars from '../utils/random';
import { GenerateCarsProps } from '../types/generateCarsTypes';
import { GENERATE_CARS_COUNT } from '../constants';
import styles from '../styles/GenerateCars.module.css';

export default function GenerateCars({ onCarsGenerated }: GenerateCarsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCars = useCallback(async () => {
    setIsGenerating(true);
    try {
      const randomCars = generateRandomCars(GENERATE_CARS_COUNT);
      await Promise.all(randomCars.map((car) => dispatch(createCar(car.name, car.color))));
      await dispatch(getCars());
      onCarsGenerated();
    } catch (error) {
      console.error('Failed to generate cars:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [dispatch, onCarsGenerated]);

  return (
    <button
      type="button"
      onClick={handleGenerateCars}
      disabled={isGenerating}
      className={styles.generateButton}
    >
      {isGenerating ? 'Generating...' : `Generate ${GENERATE_CARS_COUNT} Cars`}
    </button>
  );
}
