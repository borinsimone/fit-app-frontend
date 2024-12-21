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
import WorkoutForm from './assets/workout/WorkoutForm';

const AppContent = () => {
  const { workouts, setWorkouts, user, setUser, workoutFormOpen } =
    useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const hiddenRoutes = ['/login', '/register'];
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
    <>
      <AppRoutes />
      {showBottomBar && <BottomBar />}
      {workoutFormOpen && <WorkoutForm />}
    </>
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
