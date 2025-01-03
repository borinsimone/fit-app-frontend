import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const { user, setUser, setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await login(credentials);
      console.log('Logged in:', response);

      localStorage.setItem('token', response.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
