import axios from './axiosConfig';

// Register a new user
export const registerUser = async (userData) => {
    const response = await axios.post('/auth/register', userData);
    return response.data;
};

// Log in a user
export const loginUser = async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
};

// Log out a user (if applicable)
export const logoutUser = async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
};
