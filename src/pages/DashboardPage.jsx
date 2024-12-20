import React, { useEffect, useState } from 'react';
import { getWorkouts } from '../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import Navbar from '../components/Dashboard/Navbar';
import { jwtDecode } from 'jwt-decode';
import WidgetContainer from '../components/Dashboard/WidgetContainer';

function DashboardPage() {
  const { workouts, setWorkouts, user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  // Fetch workouts on component mount and update workouts on token change or login/logout
  useEffect(() => {
    const token = localStorage.getItem('token');
    //   const fetchWorkouts = async () => {
    //     if (!token) {
    //       navigate('/login');
    //       return;
    //     }
    //     console.log('start fetching');

    //     const workoutsData = await getWorkouts(token);
    //     setWorkouts(workoutsData);
    //   };

    //   fetchWorkouts();
    try {
      const decodedToken = jwtDecode(token); // Decodifica il token
      setUser(decodedToken); // Salva i dati nel state
    } catch (error) {
      console.error('Errore nella decodifica del token', error);
    }
  }, [navigate]);
  return (
    <Container>
      <Navbar />
      <button
        onClick={() => {
          getWorkouts();
        }}
      >
        getworkouts
      </button>
      <WidgetContainer />
    </Container>
  );
}

export default DashboardPage;
const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
