import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../UI/Input';
import Button from '../UI/Button';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Login</Button>
      </form>
      <div>
        Non hai un account? <Link to='/register'>Registrati</Link>
      </div>
    </Container>
  );
};

export default LoginForm;
const Container = styled.div`
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  color: ${({ theme }) => theme.colors.text};
  form {
    width: 90%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  a {
    color: ${({ theme }) => theme.colors.light};
  }
`;
