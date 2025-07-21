/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable max-lines-per-function */
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/CarList.module.css';
import { Car } from '../types/carTypes';
import { RootState } from '../store/store';
import { addFinisher } from '../store/winnerSlice';
import saveWinner from '../api/saveWinner';

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, color: string) => void;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
}

interface Race {
  status: 'started' | 'driving' | 'stopped' | 'broken';
  distance: number;
  velocity: number;
}

const isCarMoving = (races: Record<string, Race>, carId: number) => {
  const race = races[carId.toString()];
  return race && (race.status === 'started' || race.status === 'driving');
};

export default function CarList({ cars, onDelete, onEdit, onStart, onStop }: CarListProps) {
  const races = useSelector((state: RootState) => state.race.races);
  const dispatch = useDispatch();
  const previousRacesRef = useRef<Record<string, Race>>({});
  const winnerSavedRef = useRef(false);

  useEffect(() => {
    const previousRaces = previousRacesRef.current;

    const raceJustStarted = Object.values(races).some(
      (r, i) =>
        r.status === 'started' && previousRaces[Object.keys(races)[i]]?.status !== 'started',
    );
    if (raceJustStarted) {
      winnerSavedRef.current = false;
    }

    Object.entries(races).forEach(([carId, race]) => {
      const carElement = document.getElementById(`car-${carId}`);
      if (!carElement) return;

      const track = carElement.parentElement;
      if (!track) return;

      const trackWidth = track.offsetWidth;
      const carWidth = carElement.offsetWidth;
      const maxDistance = trackWidth - carWidth;
      const effectiveDistance = Math.min(race.distance, maxDistance);
      const time = effectiveDistance / race.velocity;

      if (!previousRaces[carId] || previousRaces[carId].status !== race.status) {
        switch (race.status) {
          case 'started':
          case 'driving':
            carElement.style.transition = `transform ${time}s linear`;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            carElement.offsetWidth;
            carElement.style.transform = `translateX(${effectiveDistance}px) translateY(-50%)`;
            carElement.addEventListener(
              'transitionend',
              () => {
                const id = parseInt(carId, 10);
                const formattedTime = Number(time.toFixed(2));
                onStop(id);
                dispatch(addFinisher({ id, time: formattedTime }));
                if (!winnerSavedRef.current) {
                  saveWinner(id, formattedTime);
                  winnerSavedRef.current = true;
                }
              },
              { once: true },
            );
            break;
          case 'stopped':
            carElement.style.transition = 'none';
            carElement.style.transform = 'translateX(0) translateY(-50%)';
            break;
          case 'broken':
            carElement.style.transition = 'none';
            console.log(`Car ${carId} broke down`);
            break;
          default:
            console.error(`Unexpected race status: ${race.status}`);
            break;
        }
      }
    });

    previousRacesRef.current = { ...races };
  }, [races, cars, onStop, dispatch]);

  const renderCarItem = ({ id, name, color }: Car) => {
    const isMoving = isCarMoving(races, id);

    return (
      <li key={id} className={styles.carItem}>
        <div className={styles.carHeader}>
          <span className={styles.carName}>
            #{id} - {name}
          </span>
        </div>
        <div className={styles.raceTrack}>
          <div id={`car-${id}`} className={styles.carBox} style={{ color }}>
            <FontAwesomeIcon icon={faCarSide} />
          </div>
        </div>
        <div className={styles.carControls}>
          <button type="button" onClick={() => onDelete(id)} disabled={isMoving}>
            Remove
          </button>
          <button type="button" onClick={() => onEdit(id, name, color)} disabled={isMoving}>
            Select
          </button>
          <button type="button" onClick={() => onStart(id)} disabled={isMoving}>
            A
          </button>
          <button type="button" onClick={() => onStop(id)} disabled={!isMoving}>
            B
          </button>
        </div>
      </li>
    );
  };

  return <ul className={styles.carList}>{cars.map(renderCarItem)}</ul>;
}
