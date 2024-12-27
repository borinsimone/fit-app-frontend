import axios from 'axios';

const API_URL = 'https://fit-app-backend-babz.onrender.com';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

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

    return response;
  } catch (error) {
    console.error('Error adding workout:', error);
    return null;
  }
};

export const deleteWorkout = async (id, token) => {
  try {
    console.log('Preparing to delete workout with id:', id); // Debug log

    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Response status:', response.status); // Debug log

    if (!response.ok) {
      throw new Error('Failed to delete workout');
    } else {
      console.log('Workout deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
};
export const updateWorkout = async (id, token, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/workouts/${id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Workout updated successfully:', response.data); // Debug log

    return response.data;
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
};
