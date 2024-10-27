import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../assets/images/logo-removebg.png'; // Import the logo

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: 'linear-gradient(to right, #be641a, #6b0000)',
}));

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
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Site Title */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              mr: 4,
              ml: 2,
              flexGrow: 1,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={logo}
              alt="PrimeAcre Logo"
              sx={{
                height: 40,
                width: 40,
                marginRight: 2,
              }}
            />
            {/* Site Title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
              }}
            >
              PrimeAcre
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/properties"
              sx={{ color: 'white' }}
            >
              Properties
            </Button>
            {auth.isAuthenticated ? (
              <>
                {auth.role === 'Agent' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/properties/add"
                      sx={{ color: 'white' }}
                    >
                      Add Property
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/agent/profile"
                      sx={{ color: 'white' }}
                    >
                      Agent Profile
                    </Button>
                  </>
                )}
                {auth.role === 'Client' && (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/client/profile"
                    sx={{ color: 'white' }}
                  >
                    Client Profile
                  </Button>
                )}
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ color: 'white' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white' }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ color: 'white' }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
