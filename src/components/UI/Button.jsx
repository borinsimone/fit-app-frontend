// components/ui/Button.jsx
import React from 'react';
import styled from 'styled-components';

// Definisci un componente stilizzato
const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 10000px;
  font-weight: bold;

  &:hover {
    /* background-color: #45a049; */
  }
`;

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
