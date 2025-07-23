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
      <h2>Winners ({winners.length} winners)</h2>

      <table className={styles.table} role="table" aria-label="Race winners">
        <thead>
          <tr role="row">
            <SortableHeader
              column="id"
              label="ID"
              currentSort={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            <th scope="col">Car</th>
            <th scope="col">Name</th>
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
          {winners.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.emptyState}>
                No winners yet
              </td>
            </tr>
          ) : (
            winners.map((winner) => {
              const car = allCars.find((c: Car) => c.id === winner.id);
              if (!car) {
                console.warn(`Car with ID ${winner.id} not found`);
                return null;
              }
              return <WinnersTableRow key={winner.id} winner={winner} car={car} />;
            })
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
          className={styles.pagination}
        />
      )}
    </div>
  );
}
