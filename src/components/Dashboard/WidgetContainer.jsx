import React from 'react';
import styled from 'styled-components';
import TodayWidget from './widgets/TodayWidget';

function WidgetContainer() {
  return (
    <Container>
      <TodayWidget />
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
`;
