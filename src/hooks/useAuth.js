import { useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // Logica di login con API
    setUser({ email: credentials.email });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
