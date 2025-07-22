import { Car } from '../types/carTypes';
import { setCars } from '../store/carSlice';
import { AppDispatch } from '../store/store';
import { BASE_URL } from '../constants';
import { deleteWinner } from '../store/winnerSlice';

export const getCars = () => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/garage`);
    const data: Car[] = await res.json();
    dispatch(setCars(data));
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  }
};

export const deleteCar = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
    await fetch(`${BASE_URL}/winners/${id}`, { method: 'DELETE' });
    dispatch(getCars());
    dispatch(deleteWinner(id));
  } catch (error) {
    console.error('Failed to delete car or winner:', error);
  }
};

export const createCar = (name: string, color: string) => async (dispatch: AppDispatch) => {
  try {
    await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    dispatch(getCars());
  } catch (error) {
    console.error('Failed to create car:', error);
  }
};

export const updateCar =
  (id: number, name: string, color: string) => async (dispatch: AppDispatch) => {
    try {
      await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      dispatch(getCars());
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };
