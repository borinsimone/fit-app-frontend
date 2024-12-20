import React from 'react';
import styled from 'styled-components';
import TodayWidget from './widgets/TodayWidget';
import ChecklistWidget from './widgets/ChecklistWidget';
import SupplementsReminderWidget from './widgets/SupplementReminderWidget';

function WidgetContainer() {
  return (
    <Container>
      <TodayWidget />
      <ChecklistWidget />
      <SupplementsReminderWidget />
    </Container>
  );
}

export default WidgetContainer;
const Container = styled.div`
  width: 100%;

  /* background-color: #ffffff10; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
