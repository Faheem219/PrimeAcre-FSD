// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { loginUser } from '../api/authAPI';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
      setErrors(error.response.data.error || 'Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        {/* Password */}
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        {/* Submit Button */}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
}

export default LoginPage;
