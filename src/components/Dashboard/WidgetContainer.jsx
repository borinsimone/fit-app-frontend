import React from 'react';
import styled from 'styled-components';
import TodayWidget from './widgets/TodayWidget';
import ChecklistWidget from './widgets/ChecklistWidget';
import SupplementsReminderWidget from './widgets/SupplementReminderWidget';
import AgendaWidget from './widgets/AgendaWidget';

function WidgetContainer() {
  return (
    <Container>
      <TodayWidget />
      <ChecklistWidget />
      <SupplementsReminderWidget />
      <AgendaWidget />
    </Container>
  );
}

export default WidgetContainer;
const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  overflow: scroll;
`;
