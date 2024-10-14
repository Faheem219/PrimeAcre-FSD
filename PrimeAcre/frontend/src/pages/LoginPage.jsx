// src/pages/LoginPage.jsx
import React, { useContext } from 'react';
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authAPI';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function LoginPage() {
  const theme = useTheme();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const signIn = async (provider, formData) => {
    try {
      const credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
      };
      const response = await loginUser(credentials);

      // Update auth state
      setAuth({
        isAuthenticated: true,
        user: response.user,
        role: response.user.role,
      });

      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      alert(error.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}
