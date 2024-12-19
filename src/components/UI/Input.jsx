// components/ui/Input.jsx
import React from 'react';
import styled from 'styled-components';

// Definisci un componente stilizzato per l'input
const StyledInput = styled.input`
  padding: 10px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  border: 1px solid ${({ theme }) => theme.colors.light};
  box-shadow: 0 0 30px #00000075;
  border-radius: 10px;

  &:focus {
    border-color: #4caf50;
  }
`;

const Input = ({ type, placeholder, name, value, onChange }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
