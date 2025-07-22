import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/CarList.module.css';
import { Car } from '../types/carTypes';
import { RaceStatus } from '../types/raceTypes';

interface CarItemProps {
  car: Car;
  races: Record<string, RaceStatus>;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, color: string) => void;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
}

const isCarMoving = (races: Record<string, RaceStatus>, carId: number): boolean => {
  const race = races[carId.toString()];
  return Boolean(race && (race.status === 'started' || race.status === 'driving'));
};

export default function CarItem({ car, races, onDelete, onEdit, onStart, onStop }: CarItemProps) {
  const isMoving = isCarMoving(races, car.id);

  return (
    <li className={styles.carItem}>
      <div className={styles.carHeader}>
        <span className={styles.carName}>
          #{car.id} - {car.name}
        </span>
      </div>
      <div className={styles.raceTrack}>
        <div id={`car-${car.id}`} className={styles.carBox} style={{ color: car.color }}>
          <FontAwesomeIcon icon={faCarSide} />
        </div>
      </div>
      <div className={styles.carControls}>
        <button type="button" onClick={() => onDelete(car.id)} disabled={isMoving}>
          Remove
        </button>
        <button
          type="button"
          onClick={() => onEdit(car.id, car.name, car.color)}
          disabled={isMoving}
        >
          Select
        </button>
        <button type="button" onClick={() => onStart(car.id)} disabled={isMoving}>
          A
        </button>
        <button type="button" onClick={() => onStop(car.id)} disabled={!isMoving}>
          B
        </button>
      </div>
    </li>
  );
}
