// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/authAPI';
import { useNavigate, Link } from 'react-router-dom';

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
      setErrors(error.response.data.error || 'An error occurred during registration');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <form onSubmit={handleSubmit}>
        {/* Role */}
        <label>
          Role:
          <select name="role" value={userData.role} onChange={handleRoleChange} required>
            <option value="Client">Client</option>
            <option value="Agent">Agent</option>
          </select>
        </label>
        {/* First Name */}
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        {/* Last Name */}
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        {/* Email */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
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
            value={userData.password}
            onChange={handleChange}
            required
          />
        </label>
        {/* Phone */}
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
          />
        </label>
        {/* Agency (for Agents only) */}
        {userData.role === 'Agent' && (
          <label>
            Agency:
            <input
              type="text"
              name="agency"
              value={userData.agency}
              onChange={handleChange}
              required
            />
          </label>
        )}
        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
