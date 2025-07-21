/* eslint-disable max-lines-per-function */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState, AppDispatch } from '../store/store';
import { Car } from '../types/carTypes';
import fetchWinners from '../api/winners';
import { setSort, setCurrentPage } from '../store/winnerSlice';
import { getCars } from '../api/cars';
import styles from '../styles/Winners.module.css';

export default function Winners() {
  const dispatch = useDispatch<AppDispatch>();
  const { winners, currentPage, totalCount, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.winner,
  );
  const allCars = useSelector((state: RootState) => state.car.cars);

  const totalPages = Math.ceil(totalCount / 10);

  useEffect(() => {
    dispatch(getCars()); // Fetch cars to ensure allCars is populated
    fetchWinners(dispatch, currentPage, 10, sortBy, sortOrder);
  }, [currentPage, sortBy, sortOrder, dispatch]);

  const handleSort = (column: 'id' | 'wins' | 'time') => {
    const order = sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    dispatch(setSort({ sortBy: column, sortOrder: order }));
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className={styles.container}>
      <h2>Winners</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortBy === 'id' && (sortOrder === 'ASC' ? '↑' : '↓')}
            </th>
            <th>Car</th>
            <th>Name</th>
            <th onClick={() => handleSort('wins')}>
              Wins {sortBy === 'wins' && (sortOrder === 'ASC' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('time')}>
              Best Time (s) {sortBy === 'time' && (sortOrder === 'ASC' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => {
            const car = allCars.find((c: Car) => c.id === winner.id);
            return (
              <tr key={winner.id}>
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
          })}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
