import { fetchApi } from './api';

export const login = async (credentials) => {
  console.log('logging in with:', credentials);

  return fetchApi('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
};

export const register = async (data) => {
  return fetchApi('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
