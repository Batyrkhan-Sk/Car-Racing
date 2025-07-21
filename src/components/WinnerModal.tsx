import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Car } from '../types/carTypes';

export default function WinnerModal() {
  const currentWinner = useSelector((state: RootState) => state.winner.currentWinner);
  const allCars = useSelector((state: RootState) => state.car.cars);
  const winnerCar = allCars.find((car: Car) => car.id === currentWinner?.id);

  if (!currentWinner || !winnerCar) return null;

  return (
    <div className="modal-window">
      <h2>Race Finished!</h2>
      <p>Winner: {winnerCar.name}</p>
      <p>Time: {currentWinner.time} s</p>
    </div>
  );
}
