// src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';

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
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        {auth.isAuthenticated ? (
          <>
            {auth.role === 'Agent' && (
              <>
                <Link to="/properties/add">Add Property</Link>
                <Link to="/agent/profile">Agent Profile</Link>
              </>
            )}
            {auth.role === 'Client' && (
              <>
                <Link to="/client/profile">Client Profile</Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;