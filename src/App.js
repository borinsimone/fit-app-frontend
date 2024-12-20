import React from 'react';
import { HashRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalProvider } from './context/GlobalContext';
import BottomBar from './components/Dashboard/BottomBar';

const AppContent = () => {
  const location = useLocation();
  const hiddenRoutes = ['/login', '/register'];
  const showBottomBar = !hiddenRoutes.includes(location.pathname);
  return (
    <>
      <AppRoutes />
      {showBottomBar && <BottomBar />}
    </>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default App;
