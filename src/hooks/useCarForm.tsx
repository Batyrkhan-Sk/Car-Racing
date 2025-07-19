import { useState } from 'react';

export default function useCarForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setName('');
    setColor('#000000');
  };

  return {
    name,
    color,
    editId,
    setName,
    setColor,
    setEditId,
    resetForm,
  };
}
