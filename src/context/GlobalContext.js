import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea il contesto
const GlobalContext = createContext();

// Crea un provider per il contesto
export const GlobalProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const updateWorkouts = async () => {
    console.log('updating');

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5001/workouts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('updated');

        setWorkouts(data);
      } else {
        // history.push('/login');
        console.log('update failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const addWorkout = async (newWorkout) => {
    setLoading(true);
    // e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Ottieni il token dalla memoria locale
      const response = await axios.post(
        'http://localhost:5001/workouts',
        newWorkout,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aggiunge il token all'header Authorization
          },
        }
      );
      updateWorkouts();
    } catch (error) {
      console.log('Failed to update');
    } finally {
      setLoading(false);
    }
  };
  const deleteWorkout = async (workoutId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    console.log(workoutId);

    try {
      const response = axios.delete(
        `http://localhost:5001/workouts/${workoutId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response;

      console.log(data);
      if (data) {
        updateWorkouts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const editWorkout = async (id, updatedWorkout) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5001/workouts/${id}`, updatedWorkout, {
        headers: {
          Authorization: `Bearer ${token}`, // Aggiunge il token all'header Authorization
        },
      });
    } catch (error) {
      console.error("Errore durante l'aggiornamento:", error);
      throw error;
    }
  };

  // Workout assistant
  const [workoutAssistantPage, setWorkoutAssistantPage] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        workouts,
        setWorkouts,
        loading,
        setLoading,
        user,
        setUser,
        // loadWorkouts,
        updateWorkouts,
        deleteWorkout,
        addWorkout,
        editWorkout,
        currentWorkout,
        setCurrentWorkout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);
