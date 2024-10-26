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
    const response = await axios.post('/properties', propertyData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
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

// Mark a property as interested
export const markPropertyAsInterested = async (propertyId) => {
    try {
        const response = await axios.post(`/properties/${propertyId}/interested`);
        return response.data;
    } catch (error) {
        console.error('Error in markPropertyAsInterested API call:', error); // Debug log
        throw error;
    }
};
