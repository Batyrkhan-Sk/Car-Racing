import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCar, getCars } from '../api/cars';
import { AppDispatch } from '../store/store';
import generateRandomCars from '../utils/random';
import { GenerateCarsProps } from '../types/generateCarsTypes';

export default function GenerateCars({ onCarsGenerated }: GenerateCarsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCars = useCallback(async () => {
    setIsGenerating(true);
    try {
      const randomCars = generateRandomCars(100);
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
      style={{
        padding: '8px 16px',
        backgroundColor: '#3D5B59',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isGenerating ? 'Generating...' : 'Generate 100 Cars'}
    </button>
  );
}
