import axios from './axiosConfig';

// Fetch all agents
export const getAgents = async () => {
    const response = await axios.get('/agents');
    return response.data;
};

// Fetch a single agent by ID
export const getAgentById = async (id) => {
    const response = await axios.get(`/agents/${id}`);
    return response.data;
};

// Add a new agent
export const addAgent = async (agentData) => {
    const response = await axios.post('/agents', agentData);
    return response.data;
};

// Delete an agent
export const deleteAgent = async (id) => {
    const response = await axios.delete(`/agents/${id}`);
    return response.data;
};
