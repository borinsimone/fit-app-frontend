import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      console.log('Logged in:', response);

      console.log('response ok');

      localStorage.setItem('token', response.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
