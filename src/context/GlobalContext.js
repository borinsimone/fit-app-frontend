import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea il contesto
const GlobalContext = createContext();

// Crea un provider per il contesto
export const GlobalProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState();
  return (
    <GlobalContext.Provider
      value={{
        workouts,
        setWorkouts,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizzato per usare il contesto
export const useGlobalContext = () => useContext(GlobalContext);
