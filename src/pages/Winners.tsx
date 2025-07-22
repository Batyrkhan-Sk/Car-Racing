/* eslint-disable max-lines-per-function */
import { Car } from '../types/carTypes';
import styles from '../styles/Winners.module.css';
import Navigation from '../components/Navigation';
import Pagination from '../components/Pagination';
import SortableHeader from '../components/SortableHeader';
import WinnersTableRow from '../components/WinnersTableRow';
import useWinnersData from '../hooks/useWinnersData';

export default function Winners() {
  const { winners, allCars, currentPage, totalPages, sortBy, sortOrder, handleSort, changePage } =
    useWinnersData();

  return (
    <div className={styles.container}>
      <Navigation />
      <h2>Winners</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <SortableHeader
              column="id"
              label="ID"
              currentSort={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <th>Car</th>
            <th>Name</th>
            <SortableHeader
              column="wins"
              label="Wins"
              currentSort={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <SortableHeader
              column="time"
              label="Best Time (s)"
              currentSort={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {winners.map((winner) => {
            const car = allCars.find((c: Car) => c.id === winner.id);
            return <WinnersTableRow key={winner.id} winner={winner} car={car} />;
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
        className={styles.pagination}
      />
    </div>
  );
}
