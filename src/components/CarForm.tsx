/* eslint-disable max-lines-per-function */
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
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '10px 0' }}>
      <input
        type="text"
        placeholder="Car Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: '30px', height: '30px', padding: '0', border: 'none', cursor: 'pointer' }}
      />
      {editId ? (
        <button
          type="button"
          onClick={handleUpdate}
          style={{
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Update
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCreate}
          style={{
            padding: '5px 10px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Create
        </button>
      )}
    </div>
  );
}
