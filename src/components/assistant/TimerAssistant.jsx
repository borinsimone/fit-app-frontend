import React from 'react';
import styled from 'styled-components';

const TimerAssistant = ({ restTime, clear }) => {
  const [timeLeft, setTimeLeft] = React.useState(restTime);

  React.useEffect(() => {
    if (timeLeft === 0) {
      clear();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  return <div>{timeLeft} seconds remaining</div>;
};

export default TimerAssistant;
const TimerAssistantContainer = styled.div`
  /* Add your styles here */
`;
