import BASE_URL from './constants';
import { EngineResponse } from '../types/engineTypes';

export const startCarEngine = async (id: number): Promise<EngineResponse> => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to start engine');
  }

  return response.json();
};

export const stopCarEngine = async (id: number): Promise<EngineResponse> => {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to stop engine');
  }

  return response.json();
};
