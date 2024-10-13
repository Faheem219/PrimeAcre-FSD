import axios from './axiosConfig';

// Fetch all reviews for a specific property
export const getReviews = async (propertyId) => {
    const response = await axios.get(`/properties/${propertyId}/reviews`);
    return response.data;
};

// Add a new review for a property
export const addReview = async (propertyId, reviewData) => {
    const response = await axios.post(`/properties/${propertyId}/reviews`, reviewData);
    return response.data;
};

// Edit a specific review
export const updateReview = async (propertyId, reviewId, reviewData) => {
    const response = await axios.patch(`/properties/${propertyId}/reviews/${reviewId}`, reviewData);
    return response.data;
};

// Delete a review
export const deleteReview = async (propertyId, reviewId) => {
    const response = await axios.delete(`/properties/${propertyId}/reviews/${reviewId}`);
    return response.data;
};
