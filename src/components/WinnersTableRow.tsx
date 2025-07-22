import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Car } from '../types/carTypes';
import styles from '../styles/Winners.module.css';

interface WinnersTableRowProps {
  winner: {
    id: number;
    wins: number;
    time: number;
  };
  car?: Car;
}

export default function WinnersTableRow({ winner, car }: WinnersTableRowProps) {
  return (
    <tr>
      <td>{winner.id}</td>
      <td>
        <div
          className={styles.carIcon}
          style={{ color: car?.color || '#000000' }}
          title={car?.name || 'Unknown'}
        >
          <FontAwesomeIcon icon={faCarSide} />
        </div>
      </td>
      <td>{car?.name || 'Unknown'}</td>
      <td>{winner.wins}</td>
      <td>{winner.time.toFixed(2)}</td>
    </tr>
  );
}