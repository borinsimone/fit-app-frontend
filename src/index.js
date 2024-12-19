import React from 'react';
import ReactDOM from 'react-dom/client'; // Nota la modifica nel path di import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
