import React from 'react';
import { MdTune } from 'react-icons/md';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalContext';

function TodayWidget() {
  const { workouts } = useGlobalContext();
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // "2024-11-18" (data di oggi senza orario)

  const todayWorkout = workouts.find((workout) => {
    const workoutDate = new Date(workout.date);

    // Controlla se la data è valida
    if (isNaN(workoutDate)) {
      console.error('Data non valida:', workout.date);
      return false; // Se la data non è valida, ignora questo workout
    }

    const workoutDateString = workoutDate.toISOString().split('T')[0]; // "2024-11-18"
    return workoutDateString === todayString;
  });
  function getFormattedDate() {
    const giorniSettimana = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const mesi = [
      'Gen',
      'Feb',
      'Mar',
      'Apr',
      'Mag',
      'Giu',
      'Lug',
      'Ago',
      'Set',
      'Ott',
      'Nov',
      'Dic',
    ];

    const oggi = new Date();

    const giornoSettimana = giorniSettimana[oggi.getDay()]; // Ottieni giorno della settimana
    const giornoMese = oggi.getDate(); // Giorno del mese
    const mese = mesi[oggi.getMonth()]; // Mese corrente

    return `${giornoSettimana} ${giornoMese} ${mese}`;
  }
  return (
    <Container
      onClick={() => {
        console.log(todayWorkout);
      }}
    >
      <MdTune className='settingIcon' />
      <div className='todayDate'>{getFormattedDate()}</div>
      <div className='workoutName'>
        {todayWorkout?.name || 'Nessun allenamento programmato per oggi'}
      </div>

      {todayWorkout && (
        <WorkoutTime>
          Allenamento programmato per le:{' '}
          {new Date(todayWorkout?.start).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </WorkoutTime>
      )}
    </Container>
  );
}

export default TodayWidget;

const Container = styled.div`
  position: relative;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  width: 45%;
  aspect-ratio: 1;
  padding: 20px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  /* align-items: center; */
  .todayDate {
    margin-bottom: 8px;
  }
  .workoutName {
    margin-bottom: 2px;
  }
  .settingIcon {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 10px;
    opacity: 0.7;
  }
`;
const WorkoutTime = styled.div`
  font-weight: lighter;
  opacity: 0.4;
  font-size: 0.8em;
`;
