import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import fetchWinners from '../api/winners';
import { setSort, setCurrentPage } from '../store/winnerSlice';
import { getCars } from '../api/cars';
import { CARS_PER_PAGE } from '../constants';

type SortColumn = 'id' | 'wins' | 'time';

export default function useWinnersData() {
  const dispatch = useDispatch<AppDispatch>();
  const { winners, currentPage, totalCount, sortBy, sortOrder } = useSelector(
    (state: RootState) => state.winner,
  );
  const allCars = useSelector((state: RootState) => state.car.cars);

  const totalPages = Math.ceil(totalCount / CARS_PER_PAGE);

  useEffect(() => {
    dispatch(getCars());
    fetchWinners(dispatch, currentPage, CARS_PER_PAGE, sortBy, sortOrder);
  }, [currentPage, sortBy, sortOrder, dispatch]);

  const handleSort = (column: SortColumn) => {
    const order = sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    dispatch(setSort({ sortBy: column, sortOrder: order }));
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return {
    winners,
    allCars,
    currentPage,
    totalPages,
    sortBy,
    sortOrder,
    handleSort,
    changePage,
  };
}