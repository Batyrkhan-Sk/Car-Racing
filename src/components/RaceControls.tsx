/* eslint-disable max-lines-per-function */
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { startCarEngine, stopCarEngine } from '../api/engine';
import { startMultipleRaces, stopRace, resetRaces } from '../store/raceSlice';
import { resetFinishers } from '../store/winnerSlice';
import styles from '../styles/RaceControls.module.css';
import { RACE_START_ALL_LABEL, RACE_RESET_LABEL } from '../constants';

interface RaceControlsProps {
  currentCars: { id: number; name: string; color: string }[];
}

export default function RaceControls({ currentCars }: RaceControlsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const races = useSelector((state: RootState) => state.race.races);
  const isRaceActive = Object.values(races).some(
    (race) => race.status === 'started' || race.status === 'driving',
  );

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
        disabled={isRaceActive}
        className={`${styles.raceControlsBtn} ${styles.raceControlsStart}`}
      >
        {RACE_START_ALL_LABEL}
      </button>
      <button
        type="button"
        onClick={handleResetAll}
        className={`${styles.raceControlsBtn} ${styles.raceControlsReset}`}
      >
        {RACE_RESET_LABEL}
      </button>
    </div>
  );
}
