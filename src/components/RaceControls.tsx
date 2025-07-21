/* eslint-disable max-lines-per-function */
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { startCarEngine, stopCarEngine } from '../api/engine';
import { startMultipleRaces, stopRace, resetRaces } from '../store/raceSlice';
import { resetFinishers } from '../store/winnerSlice';

interface RaceControlsProps {
  currentCars: { id: number; name: string; color: string }[];
}

export default function RaceControls({ currentCars }: RaceControlsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleStartAll = async () => {
    try {
      dispatch(resetFinishers());
      const enginePromises = currentCars.map((car) =>
        startCarEngine(car.id).catch((error) => {
          console.error(`Failed to start car ${car.id}`, error);
          return null;
        }),
      );

      const engineResults = await Promise.all(enginePromises);

      const validResults: Array<{ result: NonNullable<(typeof engineResults)[0]>; carId: number }> =
        [];

      engineResults.forEach((result, index) => {
        if (result !== null) {
          validResults.push({ result, carId: currentCars[index].id });
        }
      });

      if (validResults.length > 0) {
        dispatch(
          startMultipleRaces(
            validResults.map(({ result, carId }) => ({
              id: carId.toString(),
              velocity: result.velocity,
              distance: result.distance,
            })),
          ),
        );
      }
    } catch (error) {
      console.error('Failed to start all cars', error);
    }
  };

  const handleResetAll = async () => {
    try {
      const stopPromises = currentCars.map((car) =>
        stopCarEngine(car.id).catch((error) => {
          console.error(`Failed to stop car ${car.id}`, error);
        }),
      );

      await Promise.all(stopPromises);

      currentCars.forEach((car) => {
        dispatch(stopRace(car.id.toString()));
        const carElement = document.getElementById(`car-${car.id}`);
        if (carElement) {
          carElement.style.transition = 'none';
          carElement.style.transform = 'translateX(0) translateY(-50%)';
        }
      });

      dispatch(resetRaces());
      dispatch(resetFinishers());
    } catch (error) {
      console.error('Failed to reset all cars', error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleStartAll}
        style={{
          padding: '5px 10px',
          backgroundColor: '#7EC8E3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        Start All
      </button>
      <button
        type="button"
        onClick={handleResetAll}
        style={{
          padding: '5px 10px',
          backgroundColor: '#FA26A0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reset
      </button>
    </div>
  );
}
