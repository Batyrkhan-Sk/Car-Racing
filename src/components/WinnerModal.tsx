/* eslint-disable max-lines-per-function */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Car } from '../types/carTypes';
import { setCurrentWinner } from '../store/winnerSlice';
import styles from '../styles/WinnerModal.module.css';

export default function WinnerModal() {
  const dispatch = useDispatch();
  const currentWinner = useSelector((state: RootState) => state.winner.currentWinner);
  const allCars = useSelector((state: RootState) => state.car.cars);
  const winnerCar = allCars.find((car: Car) => car.id === currentWinner?.id);

  useEffect(() => {
    if (currentWinner && winnerCar) {
      const timer = setTimeout(() => {
        dispatch(setCurrentWinner(null));
        // eslint-disable-next-line no-magic-numbers
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentWinner, winnerCar, dispatch]);

  if (!currentWinner || !winnerCar) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(setCurrentWinner(null));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(setCurrentWinner(null));
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.modalWindow}>
        <h2 className={styles.modalTitle}>Race Finished!</h2>
        <div className={styles.winnerInfo}>
          <div className={styles.winnerName}>Winner: {winnerCar.name}</div>
          <div className={styles.winnerTime}>Time: {currentWinner.time}s</div>
        </div>
      </div>
    </div>
  );
}
