import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('token'); // Controlla se c'è un token

  return (
    <Routes>
      <Route
        path='/'
        element={
          isAuthenticated ? (
            <Navigate to='/dashboard' />
          ) : (
            <Navigate to='/login' />
          )
        }
      />
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegisterPage />}
      />
      <Route
        path='/dashboard'
        element={isAuthenticated ? <DashboardPage /> : <Navigate to='/login' />}
      />
    </Routes>
  );
};

export default AppRoutes;
