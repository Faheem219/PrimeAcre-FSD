import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;  // Base URL of your backend API

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Allows credentials like cookies to be sent
});

export default instance;
