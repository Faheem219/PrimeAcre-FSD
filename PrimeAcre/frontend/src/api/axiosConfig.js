// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001', // Replace with your backend URL and port
  withCredentials: true, // Include cookies in requests
});

export default instance;