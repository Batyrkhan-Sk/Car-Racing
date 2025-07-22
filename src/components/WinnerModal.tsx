/* eslint-disable max-lines-per-function */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Car } from '../types/carTypes';
import { setCurrentWinner } from '../store/winnerSlice';
import styles from '../styles/WinnerModal.module.css';
import {
  WINNER_MODAL_TIMEOUT,
  WINNER_MODAL_TITLE,
  WINNER_MODAL_WINNER_LABEL,
  WINNER_MODAL_TIME_LABEL,
} from '../constants';

export default function WinnerModal() {
  const dispatch = useDispatch();
  const currentWinner = useSelector((state: RootState) => state.winner.currentWinner);
  const allCars = useSelector((state: RootState) => state.car.cars);
  const winnerCar = allCars.find((car: Car) => car.id === currentWinner?.id);

  useEffect(() => {
    if (currentWinner && winnerCar) {
      const timer = setTimeout(() => {
        dispatch(setCurrentWinner(null));
      }, WINNER_MODAL_TIMEOUT);
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
        <h2 className={styles.modalTitle}>{WINNER_MODAL_TITLE}</h2>
        <div className={styles.winnerInfo}>
          <div className={styles.winnerName}>
            {WINNER_MODAL_WINNER_LABEL} {winnerCar.name}
          </div>
          <div className={styles.winnerTime}>
            {WINNER_MODAL_TIME_LABEL} {currentWinner.time}s
          </div>
        </div>
      </div>
    </div>
  );
}
