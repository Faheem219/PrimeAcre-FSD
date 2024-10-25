// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authAPI';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from '@mui/material';

function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      // Update auth state
      setAuth((prevAuth) => ({
        ...prevAuth,
        isAuthenticated: true,
      }));
      navigate('/'); // Redirect to home
    } catch (error) {
      setErrors(error.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        width: '100vw',
        p: 2, // Add padding to prevent content touching the screen edge
        position: 'relative',
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '-30px',
            left: '-30px',
            right: '-30px',
            bottom: '-30px',
            zIndex: -1,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
            filter: 'blur(45px)',
          }}
        ></Box>
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#1e1e1e',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ color: '#ffffff' }}
          >
            Login
          </Typography>
          {errors && (
            <Typography color="error" align="center">
              {errors}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{
                style: { color: '#ffffff' },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                },
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
              InputLabelProps={{ style: { color: '#ffffff' } }}
              InputProps={{
                style: { color: '#ffffff' },
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, backgroundColor: '#44b0ff', '&:hover': { backgroundColor: '#3578e5' } }}
            >
              Login
            </Button>
          </Box>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: '#ffffff' }}
          >
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register" sx={{ color: '#90caf9' }}>
              Register here.
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
