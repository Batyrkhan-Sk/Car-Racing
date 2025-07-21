import BASE_URL from './constants';

const saveWinner = async (id: number, time: number): Promise<boolean> => {
  try {
    if (Number.isNaN(time) || time <= 0) {
      throw new Error('Invalid time value');
    }
    const response = await fetch(`${BASE_URL}/winners/${id}`);
    if (response.status === 404) {
      const postResponse = await fetch(`${BASE_URL}/winners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, wins: 1, time }),
      });
      if (!postResponse.ok) {
        throw new Error(
          `Failed to create winner: ${postResponse.status} ${postResponse.statusText}`,
        );
      }
    } else if (response.ok) {
      const existingWinner = await response.json();
      const updatedWins = existingWinner.wins + 1;
      const bestTime = Math.min(existingWinner.time, time);
      const putResponse = await fetch(`${BASE_URL}/winners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, wins: updatedWins, time: bestTime }),
      });
      if (!putResponse.ok) {
        throw new Error(`Failed to update winner: ${putResponse.status} ${putResponse.statusText}`);
      }
    } else {
      throw new Error(`Unexpected status code: ${response.status} ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(`Error saving winner for car ${id}:`, error);
    return false;
  }
};

export default saveWinner;
