import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/CarList.module.css';
import { Car } from '../types/carTypes';
import { RootState } from '../store/store';
import CarItem from './CarItem';
import { RaceStatus } from '../types/raceTypes';
import { processRaceUpdates, checkForRaceStart } from '../utils/race';

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, color: string) => void;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
}

export default function CarList({ cars, onDelete, onEdit, onStart, onStop }: CarListProps) {
  const races = useSelector((state: RootState) => state.race.races);
  const dispatch = useDispatch();
  const previousRacesRef = useRef<Record<string, RaceStatus>>({});
  const winnerSavedRef = useRef(false);

  const handleRaceStart = useCallback(() => {
    checkForRaceStart(races, previousRacesRef, winnerSavedRef);
  }, [races]);

  const handleRaceUpdates = useCallback(() => {
    processRaceUpdates(races, previousRacesRef.current, onStop, dispatch, winnerSavedRef);
  }, [races, onStop, dispatch]);

  useEffect(() => {
    handleRaceStart();
    handleRaceUpdates();
    previousRacesRef.current = { ...races };
  }, [handleRaceStart, handleRaceUpdates, races]);

  return (
    <ul className={styles.carList}>
      {cars.map((car) => (
        <CarItem
          key={car.id}
          car={car}
          races={races}
          onDelete={onDelete}
          onEdit={onEdit}
          onStart={onStart}
          onStop={onStop}
        />
      ))}
    </ul>
  );
}
