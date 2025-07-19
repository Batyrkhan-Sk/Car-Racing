import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar, createCar, updateCar } from '../api/cars';
import { AppDispatch, RootState } from '../store/store';
import CarForm from '../components/CarForm';
import CarList from '../components/CarList';
import { startCarEngine, stopCarEngine } from '../api/engine';
import useCarForm from '../hooks/useCarForm';

// eslint-disable-next-line max-lines-per-function
export default function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.car.cars);

  const { name, color, editId, setName, setColor, setEditId, resetForm } = useCarForm();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (id: number) => dispatch(deleteCar(id));

  const handleCreate = () => {
    if (name && color) {
      dispatch(createCar(name, color));
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
      dispatch(updateCar(editId, name, color));
      resetForm();
      setEditId(null);
    }
  };

  const handleStartEngine = (id: number) => {
    startCarEngine(id).catch((error) => {
      console.error(`Failed to start engine for car ${id}:`, error);
    });
  };

  const handleStopEngine = (id: number) => {
    stopCarEngine(id).catch((error) => {
      console.error(`Failed to stop engine for car ${id}:`, error);
    });
  };

  return (
    <div>
      <h1>Garage</h1>
      <CarForm
        name={name}
        color={color}
        setName={setName}
        setColor={setColor}
        editId={editId}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
      <CarList
        cars={cars}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStart={handleStartEngine}
        onStop={handleStopEngine}
      />
    </div>
  );
}
