/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar, createCar, updateCar } from '../api/cars';
import { startCarEngine, stopCarEngine } from '../api/engine';
import { AppDispatch, RootState } from '../store/store';
import { startRace, stopRace, resetRaces } from '../store/raceSlice';
import useCarForm from '../hooks/useCarForm';
import GenerateCars from '../components/GenerateCars';

import CarForm from '../components/CarForm';
import CarList from '../components/CarList';
import Navigation from '../components/Navigation';
import RaceControls from '../components/RaceControls';
import WinnerModal from '../components/WinnerModal';
import Pagination from '../components/Pagination';
import styles from '../styles/Garage.module.css';

const CARS_PER_PAGE = 10;

export default function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.car.cars);
  const { name, color, editId, setName, setColor, setEditId, resetForm } = useCarForm();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset race state when component mounts
  useEffect(() => {
    dispatch(resetRaces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const paginationData = useMemo(() => {
    const indexOfLastCar = currentPage * CARS_PER_PAGE;
    const indexOfFirstCar = indexOfLastCar - CARS_PER_PAGE;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

    return { currentCars, totalPages };
  }, [cars, currentPage]);

  useEffect(() => {
    const { totalPages } = paginationData;
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [cars.length, currentPage, paginationData]);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteCar(id));
    },
    [dispatch],
  );

  const handleCreate = useCallback(() => {
    if (name && color) {
      dispatch(createCar(name, color)).then(() => dispatch(getCars()));
      resetForm();
    }
  }, [name, color, dispatch, resetForm]);

  const handleEdit = useCallback(
    (id: number, newName: string, newColor: string) => {
      setEditId(id);
      setName(newName);
      setColor(newColor);
    },
    [setEditId, setName, setColor],
  );

  const handleUpdate = useCallback(() => {
    if (editId !== null && name && color) {
      dispatch(updateCar(editId, name, color)).then(() => dispatch(getCars()));
      resetForm();
      setEditId(null);
    }
  }, [editId, name, color, dispatch, resetForm, setEditId]);

  const handleStartEngine = useCallback(
    (id: number) => {
      startCarEngine(id)
        .then(({ velocity, distance }) => {
          dispatch(startRace({ id: id.toString(), velocity, distance }));
        })
        .catch((error) => {
          console.error('Failed to start engine:', error);
        });
    },
    [dispatch],
  );

  const handleStopEngine = useCallback(
    (id: number) => {
      stopCarEngine(id)
        .then(() => dispatch(stopRace(id.toString())))
        .catch((error) => {
          console.error('Failed to stop engine:', error);
        });
    },
    [dispatch],
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <div className={styles.garage}>
      <h1>Garage ({cars.length} cars)</h1>
      <Navigation />
      <RaceControls currentCars={paginationData.currentCars} />
      <WinnerModal />
      <CarForm
        name={name}
        color={color}
        setName={setName}
        setColor={setColor}
        editId={editId}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
      <GenerateCars onCarsGenerated={() => setCurrentPage(1)} />
      <CarList
        cars={paginationData.currentCars}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStart={handleStartEngine}
        onStop={handleStopEngine}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={paginationData.totalPages}
        onPageChange={handlePageChange}
        className="garage-pagination"
      />
    </div>
  );
}
