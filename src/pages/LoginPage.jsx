import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { login } from '../services/authService';

const LoginPage = () => {
  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      console.log('Logged in:', user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
