import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Winners.module.css';
import { SortableHeaderProps } from '../types/sortableHeaderTypes';

export default function SortableHeader({
  column,
  label,
  currentSort,
  sortOrder,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentSort === column;

  return (
    <th onClick={() => onSort(column)} className={styles.sortableHeader}>
      <span>{label}</span>
      {isActive && (
        <span className={styles.sortIcon}>
          <FontAwesomeIcon icon={sortOrder === 'ASC' ? faChevronUp : faChevronDown} />
        </span>
      )}
    </th>
  );
}
