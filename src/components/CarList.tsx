import { Car } from '../types/carTypes';

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, color: string) => void;
}

export default function CarList({ cars, onDelete, onEdit }: CarListProps) {
  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>
          {car.name} - {car.color}
          <button type="button" onClick={() => onDelete(car.id)}>
            Delete
          </button>
          <button type="button" onClick={() => onEdit(car.id, car.name, car.color)}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}
