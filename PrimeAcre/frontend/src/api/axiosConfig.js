import axios from 'axios';

const API_URL = 'http://localhost:5001';  // Base URL of your backend API

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Allows credentials like cookies to be sent
});

export default instance;
