import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalProvider, useGlobalContext } from './context/GlobalContext';
import BottomBar from './components/Dashboard/BottomBar';
import { jwtDecode } from 'jwt-decode';
import { getWorkouts } from './services/workoutService';
import WorkoutForm from './components/WorkoutForm';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/UI/Loading';

const AppContent = () => {
  const {
    workouts,
    setWorkouts,
    user,
    setUser,
    workoutFormOpen,
    loading,
    setLoading,
  } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const hiddenRoutes = ['/login', '/register', '/assistant'];
  const showBottomBar = !hiddenRoutes.includes(location.pathname);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchWorkouts = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      console.log('start fetching');

      const workoutsData = await getWorkouts(token);
      console.log('workoutsData:', workoutsData);
      if (!workoutsData) {
        console.log('No workouts data');
        navigate('/login');
      }
      setWorkouts(workoutsData);
    };

    fetchWorkouts();
    try {
      const decodedToken = jwtDecode(token); // Decodifica il token
      setUser(decodedToken); // Salva i dati nel state
    } catch (error) {
      console.error('Errore nella decodifica del token', error);
    }
  }, []);
  return (
    <AnimatePresence mode='wait'>
      {loading && <Loading />}
      <AppRoutes />
      {showBottomBar && <BottomBar />}
      {workoutFormOpen && <WorkoutForm />}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default App;
