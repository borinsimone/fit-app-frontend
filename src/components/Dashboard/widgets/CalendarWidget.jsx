import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useGlobalContext } from '../../../context/GlobalContext';
import itLocale from '@fullcalendar/core/locales/it';

const CalendarWidget = () => {
  const { workouts } = useGlobalContext();
  const [events, setEvents] = useState(
    workouts?.map((workout) => ({
      title: `${workout.name}`,
      date: `${workout.date}`,
      id: `${workout._id}`,
    })) || []
  );
  useEffect(() => {
    setEvents(
      workouts?.map((workout) => ({
        title: `${workout.name}`,
        date: `${workout.date}`,
        id: `${workout._id}`,
      })) || []
    );
  }, [workouts]);
  return (
    <CalendarContainer onClick={() => console.log(events)}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        events={events}
        locale={itLocale}
        dateClick={(info) => console.log('Data cliccata:', info.dateStr)}
        eventClick={(info) => console.log('Evento cliccato:', info.event)}
        eventContent={(eventInfo) => (
          <div className='calendarEvent'>
            <b>{eventInfo.event.title}</b>
          </div>
        )}
      />
    </CalendarContainer>
  );
};

export default CalendarWidget;

const CalendarContainer = styled.div`
  width: 100%;
  padding: 15px;
  color: #d9d9d9;
  background-color: #d9d9d910;
  border: 1px solid #00c6be;
  box-shadow: 0 0 30px #00000075;
  border-radius: 20px;
  .calendarEvent {
    /* background-color: #fff; */
    background-color: ${({ theme }) => theme.colors.light};
    padding: 5px;
    width: 100%;
    overflow: hidden;
    font-size: 0.5em;
    border-radius: 5px;
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
    }
    .fc-toolbar-chunk {
      .fc-today-button {
        display: none;
      }
      /* .fc-button-group {
        margin: 0 !important;
        position: absolute;
        top: 50%;

        transform: translateY(-50%);
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        button {
          all: unset;
        }
      } */
    }
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
  .fc-view-harness {
    height: 400px !important;
  }
`;
