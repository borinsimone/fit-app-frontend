import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea il contesto
const GlobalContext = createContext();

// Crea un provider per il contesto
export const GlobalProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        workouts,
        setWorkouts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);
