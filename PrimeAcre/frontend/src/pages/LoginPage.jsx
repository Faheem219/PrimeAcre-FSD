import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');   // Error state for login failures
  const [loading, setLoading] = useState(false);  // Loading state during login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setError('');  // Reset error before submission

    try {
      const response = await axios.post('/auth/login', { email, password });
      setAuth({
        isAuthenticated: true,
        user: response.data.user,
        role: response.data.user.role,
      });
      navigate('/');  // Redirect to homepage after successful login
    } catch (error) {
      setError('Login failed. Please check your email and password.');  // Display error message
      console.error('Login failed:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>  {/* Disable button when loading */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
