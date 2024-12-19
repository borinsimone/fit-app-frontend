// components/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import styled from 'styled-components';
import { login } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Stato per i dati del form e per gli eventuali errori
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  // Gestisce il cambiamento nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const loginAfterRegistration = async (credentials) => {
    try {
      const response = await login(credentials);
      console.log('Logged in:', response);

      console.log('response ok');

      localStorage.setItem('token', response.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Gestisce l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Controllo se le password coincidono
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    // Crea l'oggetto di registrazione
    const credentials = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Invio della richiesta di registrazione al backend
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Se la registrazione è riuscita, reindirizza l'utente al login
        // navigate('/login');
        const loginCredentials = {
          email: credentials.email,
          password: credentials.password,
        };
        const response = await login(loginCredentials);
        console.log('Logged in:', response);

        console.log('response ok');

        localStorage.setItem('token', response.token);

        navigate('/dashboard');
      } else {
        // Gestisci gli errori, se ce ne sono
        setError(data.error || 'Errore durante la registrazione');
      }
    } catch (err) {
      setError('Errore di rete');
      console.error('Register error:', err);
    }
  };

  return (
    <Container>
      <h2>Registrati</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type='name'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type='password'
          name='confirmPassword'
          placeholder='Conferma Password'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type='submit'>Registrati</Button>
      </form>
      <div>
        Hai un account? <Link to='/login'>Accedi</Link>
      </div>
    </Container>
  );
};

export default RegisterPage;
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
