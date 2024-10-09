// src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { setAuth } = useContext(AuthContext);
  const [role, setRole] = useState('Client');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agency: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { ...formData, role });
      // Automatically log in after registration
      const loginResponse = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      setAuth({
        isAuthenticated: true,
        user: loginResponse.data.user,
        role: loginResponse.data.user.role,
      });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {/* Role Selection */}
        <label>
          <input
            type="radio"
            value="Client"
            checked={role === 'Client'}
            onChange={() => setRole('Client')}
          />
          Client
        </label>
        <label>
          <input
            type="radio"
            value="Agent"
            checked={role === 'Agent'}
            onChange={() => setRole('Agent')}
          />
          Agent
        </label>
        {/* Form Fields */}
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          required
        />
        {role === 'Agent' && (
          <input
            type="text"
            placeholder="Agency"
            value={formData.agency}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agency: e.target.value }))
            }
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;