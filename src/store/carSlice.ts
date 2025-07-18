import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../types/carTypes';

interface CarState {
  cars: Car[];
  selectedCar: Car | null;
}

const initialState: CarState = {
  cars: [],
  selectedCar: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCars(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
    },
    addCar(state, action: PayloadAction<Car>) {
      state.cars.push(action.payload);
    },
    updateCar(state, action: PayloadAction<Car>) {
      const index = state.cars.findIndex((car) => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
    },
    deleteCar(state, action: PayloadAction<number>) {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar } = carSlice.actions;
export default carSlice.reducer;
