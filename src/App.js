import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
