/* eslint-disable max-lines-per-function */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationProps } from '../types/paginationTypes';
import styles from '../styles/Pagination.module.css';
import { PAGINATION_MAX_VISIBLE } from '../constants';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const halfVisible = Math.floor(PAGINATION_MAX_VISIBLE / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + PAGINATION_MAX_VISIBLE - 1);

    if (endPage - startPage + 1 < PAGINATION_MAX_VISIBLE) {
      startPage = Math.max(1, endPage - PAGINATION_MAX_VISIBLE + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`${styles.pagination} ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles['pagination-btn']} ${styles['pagination-prev']}`}
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className={styles['pagination-btn']}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className={styles['pagination-ellipsis']}>...</span>}
        </>
      )}

      {visiblePages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
          className={`${styles['pagination-btn']} ${pageNumber === currentPage ? styles.active : ''}`}
        >
          {pageNumber}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={styles['pagination-ellipsis']}>...</span>
          )}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className={styles['pagination-btn']}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles['pagination-btn']} ${styles['pagination-next']}`}
        aria-label="Next page"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
