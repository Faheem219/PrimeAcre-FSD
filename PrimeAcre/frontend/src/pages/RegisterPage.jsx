import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axiosConfig';  // Assuming axios instance is configured for API base URL
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { setAuth } = useContext(AuthContext);
  const [role, setRole] = useState('Client');  // Default role is "Client"
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agency: '',  // Only required for "Agent" role
  });
  const [error, setError] = useState('');  // To capture any registration errors
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Registration API call
      await axios.post('/auth/register', { ...formData, role });

      // Automatic login after successful registration
      const loginResponse = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Update authentication context with user data
      setAuth({
        isAuthenticated: true,
        user: loginResponse.data.user,
        role: loginResponse.data.user.role,
      });

      // Redirect to the homepage after successful login
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please try again.');  // Capture registration failure
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if registration fails */}
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

        {/* Conditional Field for "Agent" Role */}
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
