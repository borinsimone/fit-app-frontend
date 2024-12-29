import React from 'react';
import styled from 'styled-components';
import TodayWidget from './widgets/TodayWidget';
import ChecklistWidget from './widgets/ChecklistWidget';
import SupplementsReminderWidget from './widgets/SupplementReminderWidget';
import AgendaWidget from './widgets/AgendaWidget';
import CalendarWidget from './widgets/CalendarWidget';

function WidgetContainer() {
  return (
    <Container>
      <div className='row'>
        <TodayWidget />
        <ChecklistWidget />
      </div>
      <div className='row'>
        <SupplementsReminderWidget />
      </div>
      {/* <AgendaWidget /> */}
      <CalendarWidget />
    </Container>
  );
}

export default WidgetContainer;
const Container = styled.div`
  width: 100%;
  /* height: 80%; */
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 20px;
  overflow: scroll;
  .row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
  }
`;
