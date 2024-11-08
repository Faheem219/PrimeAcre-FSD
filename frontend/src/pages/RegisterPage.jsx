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

import loginHero from '../assets/images/loginHero.jpg'; // Background image import
import './authStyles.css'; // Import custom CSS for animations

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State to store user data
  const [userData, setUserData] = useState({
    role: 'Client',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    agency: '',
  });

  // State for error messages
  const [errors, setErrors] = useState(null);

  // Check if currently on the login page
  const isLogin = location.pathname === '/login';

  // State to handle animation direction
  const [animationClass, setAnimationClass] = useState('slide-in-right');

  // Set animation class based on navigation
  useEffect(() => {
    setAnimationClass(isLogin ? 'slide-in-right' : 'slide-in-left');
  }, [isLogin]);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle role change and reset agency field if not an agent
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserData({ ...userData, role, agency: '' });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setErrors(error.response?.data?.error || 'An error occurred during registration');
    }
  };

  // Toggle between register and login pages with animation
  const handleToggle = () => {
    if (!isLogin) {
      setAnimationClass('slide-out-right');
      setTimeout(() => navigate('/login'), 300);
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
        p: 3,
        position: 'relative',
        backgroundImage: `url(${loginHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for better text readability
      }}
    >
      <Container maxWidth="sm">
        <Box
          className={`form-container ${animationClass}`}
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
            {/* Role Selection */}
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
              <FormHelperText sx={{ color: '#ffffff' }}>Select your role</FormHelperText>
            </FormControl>

            {/* Form Fields */}
            {['firstName', 'lastName', 'email', 'password', 'phone'].map((field) => (
              <TextField
                key={field}
                label={field.replace(/([A-Z])/g, ' $1')}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                value={userData[field]}
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
            ))}

            {/* Agency Field (Visible Only for Agents) */}
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

            {/* Submit Button */}
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

          {/* Toggle to Login Page */}
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
