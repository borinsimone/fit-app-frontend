import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdTune } from 'react-icons/md';
import Calendar from '../components/Agenda/Calendar';
import WorkoutPreview from '../components/Agenda/WorkoutPreview';

function AgendaPage() {
  const { setWorkoutDateBuffer } = useGlobalContext();
  const [dateSelected, setDateSelected] = useState(null);
  const [dateWorkout, setDateWorkout] = useState(null);

  useEffect(() => {
    setWorkoutDateBuffer(null);
  }, []);

  return (
    <Container>
      <Calendar
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        dateWorkout={dateWorkout}
        setDateWorkout={setDateWorkout}
      />
      <WorkoutPreview
        workout={dateWorkout}
        date={dateSelected}
      />
    </Container>
  );
}

export default AgendaPage;
const Container = styled.div``;
