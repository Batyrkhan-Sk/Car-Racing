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
  return (
    <div>
      <input
        type="text"
        placeholder="Car Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      {editId ? (
        <button type="button" onClick={handleUpdate}>
          Update Car
        </button>
      ) : (
        <button type="button" onClick={handleCreate}>
          Create Car
        </button>
      )}
    </div>
  );
}
