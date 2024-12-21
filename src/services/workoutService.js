import axios from 'axios';

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
    } else {
      throw new Error('Failed to fetch workouts');
    }
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
};

export const addWorkouts = async (workoutData) => {
  try {
    console.log('Preparazione invio dati workout:', workoutData); // Log dei dati in ingresso

    const token = localStorage.getItem('token'); // Ottieni il token dalla memoria locale
    console.log('Token recuperato dal localStorage:', token); // Log del token

    const response = await axios.post(`${API_URL}/workouts`, workoutData, {
      headers: {
        Authorization: `Bearer ${token}`, // Aggiunge il token all'header Authorization
      },
    });

    console.log('Workout aggiunto con successo:', response.data); // Log della risposta del server
    return response.data; // Restituisce i dati della risposta
  } catch (error) {
    // Log degli errori
    if (error.response) {
      console.error('Errore dal server:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('Nessuna risposta ricevuta dal server:', error.request); // Log della richiesta nel caso in cui il server non risponda
    } else {
      console.error(
        'Errore durante la configurazione della richiesta:',
        error.message
      );
    }
    throw error; // Rilancia l'errore per gestirlo eventualmente più in alto
  } finally {
    console.log('Operazione di aggiunta workout completata.'); // Indica che la funzione ha terminato
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
