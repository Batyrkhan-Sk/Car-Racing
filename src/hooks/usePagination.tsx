import { useMemo, useState, useEffect, useCallback } from 'react';

export default function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    if (!items || items.length === 0) {
      return { currentItems: [], totalPages: 0 };
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return { currentItems, totalPages };
  }, [items, currentPage, itemsPerPage]);

  useEffect(() => {
    const { totalPages } = paginationData;
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [items?.length, currentPage, paginationData]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  return {
    currentPage,
    totalPages: paginationData.totalPages,
    currentItems: paginationData.currentItems,
    handlePageChange,
    setCurrentPage,
  };
}
