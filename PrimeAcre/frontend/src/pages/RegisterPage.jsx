// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/authAPI';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';

import './authStyles.css'; // Import the CSS for animations

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    role: 'Client',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    agency: '',
  });
  const [errors, setErrors] = useState(null);

  // Determine if currently on the login page based on URL
  const isLogin = location.pathname === '/login';

  // State to handle animation direction
  const [animationClass, setAnimationClass] = useState('slide-in-right');

  useEffect(() => {
    // Set the animation class based on navigation
    setAnimationClass(isLogin ? 'slide-in-right' : 'slide-in-left');
  }, [isLogin]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserData({ ...userData, role, agency: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      navigate('/login');
    } catch (error) {
      setErrors(
        error.response?.data?.error || 'An error occurred during registration'
      );
    }
  };

  const handleToggle = () => {
    if (!isLogin) {
      setAnimationClass('slide-out-right');
      setTimeout(() => navigate('/login'), 300); // Navigate after animation ends
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#202040',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        p: 3,
        position: 'relative',
        backgroundImage: 'url(/path-to-your-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Container maxWidth="sm">
        <Box
          className={`form-container ${animationClass}`} // Apply animation class
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            width: '100%',
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ color: '#ffffff', fontWeight: 'bold' }}
          >
            Sign up
          </Typography>
          {errors && (
            <Typography color="error" align="center">
              {errors}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label" sx={{ color: '#ffffff' }}>
                Role
              </InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={userData.role}
                onChange={handleRoleChange}
                label="Role"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  borderRadius: 1,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                  '& .MuiSvgIcon-root': { color: '#ffffff' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#1e1e1e',
                      color: '#ffffff',
                    },
                  },
                }}
              >
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
              </Select>
              <FormHelperText sx={{ color: '#ffffff' }}>
                Select your role
              </FormHelperText>
            </FormControl>
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
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
              label="Last Name"
              name="lastName"
              value={userData.lastName}
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
              label="Email"
              type="email"
              name="email"
              value={userData.email}
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
              value={userData.password}
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
              label="Phone"
              name="phone"
              value={userData.phone}
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
            {userData.role === 'Agent' && (
              <TextField
                label="Agency"
                name="agency"
                value={userData.agency}
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
            )}
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
              SIGN UP
            </Button>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#ffffff', mr: 1 }}>
              Already have an account? Click here →
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={!isLogin}
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

export default RegisterPage;
