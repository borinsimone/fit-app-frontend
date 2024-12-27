import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdTune } from 'react-icons/md';
import Calendar from '../components/Agenda/Calendar';
import WorkoutPreview from '../components/Agenda/WorkoutPreview';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getWorkouts } from '../services/workoutService';
import { motion } from 'framer-motion';

function AgendaPage() {
  const { setUser, setWorkouts } = useGlobalContext();
  const [dateSelected, setDateSelected] = useState(null);
  const [dateWorkout, setDateWorkout] = useState(null);

  const navigate = useNavigate();

  // Fetch workouts on component mount and update workouts on token change or login/logout
  const token = localStorage.getItem('token');
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
  }, [navigate]);

  const [calendarExpanded, setCalendarExpanded] = useState(true);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Calendar
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        dateWorkout={dateWorkout}
        setDateWorkout={setDateWorkout}
        calendarExpanded={calendarExpanded}
        setCalendarExpanded={setCalendarExpanded}
        previewExpanded={previewExpanded}
        setPreviewExpanded={setPreviewExpanded}
      />

      <WorkoutPreview
        workout={dateWorkout}
        date={dateSelected}
        calendarExpanded={calendarExpanded}
        setCalendarExpanded={setCalendarExpanded}
        previewExpanded={previewExpanded}
        setPreviewExpanded={setPreviewExpanded}
      />
    </Container>
  );
}

export default AgendaPage;
const Container = styled.div`
  height: 93vh;
  height: 93dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
