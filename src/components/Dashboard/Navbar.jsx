import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import styled from 'styled-components';

function Navbar() {
  const { user, setUser } = useGlobalContext();
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return 'BUON GIORNO';
    } else if (hour >= 12 && hour < 18) {
      return 'BUON POMERIGGIO';
    } else {
      return 'BUONA SERA';
    }
  };
  return (
    <Container>
      <div className='userText'>
        <div className='greeting'>{getGreeting()},</div>
        <div className='username'>{user?.name}</div>
      </div>
      <Logo />
    </Container>
  );
}

export default Navbar;
const Container = styled.div`
  width: 100%;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  color: #d9d9d9;
  .userText {
    margin-right: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .greeting {
      font-size: 14px;
      font-weight: 100;
      opacity: 60%;
    }
    .username {
      font-size: 20px;
      font-weight: 100;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;
const Logo = styled.div`
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #d9d9d9;
`;
