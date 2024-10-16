// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';

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
  FormHelperText,
  Link as MuiLink,
} from '@mui/material';

function RegisterPage() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserData({ ...userData, role, agency: '' }); // Reset agency if not Agent
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      navigate('/login'); // Redirect to login
    } catch (error) {
      setErrors(
        error.response?.data?.error || 'An error occurred during registration'
      );
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: '#ffffff',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center', // Center horizontally
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#1e1e1e',
            width: '100%',
            maxWidth: '500px',
            mx: 'auto', // Horizontal centering
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ color: '#ffffff' }}
          >
            Register
          </Typography>
          {errors && (
            <Typography color="error" align="center">
              {errors}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* Role */}
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
                  color: '#ffffff',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ffffff',
                  },
                  '& .MuiSvgIcon-root': { color: '#ffffff' }, // Arrow color
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
            {/* First Name */}
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
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
            {/* Last Name */}
            <TextField
              label="Last Name"
              name="lastName"
              value={userData.lastName}
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
            {/* Email */}
            <TextField
              label="Email"
              type="email"
              name="email"
              value={userData.email}
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
            {/* Password */}
            <TextField
              label="Password"
              type="password"
              name="password"
              value={userData.password}
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
            {/* Phone */}
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone}
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
            {/* Agency (for Agents only) */}
            {userData.role === 'Agent' && (
              <TextField
                label="Agency"
                name="agency"
                value={userData.agency}
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
            )}
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Register
            </Button>
          </Box>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: '#ffffff' }}
          >
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" sx={{ color: '#90caf9' }}>
              Login here.
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
