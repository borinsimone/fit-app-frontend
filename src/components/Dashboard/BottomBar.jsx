import React from 'react';
import { FaCalendar, FaUser } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { MdOutlineDashboard } from 'react-icons/md';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Funzione per determinare se la route è attiva
  const isActive = (path) => location.pathname === path;

  return (
    <Container>
      <IconWrapper
        active={isActive('/dashboard')}
        onClick={() => navigate('/dashboard')}
      >
        <MdOutlineDashboard style={{ color: 'red' }} />
      </IconWrapper>
      <IconWrapper
        active={isActive('/agenda')}
        onClick={() => navigate('/agenda')}
      >
        <FaCalendar />
      </IconWrapper>
      <IconWrapper
        active={isActive('/stats')}
        onClick={() => navigate('/stats')}
      >
        <GoGraph />
      </IconWrapper>
      <IconWrapper
        active={isActive('/profile')}
        onClick={() => navigate('/profile')}
      >
        <FaUser />
      </IconWrapper>
    </Container>
  );
}

export default BottomBar;

// Styled Components
const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  /* background-color: #f8f8f8; */
  height: 7vh;
  height: 7dvh;

  background-color: ${({ theme }) => theme.colors.background};

  padding: 15px 0;
  padding-bottom: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: ${(props) => (props.active ? 'scale(1.2)' : 'scale(1)')};
  transform-origin: bottom;
  transition: transform 300ms;
  svg {
    & > * {
      user-select: none;
    }
    font-size: 25px;

    transition: color 0.3s ease;
    path {
      color: ${(props) => (props.active ? `#00C6BE` : '#d9d9d950')};
      transition: color 400ms;
      filter: ${(props) =>
        props.active ? 'drop-shadow(0 0 10px 10px #00C6BE)' : 'none'};
    }
  }
`;
