import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import AgendaPage from '../pages/AgendaPage';
import WorkoutAssistantPage from '../pages/WorkoutAssistantPage';
import { AnimatePresence } from 'framer-motion';

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('token'); // Controlla se c'è un token

  return (
    <AnimatePresence mode='wait'>
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
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/agenda'
          element={isAuthenticated ? <AgendaPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/assistant'
          element={
            isAuthenticated ? (
              <WorkoutAssistantPage />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
