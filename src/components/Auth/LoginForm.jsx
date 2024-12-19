import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../UI/Input';
import Button from '../UI/Button';
import logo from '../../assets/images/logo.png';
import bg from '../../assets/images/gymbg.jpg';
const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Container>
      <img
        className='logo'
        src={logo}
        alt=''
      />
      <img
        className='bg'
        src={bg}
        alt=''
      />
      <div className='layer' />
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
      <div className='registerlink'>
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
  /* padding: 40px 20px; */
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 40px;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  overflow: hidden;
  .logo {
    height: 100px;
  }
  .bg {
    z-index: -2;
    position: absolute;
    height: 100%;
  }
  .layer {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    background: rgb(22, 24, 31);
    background: -moz-linear-gradient(
      0deg,
      rgba(22, 24, 31, 1) 40%,
      rgba(22, 24, 31, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(22, 24, 31, 1) 40%,
      rgba(22, 24, 31, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(22, 24, 31, 1) 40%,
      rgba(22, 24, 31, 0) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#16181f",endColorstr="#16181f",GradientType=1);
  }
  form {
    width: 90%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .registerlink {
    margin-bottom: 40px;
  }
`;
