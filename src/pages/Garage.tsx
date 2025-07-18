import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar, createCar, updateCar } from '../api/cars';
import { AppDispatch, RootState } from '../store/store';
import CarForm from '../components/CarForm';
import CarList from '../components/CarList';

// eslint-disable-next-line max-lines-per-function
export default function Garage() {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.car.cars);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (id: number) => dispatch(deleteCar(id));
  const handleCreate = () => {
    if (name && color) {
      dispatch(createCar(name, color));
      setName('');
      setColor('#000000');
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
      setEditId(null);
      setName('');
      setColor('#000000');
    }
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
      <CarList cars={cars} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
