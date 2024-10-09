// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosConfig'; // Use the configured axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/status');
        if (response.data.isAuthenticated) {
          setAuth({
            isAuthenticated: true,
            user: response.data.user,
            role: response.data.user.role,
          });
        } else {
          setAuth({ isAuthenticated: false, user: null, role: null });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuth({ isAuthenticated: false, user: null, role: null });
      }
    };

    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};