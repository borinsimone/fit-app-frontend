const API_URL = 'https://fit-app-backend-babz.onrender.com';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const fetchApi = async (endpoint, options) => {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
