import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { MdTune } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGlobalContext } from '../../../context/GlobalContext';

// Funzione per ottenere il primo giorno del mese
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Funzione per ottenere il numero di giorni in un mese
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
const getToday = () => {
  const today = new Date();
  return today.getDate(); // Restituisce il giorno del mese (1-31)
};
const AgendaWidget = () => {
  const {
    workouts,
    setWorkouts,
    setWorkoutDateBuffer,
    workoutFormOpen,
    setWorkoutFormOpen,
  } = useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = getToday();
  // Ottieni il mese e l'anno correnti
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const day = currentDate.getDate();

  // Giorni della settimana in italiano
  const daysOfWeek = ['d', 'l', 'm', 'm', 'g', 'v', 's'];

  // Primo giorno del mese corrente
  const firstDay = getFirstDayOfMonth(year, month);

  // Numero di giorni nel mese corrente
  const daysInMonth = getDaysInMonth(year, month);

  // Funzione per cambiare mese
  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

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
    return workoutDates.includes(formattedDate);
  };
  const getWorkoutsForDay = (year, month, day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      '0'
    )}-${String(day).padStart(2, '0')}`;
    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      const workoutFormattedDate = `${workoutDate.getFullYear()}-${String(
        workoutDate.getMonth() + 1
      ).padStart(2, '0')}-${String(workoutDate.getDate()).padStart(2, '0')}`;
      return workoutFormattedDate === formattedDate;
    });
  };
  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const workoutsForDay = getWorkoutsForDay(year, month, day);

    if (workoutsForDay.length === 0) {
      console.log('aggiungere workout per questo giorno');
      setWorkoutDateBuffer(date); // Imposta la data quando clicchi su un giorno senza workout
      setWorkoutFormOpen(true);
      console.log(date);
    } else {
      console.log(`Workouts for ${day}-${month + 1}-${year}:`, workoutsForDay);
    }
  };
  return (
    <Container onClick={() => {}}>
      <FaChevronLeft
        className='prev'
        onClick={() => changeMonth(-1)}
      />
      <FaChevronRight
        className='next'
        onClick={() => changeMonth(1)}
      />
      <div className='calendar'>
        <div className='calendar-header'>
          <span>
            {currentDate.toLocaleString('it-IT', {
              month: 'long',
            })}
          </span>
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
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${
                  day === today &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                    ? 'today'
                    : ''
                }`}
                onClick={() => {
                  handleDayClick(day);
                }}
              >
                {day || ''}
                {day && hasWorkout(year, month, day) && (
                  <div className='workout-dot'></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <MdTune className='settingIcon' />
    </Container>
  );
};

export default AgendaWidget;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  position: relative;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  .settingIcon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    opacity: 70%;
    font-size: 20px;
  }
  .calendar {
    width: 300px;
    margin: 20px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .prev {
    position: absolute;
    left: 10px;
    color: #d9d9d9;
  }
  .next {
    position: absolute;
    right: 10px;
    color: #d9d9d9;
  }
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
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
    /* grid-gap: 5px; */
  }
  .today {
    background-color: #00c6be;
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
