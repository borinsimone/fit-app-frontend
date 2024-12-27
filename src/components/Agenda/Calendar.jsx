import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGlobalContext } from '../../context/GlobalContext';
import { AnimatePresence, motion } from 'framer-motion';

// Funzione per ottenere il primo giorno del mese
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Funzione per ottenere il numero di giorni in un mese
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

function Calendar({
  setDateSelected,
  dateSelected,
  dateWorkout,
  setDateWorkout,
  calendarExpanded,
  setCalendarExpanded,
  setPreviewExpanded,
}) {
  const {
    workouts,
    setWorkouts,
    setWorkoutDateBuffer,
    workoutFormOpen,
    setWorkoutFormOpen,
  } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Impostiamo la data a mezzanotte per evitare problemi di fuso orario

  // Ottieni il mese e l'anno correnti
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const date = new Date(year, month, today.getDate()); // Utilizziamo 'today' per gestire correttamente il giorno
    setDateSelected(date);
    handleDayClick(today.getDate());
    // setSelectedDay(date);
  }, []);

  // Giorni della settimana in italiano
  const daysOfWeek = ['d', 'l', 'm', 'm', 'g', 'v', 's'];

  // Primo giorno del mese corrente
  const firstDay = getFirstDayOfMonth(year, month);

  // Numero di giorni nel mese corrente
  const daysInMonth = getDaysInMonth(year, month);

  // Griglia dei giorni
  const generateCalendarDays = () => {
    const calendarDays = [];
    let dayCounter = 1;

    // Riempie i giorni precedenti se il mese non inizia di lunedì
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null); // Aggiungi giorni vuoti
    }

    // Aggiungi i giorni del mese corrente
    for (let i = firstDay; i < 7 && dayCounter <= daysInMonth; i++) {
      calendarDays.push(dayCounter);
      dayCounter++;
    }

    // Continua a riempire la griglia con più righe
    while (dayCounter <= daysInMonth) {
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        calendarDays.push(dayCounter);
        dayCounter++;
      }
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  const workoutDates = workouts.map((workout) => {
    const date = new Date(workout.date); // workout.date è "2024-12-18T10:54:44.427Z"
    date.setHours(0, 0, 0, 0); // Allineiamo la data alle 00:00 per evitare conflitti
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  });

  const hasWorkout = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    // console.log('Formatted Date:', formattedDate); // Aggiungi questo per debug

    // Aggiungi un controllo per il formato della data dei workout
    const formattedWorkoutDates = workouts.map((workout) => {
      const date = new Date(workout.date); // workout.date è "2024-12-18T10:54:44.427Z"
      date.setHours(0, 0, 0, 0); // Impostiamo l'orario a mezzanotte
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
    });

    // console.log('Formatted Workout Dates:', formattedWorkoutDates); // Stampa per debug
    return formattedWorkoutDates.includes(formattedDate);
  };

  const getWorkoutsForDay = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0); // Aggiustiamo anche l'orario
      const workoutFormattedDate = `${workoutDate.getFullYear()}-${String(
        workoutDate.getMonth() + 1
      ).padStart(2, '0')}-${String(workoutDate.getDate()).padStart(2, '0')}`;
      return workoutFormattedDate === formattedDate;
    });
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDay(date);
    const workoutsForDay = getWorkoutsForDay(year, month, day);
    setDateSelected(date);

    console.log(workoutsForDay);

    if (workoutsForDay.length === 0) {
      setDateWorkout(null);
    } else {
      setDateWorkout(workoutsForDay);
    }
  };

  // Funzione per cambiare mese
  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };
  return (
    <Container
      isexpanded={calendarExpanded}
      onClick={() => {
        setCalendarExpanded(true);
        setPreviewExpanded(false);
      }}
    >
      {calendarExpanded ? (
        <AnimatePresence mode='wait'>
          <motion.div
            className='calendarContainer'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='calendar'>
              <div className='calendar-header'>
                <FaChevronLeft
                  className='prev'
                  onClick={() => changeMonth(-1)}
                />
                <span>
                  {currentDate.toLocaleString('it-IT', {
                    month: 'long',
                  })}
                </span>
                <FaChevronRight
                  className='next'
                  onClick={() => changeMonth(1)}
                />
              </div>
              <div className='calendarBody'>
                <div className='calendar-weekdays'>
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={index}
                      className='calendar-weekday'
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className='calendar-days'>
                  {calendarDays.map((day, index) => {
                    const isSelected =
                      dateSelected &&
                      day &&
                      dateSelected.getDate() === day &&
                      dateSelected.getMonth() === month &&
                      dateSelected.getFullYear() === year;

                    return (
                      <div
                        key={index}
                        className={`calendar-day ${
                          day === today.getDate() &&
                          month === today.getMonth() &&
                          year === today.getFullYear()
                            ? 'today'
                            : ''
                        } ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day || ''}
                        {day && hasWorkout(year, month, day) && (
                          <div className='workout-dot'></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='workoutName'>
              {dateWorkout ? dateWorkout.map((workout) => workout.name) : ''}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          className='collapsedContainer'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div> {today.toLocaleDateString('it-IT')}</div>
          <div>
            {dateWorkout
              ? dateWorkout.map((workout) => workout.name).join(', ')
              : 'Nessun allenamento programmato'}
          </div>
        </motion.div>
      )}
    </Container>
  );
}

export default Calendar;

const Container = styled.div`
  position: relative;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  width: 100%;
  /* height: 40vh; */
  /* padding: 20px 0; */
  position: relative;
  color: #d9d9d9;
  background-color: #d9d9d910;
  /* height: ${(props) => (props.isexpanded ? 'auto' : '7vh')}; */
  transition: height 2s ease;

  box-shadow: 0 0 30px #00000075;
  z-index: 30;

  display: grid;

  transition: grid-template-rows 500ms;

  grid-template-rows: ${(props) => (props.isexpanded ? '1fr' : '0fr')};
  .collapsedContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 10vh;
    overflow: hidden;
    padding: 50px;
  }
  .calendarContainer {
    width: 100%;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .workoutName {
    font-size: 1em;
    text-align: center;
  }
  .settingIcon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    opacity: 70%;
    font-size: 20px;
  }
  .calendar {
    width: 90%;

    margin: 20px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .prev {
    /* position: absolute; */
    left: 10px;
    bottom: 0;
    color: #d9d9d9;
  }
  .next {
    /* position: absolute; */
    right: 10px;
    bottom: 0;
    color: #d9d9d9;
  }
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;

    position: relative;
    span {
      text-transform: capitalize;
    }
  }

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7 colonne */
    text-align: center;
    opacity: 60%;
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 7 colonne */
    text-align: center;
    background-color: #ffffff00;
    transition: 300ms;
    /* grid-gap: 5px; */
  }
  .calendar-day.selected {
    background-color: ${({ theme }) => {
      const hex = theme.colors.light.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.5)`; // Imposta opacità a 0.5
    }};
    color: white; /* Cambia il colore del testo per maggiore leggibilità */
    border-radius: 50%; /* Rendi lo sfondo rotondo */
  }
  .today {
    background-color: #00c6be !important;
    border-radius: 50px;
  }

  .calendar-day {
    text-align: center;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-weight: 100 !important;
    position: relative;
  }
  .workout-dot {
    width: 6px;
    height: 6px;
    background-color: #00c6be;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
  }
  .calendar-day.today {
    /* background-color: yellow; */
    font-weight: bold;
  }

  .calendar-weekday {
    font-weight: bold;
  }
`;
