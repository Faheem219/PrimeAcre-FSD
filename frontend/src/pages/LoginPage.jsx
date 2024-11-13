import React, { useContext, useState, useEffect } from 'react';
import { loginUser } from '../api/authAPI';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';

import loginHero from '../assets/images/loginHero.jpg'; // Import your background image
import './authStyles.css'; // Import custom CSS for animations

function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);

  // Determine if currently on the register page based on URL
  const isRegister = location.pathname === '/register';

  // State to handle animation direction
  const [animationClass, setAnimationClass] = useState('slide-in-left');

  useEffect(() => {
    // Set the animation class based on navigation
    setAnimationClass(isRegister ? 'slide-in-left' : 'slide-in-right');
  }, [isRegister]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      setAuth((prevAuth) => ({
        ...prevAuth,
        isAuthenticated: true,
      }));
      navigate('/');
      window.location.reload();
    } catch (error) {
      setErrors(error.response?.data?.error || 'Invalid credentials');
    }
  };

  const handleToggle = () => {
    if (!isRegister) {
      setAnimationClass('slide-out-left');
      setTimeout(() => navigate('/register'), 300); // Navigate after animation ends
    }
  };

  return (
    <Box
      sx={{
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        p: 2,
        position: 'relative',
        backgroundImage: `url(${loginHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for better text visibility
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative' }}>
        <Box
          className={`form-container ${animationClass}`} // Apply animation class
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ color: '#ffffff', fontWeight: 'bold' }}
          >
            Welcome back!
          </Typography>
          {errors && (
            <Typography color="error" align="center">
              {errors}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{
                style: { color: '#ffffff' },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                },
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
              }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{
                style: { color: '#ffffff' },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                },
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#ff6b6b',
                color: '#ffffff',
                '&:hover': { backgroundColor: '#ff5252' },
                fontWeight: 'bold',
              }}
            >
              LOG IN
            </Button>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mr: 1 }}>
              Don't have an account? Click here →
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isRegister}
                  onChange={handleToggle}
                  color="secondary"
                />
              }
              label=""
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
