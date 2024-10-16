import React, { useEffect, useState, useContext } from 'react';
import { getPropertyById } from '../api/propertyAPI';
import { getReviews, addReview } from '../api/reviewAPI';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';

const ReviewCard = ({ review }) => (
    <Card sx={{ backgroundColor: '#333', color: '#fff', marginBottom: 2 }}>
        <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                {review.client.firstName} {review.client.lastName} - Rating: {review.rating}
            </Typography>
            <Typography variant="body2">
                {review.comment}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Date: {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" sx={{ color: '#fff' }}>Read More</Button>
        </CardActions>
    </Card>
);

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

    // Handle loading state
    if (!property) {
        return <div>Loading...</div>;
    }

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

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">{property.title}</Typography>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}

            {/* Property Images */}
            {property.images && property.images.length > 0 && (
                <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
                    <Stack direction="row" spacing={3}>
                        {property.images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Property Image ${index + 1}`}
                                style={{ width: '200px', borderRadius: '8px', margin: '0 10px' }} // Added margin for each image
                            />
                        ))}
                    </Stack>
                </Box>
            )}

            {/* Property Details */}
            <Typography variant="body1">Description: {property.description}</Typography>
            <Typography variant="body1">Price: ${property.price}</Typography>
            <Typography variant="body1">Location: {property.location}</Typography>
            <Typography variant="body1">Size: {property.size} sq ft</Typography>
            <Typography variant="body1">Bedrooms: {property.bedrooms}</Typography>
            <Typography variant="body1">Bathrooms: {property.bathrooms}</Typography>
            <Typography variant="body1">Type: {property.propertyType}</Typography>
            <Typography variant="body1">Status: {property.status}</Typography>
            <Typography variant="body1">Agent: {property.agent.firstName} {property.agent.last}</Typography>
            <Typography variant="body1">Date Listed: {new Date(property.dateListed).toLocaleDateString()}</Typography>

            {/* Reviews */}
            <Typography variant="h5" sx={{ marginTop: 4 }}>Reviews</Typography>
            {reviews && reviews.length > 0 ? (
                <Grid container spacing={3}>
                    {reviews.map((review) => (
                        <Grid item xs={12} sm={6} md={4} key={review._id}>
                            <ReviewCard review={review} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No reviews yet.</Typography>
            )}

            {/* Add Review Form */}
            {auth.isAuthenticated && auth.user.role === 'Client' && (
                <Box component="form" onSubmit={handleReviewSubmit} sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Add a Review</Typography>
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
                    <label>
                        Comment:
                        <textarea
                            name="comment"
                            value={reviewForm.comment}
                            onChange={handleReviewChange}
                            required
                        />
                    </label>
                    <Button type="submit" variant="contained">Submit Review</Button>
                </Box>
            )}
        </Box>
    );
}

export default PropertyDetailPage;
