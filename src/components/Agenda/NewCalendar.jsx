import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useGlobalContext } from '../../context/GlobalContext';
import itLocale from '@fullcalendar/core/locales/it';
import { AnimatePresence } from 'framer-motion';
function NewCalendar({
  dateSelected,
  setDateSelected,
  dateWorkout,
  setDateWorkout,

  workouts,
}) {
  // const { workouts } = useGlobalContext();
  const [events, setEvents] = useState(
    workouts?.map((workout) => ({
      title: `${workout.name}`,
      date: `${workout.date}`,
      extendedProps: {
        ...workout,
      },
      id: `${workout._id}`,
    })) || []
  );

  useEffect(() => {
    if (dateSelected) {
      console.log(dateSelected);

      highlightSelectCell(dateSelected);
      const workoutForDay = getWorkoutForDay(dateSelected);

      if (workoutForDay.length === 0) {
        setDateWorkout(null);
      } else {
        setDateWorkout(workoutForDay);
      }
    }
  }, [workouts]);

  // Funzione che aggiorna i workout nel calendario (ancora non in tempo reale)
  useEffect(() => {
    setEvents(
      workouts?.map((workout) => ({
        title: `${workout.name}`,
        date: `${workout.date}`,
        extendedProps: {
          ...workout,
        },
        id: `${workout._id}`,
      })) || []
    );
  }, [workouts]);
  // Funzione che evidenzia la cella selezionata
  const highlightSelectCell = (date) => {
    console.log(date);

    const cells = document.querySelectorAll('.fc-daygrid-day');
    cells.forEach((cell) => {
      cell.classList.remove('selected-cell');
    });

    // Ottenere la data locale in formato YYYY-MM-DD
    const localDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    console.log(localDate);

    // Selezionare la cella corrispondente
    const selectedCell = document.querySelector(`[data-date="${localDate}"]`);
    if (selectedCell) {
      selectedCell.classList.add('selected-cell');
      setDateSelected(date);
    }
  };
  // Funzione che restituisce gli allenamenti per il giorno selezionato
  const getWorkoutForDay = (date) => {
    console.log('data selezionata:', date);

    // Converte la data in formato "YYYY-MM-DD" nel fuso orario locale
    const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' è un formato che restituisce "YYYY-MM-DD"
    console.log('data formattata:', formattedDate);

    console.log(formattedDate); // Visualizza la data senza l'orario nel fuso orario locale

    // Filtra gli allenamenti per confrontare solo la parte della data
    const workoutForToday = workouts.filter((workout) => {
      const workoutDate = new Date(workout.date).toLocaleDateString('en-CA'); // Ottieni solo la data dell'allenamento nel fuso orario locale
      return workoutDate === formattedDate;
    });

    return workoutForToday;
  };
  // Funzione che gestisce il click su una cella
  const handleDayClick = (date) => {
    console.log(date);
    console.log('chiamata funzione dayclick');

    highlightSelectCell(date);
    const workoutForDay = getWorkoutForDay(date);
    console.log(workoutForDay);
    if (workoutForDay.length === 0) {
      setDateWorkout(null);
    } else {
      setDateWorkout(workoutForDay);
    }
  };
  return (
    <Container isexpanded={true}>
      <div className='calendarContainer'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          events={events}
          locale={itLocale}
          headerToolbar={{
            left: 'title',
            // center: 'prev,next',
            // right: 'dayGridMonth,timeGridWeek',
          }}
          dateClick={(info) => {
            console.log(info);
            handleDayClick(info.date);
          }}
          eventClick={(info) =>
            console.log('Evento cliccato:', info.event.extendedProps.date)
          }
          eventContent={(eventInfo) => <div className='calendarEvent'></div>}
        />
      </div>
    </Container>
  );
}

export default NewCalendar;
const Container = styled.div`
  padding: 20px;
  background-color: #d9d9d910;
  display: grid;
  transition: grid-template-rows 300ms;
  grid-template-rows: ${(props) => (props.isexpanded ? '1fr' : '0fr')};
  .collapsedContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .date {
      font-size: 1.2em;
      font-weight: 800;
    }
    .name {
      font-size: 0.8em;
      opacity: 60%;
    }
  }
  .workoutName {
    text-align: center;
    padding-top: 20px;
  }
  .fc-scroller-harness {
    margin-bottom: 10px;
  }
  .calendarContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%; /* Questo farà sì che il calendario occupi tutta l'altezza disponibile del contenitore */
  }

  .fc {
    width: 100%;
    height: 100% !important; /* Impostiamo l'altezza al 100% per il calendario */
  }

  .fc-daygrid-day {
    height: 10px !important;
  }

  .fc-daygrid-day-number {
    line-height: 10px !important;
  }

  .fc-event {
    display: flex;
    justify-content: center;
    .calendarEvent {
      background-color: ${({ theme }) => theme.colors.light};
      width: 100%;
      font-size: 0.5em;
      border-radius: 5px;
      height: 10px;
      width: 10px;
    }
  }

  .fc {
    border: none !important;
    position: relative;
  }

  .fc-theme-standard td,
  .fc-theme-standard th,
  .fc-theme-standard .fc-scrollgrid {
    border: none !important;
  }

  .fc-header-toolbar {
    border: none !important;
    margin: 0 !important;
    .fc-toolbar-title {
      font-size: 1.2em;
      text-transform: capitalize;
    }
    .fc-toolbar-chunk {
      .fc-today-button {
        display: none;
      }
    }
  }
  .fc-col-header-cell-cushion {
    text-transform: capitalize;
  }
  .fc-daygrid-day-top {
    display: flex;
    justify-content: center;
  }

  .fc-day-today {
    background: transparent !important;
  }

  .fc-daygrid-day-number {
    color: ${({ theme }) => theme.colors.text};
  }

  .fc-daygrid-day-events {
    margin: 0 !important;
    height: 10px;
  }

  .fc-view-harness {
    /* height: 100% !important; */
    height: 300px !important;
  }

  .selected-cell {
    background-color: #d9d9d910 !important;
    border-radius: 50% !important;
    z-index: 1000 !important;
  }
  .fc-day {
    /* padding: 5px; */
  }
`;
