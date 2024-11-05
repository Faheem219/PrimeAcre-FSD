// src/api/userAPI.js
import axios from './axiosConfig';

// Get user profile
export const getUserProfile = async () => {
    const response = await axios.get('/users/profile');
    return response.data;
};

// Update user profile (if needed)
export const updateUserProfile = async (userData) => {
    const response = await axios.patch('/users/profile', userData);
    return response.data;
};

// Delete user account (if needed)
export const deleteUserAccount = async () => {
    const response = await axios.delete('/users/profile');
    return response.data;
};
