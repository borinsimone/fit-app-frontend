const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const getWorkouts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();

      console.log(data);
      return data;

      //   return await response.json();
      //   const data = await response.json();

      return data;
    } else {
      throw new Error('Failed to fetch workouts');
    }
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};

export const addWorkouts = async (workoutData, token) => {
  try {
    const response = await fetch(`${API_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    });
    if (!response.ok) {
      throw new Error('Failed to add workout');
    }
  } catch (error) {
    console.error('Error adding workout:', error);
    throw error;
  }
};

export const deleteWorkout = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete workout');
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};
export const updateWorkout = async (id, token, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update workout');
    }
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};
