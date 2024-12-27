import React, { useEffect, useState } from 'react';
import { addWorkouts, getWorkouts } from '../services/workoutService';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import Navbar from '../components/Dashboard/Navbar';
import { jwtDecode } from 'jwt-decode';
import WidgetContainer from '../components/Dashboard/WidgetContainer';
import WorkoutForm from '../components/WorkoutForm';
import { motion } from 'framer-motion';

function DashboardPage() {
  const { workouts, setWorkouts, user, setUser, workoutFormOpen } =
    useGlobalContext();
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
  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      {/* {workoutFormOpen && <WorkoutForm />} */}

      {/* <button
        onClick={async () => {
          // console.log(workouts);
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 3);
          const workout = {
            name: 'Full Body Workout', // Nome dell'allenamento
            date: tomorrow, // Data dell'allenamento
            completed: false, // Se l'allenamento è stato completato o meno
            feedback: {
              feeling: 4, // Livello di soddisfazione (da 1 a 5)
              notes: 'Allenamento intenso, ma soddisfacente', // Feedback aggiuntivo
            },
            notes: 'Allenamento di riscaldamento + forza', // Note generali sull'allenamento
            sections: [
              // Sezione Riscaldamento con esercizi time-based
              {
                name: 'Riscaldamento', // Nome della sezione di riscaldamento
                exercises: [
                  {
                    name: 'Jumping Jacks', // Nome dell'esercizio
                    exerciseSets: [
                      {
                        reps: 0, // Non utilizzato perché time-based
                        weight: 0, // Non utilizzato per il riscaldamento
                        rest: 30, // Non necessario per gli esercizi time-based
                        time: 60, // Durata dell'esercizio in secondi
                      },
                      {
                        reps: 0, // Non utilizzato perché time-based
                        weight: 0, // Non utilizzato per il riscaldamento
                        rest: 30, // Non necessario per gli esercizi time-based
                        time: 60, // Durata dell'esercizio in secondi
                      },
                    ],
                    notes: 'Riscaldamento cardiovascolare', // Note per l'esercizio
                    timeBased: true, // Esercizio basato sul tempo
                  },
                  {
                    name: 'Mountain Climbers', // Nome dell'esercizio
                    exerciseSets: [
                      {
                        reps: 0, // Non utilizzato
                        weight: 0,
                        rest: 0,
                        time: 45, // Durata dell'esercizio in secondi
                      },
                    ],
                    notes: 'Riscaldamento dinamico', // Note per l'esercizio
                    timeBased: true, // Esercizio time-based
                  },
                ],
              },
              // Sezione Spalle con esercizi basati su ripetizioni
              {
                name: 'Spalle', // Nome della sezione
                exercises: [
                  {
                    name: 'Shoulder Press', // Nome dell'esercizio
                    exerciseSets: [
                      {
                        reps: 12, // Numero di ripetizioni
                        weight: 20, // Peso utilizzato (kg)
                        rest: 60, // Tempo di riposo (in secondi)
                        time: 0, // Non utilizzato
                      },
                      {
                        reps: 10,
                        weight: 22,
                        rest: 75,
                        time: 0,
                      },
                    ],
                    notes: 'Eseguito lentamente per migliorare la forza', // Note per l'esercizio
                    timeBased: false, // Non time-based, usiamo ripetizioni
                  },
                ],
              },
              // Sezione Petto con esercizi basati su ripetizioni
              {
                name: 'Petto', // Nome della sezione
                exercises: [
                  {
                    name: 'Chest Press', // Nome dell'esercizio
                    exerciseSets: [
                      {
                        reps: 15,
                        weight: 40,
                        rest: 90,
                        time: 0,
                      },
                      {
                        reps: 12,
                        weight: 45,
                        rest: 90,
                        time: 0,
                      },
                    ],
                    notes: 'Focus sulla tecnica', // Note per l'esercizio
                    timeBased: false, // Non time-based, usiamo ripetizioni
                  },
                ],
              },
            ],
          };

          console.log(workout);
          addWorkouts(workout);
        }}
      >
        shxashjxba
      </button> */}

      <WidgetContainer />
    </Container>
  );
}

export default DashboardPage;
const Container = styled.div`
  height: 93vh;
  height: 93dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
