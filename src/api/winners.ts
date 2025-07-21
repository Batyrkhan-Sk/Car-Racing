import { Dispatch } from '@reduxjs/toolkit';
import { Winner } from '../types/winnerTypes';
import { setWinners, setTotalCount, setCurrentPage, setSort } from '../store/winnerSlice';
import BASE_URL from './constants';

const fetchWinners = async (
  dispatch: Dispatch,
  page = 1,
  limit = 10,
  sortBy: 'id' | 'wins' | 'time' = 'id',
  sortOrder: 'ASC' | 'DESC' = 'ASC',
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${sortOrder}`
    );

    const data: Winner[] = await response.json();
    const totalCount = Number(response.headers.get('X-Total-Count'));

    dispatch(setWinners(data));
    dispatch(setTotalCount(totalCount));
    dispatch(setCurrentPage(page));
    dispatch(setSort({ sortBy, sortOrder }));
  } catch (error) {
    console.error('Error fetching winners:', error);
  }
};

export default fetchWinners;
