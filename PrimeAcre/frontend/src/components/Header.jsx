// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
} from '@mui/material';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setAuth({ isAuthenticated: false, user: null, role: null });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e' }}>
      <Toolbar>
        {/* Site Title */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          PrimeAcre
        </Typography>
        {/* Navigation Links */}
        <Button color="inherit" component={RouterLink} to="/properties">
          Properties
        </Button>
        {auth.isAuthenticated ? (
          <>
            {auth.role === 'Agent' && (
              <>
                <Button color="inherit" component={RouterLink} to="/properties/add">
                  Add Property
                </Button>
                <Button color="inherit" component={RouterLink} to="/agent/profile">
                  Agent Profile
                </Button>
              </>
            )}
            {auth.role === 'Client' && (
              <Button color="inherit" component={RouterLink} to="/client/profile">
                Client Profile
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
