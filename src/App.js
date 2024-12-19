import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalProvider } from './context/GlobalContext';
const App = () => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default App;
