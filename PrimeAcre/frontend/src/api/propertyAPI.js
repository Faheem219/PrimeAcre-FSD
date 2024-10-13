import axios from './axiosConfig';

// Fetch all properties
export const getProperties = async () => {
    const response = await axios.get('/properties');
    return response.data;
};

// Fetch a single property by ID
export const getPropertyById = async (id) => {
    const response = await axios.get(`/properties/${id}`);
    return response.data;
};

// Add a new property
export const addProperty = async (propertyData) => {
    const response = await axios.post('/properties', propertyData);
    return response.data;
};

// Update an existing property
export const updateProperty = async (id, propertyData) => {
    const response = await axios.patch(`/properties/${id}`, propertyData);
    return response.data;
};

// Delete a property
export const deleteProperty = async (id) => {
    const response = await axios.delete(`/properties/${id}`);
    return response.data;
};
