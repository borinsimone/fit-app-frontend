import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const getWorkouts = async (token) => {
  try {
    console.log('Fetching workouts with token:', token); // Debug log

    const response = await axios.get(`${API_URL}/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response data:', response.data); // Debug log

    return response.data;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return null;
  }
};

export const addWorkouts = async (workoutData) => {
  try {
    console.log('Preparing to send workout data:', workoutData); // Debug log

    const token = localStorage.getItem('token'); // Get the token from local storage
    console.log('Token retrieved from localStorage:', token); // Debug log

    const response = await axios.post(`${API_URL}/workouts`, workoutData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response data:', response.data); // Debug log

    return response.data;
  } catch (error) {
    console.error('Error adding workout:', error);
    return null;
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
