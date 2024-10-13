import axios from './axiosConfig';

// Fetch all clients
export const getClients = async () => {
    const response = await axios.get('/clients');
    return response.data;
};

// Fetch a single client by ID
export const getClientById = async (id) => {
    const response = await axios.get(`/clients/${id}`);
    return response.data;
};

// Add a new client
export const addClient = async (clientData) => {
    const response = await axios.post('/clients', clientData);
    return response.data;
};
