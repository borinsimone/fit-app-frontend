import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea il contesto
const GlobalContext = createContext();

// Crea un provider per il contesto
export const GlobalProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState();

  const [workoutDateBuffer, setWorkoutDateBuffer] = useState();
  const [workoutFormOpen, setWorkoutFormOpen] = useState(false);

  //workout assistant states
  const [selectedWorkout, setSelectedWorkout] = useState(() => {
    const savedWorkout = localStorage.getItem('selectedWorkout');
    return savedWorkout ? JSON.parse(savedWorkout) : null;
  });

  useEffect(() => {
    localStorage.setItem('selectedWorkout', JSON.stringify(selectedWorkout));
  }, [selectedWorkout]);
  useEffect(() => {
    console.log(selectedWorkout);
  }, [selectedWorkout]);
  return (
    <GlobalContext.Provider
      value={{
        workouts,
        setWorkouts,
        user,
        setUser,
        workoutDateBuffer,
        setWorkoutDateBuffer,
        workoutFormOpen,
        setWorkoutFormOpen,
        selectedWorkout,
        setSelectedWorkout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);
