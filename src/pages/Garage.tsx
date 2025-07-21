/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar, createCar, updateCar } from '../api/cars';
import { AppDispatch, RootState } from '../store/store';
import CarForm from '../components/CarForm';
import CarList from '../components/CarList';
import Navigation from '../components/Navigation';
import RaceControls from '../components/RaceControls';
import { startCarEngine, stopCarEngine } from '../api/engine';
import { startRace, stopRace } from '../store/raceSlice';
import useCarForm from '../hooks/useCarForm';
import WinnerModal from '../components/WinnerModal';
import generateRandomCars from '../utils/random';

export default function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.car.cars);
  const { name, color, editId, setName, setColor, setEditId, resetForm } = useCarForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const carsPerPage = 10;

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (id: number) => dispatch(deleteCar(id));

  const handleCreate = () => {
    if (name && color) {
      dispatch(createCar(name, color)).then(() => dispatch(getCars()));
      resetForm();
    }
  };

  const handleEdit = (id: number, newName: string, newColor: string) => {
    setEditId(id);
    setName(newName);
    setColor(newColor);
  };

  const handleUpdate = () => {
    if (editId !== null && name && color) {
      dispatch(updateCar(editId, name, color)).then(() => dispatch(getCars()));
      resetForm();
      setEditId(null);
    }
  };

  const handleStartEngine = (id: number) => {
    startCarEngine(id)
      .then(({ velocity, distance }) => {
        dispatch(startRace({ id: id.toString(), velocity, distance }));
      })
      .catch(console.error);
  };

  const handleStopEngine = (id: number) => {
    stopCarEngine(id)
      .then(() => dispatch(stopRace(id.toString())))
      .catch(console.error);
  };

  const handleGenerateCars = async () => {
    setIsGenerating(true);
    const randomCars = generateRandomCars(100);
    await Promise.all(randomCars.map((car) => dispatch(createCar(car.name, car.color))));
    await dispatch(getCars());
    setCurrentPage(1);
    setIsGenerating(false);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Garage</h1>
      <Navigation />
      <RaceControls currentCars={currentCars} />
      <WinnerModal />
      <CarForm {...{ name, color, setName, setColor, editId, handleCreate, handleUpdate }} />
      <button type="button" onClick={handleGenerateCars} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate 100 Cars'}
      </button>
      <CarList
        cars={currentCars}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStart={handleStartEngine}
        onStop={handleStopEngine}
      />
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            type="button"
            key={number}
            onClick={() => paginate(number)}
            disabled={number === currentPage}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
