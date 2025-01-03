import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdTune } from 'react-icons/md';
import Calendar from '../components/Agenda/Calendar';
import WorkoutPreview from '../components/Agenda/WorkoutPreview';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { deleteWorkout, getWorkouts } from '../services/workoutService';
import { motion } from 'framer-motion';
import NewCalendar from '../components/Agenda/NewCalendar';

function AgendaPage() {
  const { setUser, workouts, setWorkouts } = useGlobalContext();
  const [dateSelected, setDateSelected] = useState(new Date());
  const [dateWorkout, setDateWorkout] = useState(null);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
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
  //   try {
  //     const decodedToken = jwtDecode(token); // Decodifica il token
  //     setUser(decodedToken); // Salva i dati nel state
  //   } catch (error) {
  //     console.error('Errore nella decodifica del token', error);
  //   }
  // }, [navigate]);

  const [calendarExpanded, setCalendarExpanded] = useState(true);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [localWorkouts, setLocalWorkouts] = useState([]);

  // Effettua il caricamento iniziale
  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const token = localStorage.getItem('token');
        const data = await getWorkouts(token);
        setWorkouts(data); // Aggiorna il contesto globale
        setLocalWorkouts(data); // Aggiorna lo stato locale
      } catch (error) {
        console.error('Errore nel caricamento degli allenamenti:', error);
        alert('Impossibile caricare gli allenamenti. Riprova più tardi.');
      }
    }
    fetchWorkouts();
  }, [getWorkouts, setWorkouts]);

  // Sincronizza stato locale con stato globale
  useEffect(() => {
    setLocalWorkouts(workouts);
  }, [workouts]);

  // Callback per aggiornare allenamenti dinamicamente
  const handleWorkoutUpdate = async (updatedWorkout) => {
    try {
      const updatedList = workouts.map((workout) =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout
      );
      setWorkouts(updatedList); // Aggiorna il contesto globale
      setLocalWorkouts(updatedList); // Aggiorna lo stato locale
      alert('Allenamento aggiornato con successo!');
    } catch (error) {
      console.error("Errore nell'aggiornamento dell'allenamento:", error);
      alert("Impossibile aggiornare l'allenamento. Riprova più tardi.");
    }
  };

  const handleWorkoutDelete = async (workoutId) => {
    try {
      const token = localStorage.getItem('token');
      await deleteWorkout(workoutId, token);
      const updatedList = workouts.filter(
        (workout) => workout.id !== workoutId
      );
      setWorkouts(updatedList); // Aggiorna il contesto globale
      setLocalWorkouts(updatedList); // Aggiorna lo stato locale
      alert('Allenamento eliminato con successo!');
    } catch (error) {
      console.error("Errore nell'eliminazione dell'allenamento:", error);
      alert("Impossibile eliminare l'allenamento. Riprova più tardi.");
    }
  };
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
    >
      <NewCalendar
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        dateWorkout={dateWorkout}
        setDateWorkout={setDateWorkout}
        workouts={localWorkouts}
      />

      <WorkoutPreview
        workout={dateWorkout}
        date={dateSelected}
        //test
        workouts={localWorkouts}
        onWorkoutUpdate={handleWorkoutUpdate}
        onWorkoutDelete={handleWorkoutDelete}
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
