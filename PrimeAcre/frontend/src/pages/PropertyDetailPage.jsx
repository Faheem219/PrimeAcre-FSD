// src/pages/PropertyDetailPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { getPropertyById } from '../api/propertyAPI';
import { getReviews, addReview } from '../api/reviewAPI';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function PropertyDetailPage() {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({
        rating: '',
        comment: '',
    });
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
            } catch (error) {
                setErrors(error.response.data.error || 'An error occurred while fetching property');
            }
        };

        const fetchReviews = async () => {
            try {
                const data = await getReviews(id);
                setReviews(data);
            } catch (error) {
                setErrors(error.response.data.error || 'An error occurred while fetching reviews');
            }
        };

        fetchProperty();
        fetchReviews();
    }, [id]);

    const handleReviewChange = (e) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview(id, reviewForm);
            setReviewForm({ rating: '', comment: '' });
            const data = await getReviews(id); // Refresh reviews
            setReviews(data);
        } catch (error) {
            setErrors(error.response.data.error || 'An error occurred while submitting review');
        }
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{property.title}</h1>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {/* Property Details */}
            <p>Description: {property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            <p>Size: {property.size} sq ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Type: {property.propertyType}</p>
            <p>Status: {property.status}</p>
            <p>Date Listed: {new Date(property.dateListed).toLocaleDateString()}</p>
            {/* Property Images */}
            {property.images && property.images.length > 0 && (
                <div>
                    <h3>Images:</h3>
                    {property.images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Property Image ${index + 1}`}
                            style={{ width: '200px', marginRight: '10px' }}
                        />
                    ))}
                </div>
            )}
            {/* Reviews */}
            <h2>Reviews</h2>
            {reviews && reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <strong>
                                {review.client.firstName} {review.client.lastName} - Rating: {review.rating}
                            </strong>
                            <p>{review.comment}</p>
                            <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
            {/* Add Review Form */}
            {auth.isAuthenticated && auth.user.role === 'Client' && (
                <div>
                    <h3>Add a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                        {/* Rating */}
                        <label>
                            Rating:
                            <select
                                name="rating"
                                value={reviewForm.rating}
                                onChange={handleReviewChange}
                                required
                            >
                                <option value="">Select rating</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </label>
                        {/* Comment */}
                        <label>
                            Comment:
                            <textarea
                                name="comment"
                                value={reviewForm.comment}
                                onChange={handleReviewChange}
                            />
                        </label>
                        {/* Submit Button */}
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PropertyDetailPage;
