import styles from '../styles/CarForm.module.css';

interface CarFormProps {
  name: string;
  color: string;
  setName: (name: string) => void;
  setColor: (color: string) => void;
  editId: number | null;
  handleCreate: () => void;
  handleUpdate: () => void;
}

export default function CarForm({
  name,
  color,
  setName,
  setColor,
  editId,
  handleCreate,
  handleUpdate,
}: CarFormProps) {
  const isEditing = editId !== null;

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Car Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.textInput}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className={styles.colorInput}
      />

      <button
        type="button"
        onClick={isEditing ? handleUpdate : handleCreate}
        className={`${styles.button} ${isEditing ? styles.updateButton : styles.createButton}`}
      >
        {isEditing ? 'Update' : 'Create'}
      </button>
    </div>
  );
}
