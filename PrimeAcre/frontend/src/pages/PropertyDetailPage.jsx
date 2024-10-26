import React, { useEffect, useState, useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import NatureIcon from '@mui/icons-material/Nature';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../api/propertyAPI';
import { getReviews, addReview, updateReview } from '../api/reviewAPI'; // Import updateReview function
import { Box, Paper, Typography, Grid, Card, CardContent, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating, IconButton, CircularProgress } from '@mui/material';
import Slideshow from '../components/Slideshow';
import { AuthContext } from '../contexts/AuthContext'; // Assuming you have AuthContext for client authentication

function PropertyDetailPage() {
    const { id } = useParams();
    const { auth } = useContext(AuthContext); // Check authentication status
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [errors, setErrors] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [openReviewForm, setOpenReviewForm] = useState(false); // State to handle form visibility
    const [openEditForm, setOpenEditForm] = useState(false); // State to handle edit form visibility
    const [reviewData, setReviewData] = useState({ rating: 0, comment: '' }); // State for review data
    const [editReviewId, setEditReviewId] = useState(null); // ID of the review being edited

    useEffect(() => {
        // Fetch property and reviews data
        const fetchData = async () => {
            try {
                const propertyData = await getPropertyById(id);
                setProperty(propertyData);

                const reviewsData = await getReviews(id); // Fetch reviews for the property
                setReviews(reviewsData);
            } catch (error) {
                setErrors(error.response?.data?.error || 'An error occurred while fetching data');
            }
        };

        fetchData();
    }, [id]);

    // Handle opening and closing of the review form
    const handleOpenReviewForm = () => setOpenReviewForm(true);
    const handleCloseReviewForm = () => {
        setOpenReviewForm(false);
        setReviewData({ rating: 0, comment: '' }); // Reset form data
    };

    // Handle opening and closing of the edit form
    const handleOpenEditForm = (review) => {
        setEditReviewId(review._id);
        setReviewData({ rating: review.rating, comment: review.comment });
        setOpenEditForm(true);
    };
    const handleCloseEditForm = () => {
        setOpenEditForm(false);
        setReviewData({ rating: 0, comment: '' }); // Reset form data
        setEditReviewId(null);
    };

    // Handle form submission for adding a new review
    const handleReviewSubmit = async () => {
        try {
            const newReview = await addReview(id, reviewData); // Send review data to API
            setReviews((prev) => [...prev, newReview]); // Update local state with the new review
            handleCloseReviewForm();
            window.location.reload();
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred while submitting the review');
        }
    };

    // Handle form submission for updating an existing review
    const handleReviewUpdate = async () => {
        try {
            const updatedReview = await updateReview(id, editReviewId, reviewData); // Update review data via API
            setReviews((prev) =>
                prev.map((review) => (review._id === editReviewId ? updatedReview : review))
            ); // Update the local state with the edited review
            handleCloseEditForm();
            window.location.reload();
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred while updating the review');
        }
    };

    if (!property) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    minWidth: '100vw',
                    backgroundColor: '#121212',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress sx={{ color: '#ff9800' }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                padding: 4,
                fontFamily: 'Proxima Nova, sans-serif',
                color: '#fff',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Property Details */}
            <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#ff9800' }}>
                {property.title}
            </Typography>

            {/* Slideshow Component for Property Images */}
            {property.images && property.images.length > 0 && (
                <Box sx={{ maxWidth: '100%', overflow: 'hidden', marginBottom: 4 }}>
                    <Slideshow images={property.images} />
                </Box>
            )}

            <Paper sx={{ padding: 3, backgroundColor: '#444', color: '#fff', marginBottom: 4 }}>
                <Grid container spacing={2} sx={{ marginBottom: 4 }}>
                    {/* Property Details Cards */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <HomeIcon />
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                <strong>Property Type:</strong> {property.propertyType}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <BuildIcon />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Bedrooms:</strong> {property.bedrooms}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <NatureIcon />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Size:</strong> {property.size} sq ft
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <DriveEtaIcon />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Garage Spaces:</strong> {property.garageSpaces} Attached garage spaces
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <AttachMoneyIcon />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Price:</strong> ${property.price}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Bathrooms:</strong> {property.bathrooms}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#555', padding: 2 }}>
                            <NatureIcon />
                            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                <strong>Location:</strong> {property.location}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#ff9800' }}>
                Description
            </Typography>
            <Button onClick={() => setShowDescription(prev => !prev)} sx={{ marginBottom: 2 }}>
                {showDescription ? 'Hide Description' : 'Show Description'}
            </Button>
            {showDescription && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {property.description}
                </Typography>
            )}

            {/* Property Features Section */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#ff9800' }}>
                What's Special
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <Grid container spacing={1}>
                    {property.specialFeatures && property.specialFeatures.length > 0 ? (
                        property.specialFeatures.map((feature, index) => (
                            <Grid item key={index}>
                                <Chip
                                    label={feature}
                                    sx={{
                                        backgroundColor: '#e0e0e0',
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem',
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Typography>Special features will be updated very soon, stay tuned.</Typography>
                    )}
                </Grid>
            </Box>

            {/* Comments Section */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#ff9800' }}>
                Comments
            </Typography>
            {reviews.length > 0 ? (
                <Grid container spacing={2} justifyContent="flex-start">
                    {reviews.map((review) => (
                        <Grid item xs={12} sm={6} md={4} key={review._id}>
                            <Card sx={{ backgroundColor: '#444', color: '#fff' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {review.client.firstName} {review.client.lastName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                        <strong>Rating:</strong> {review.rating}/5
                                    </Typography>
                                    <Typography variant="body1">
                                        {review.comment}
                                    </Typography>
                                    {review.edit && (
                                        <Typography variant="caption" sx={{ display: 'block', color: '#ff7043' }}>
                                            Edited
                                        </Typography>
                                    )}
                                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1, color: '#bbb' }}>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </Typography>
                                    {/* Edit Button for client's own reviews */}
                                    {auth.isAuthenticated && auth.role === 'Client' && review.client._id === auth.user.id && (
                                        <IconButton
                                            onClick={() => handleOpenEditForm(review)}
                                            sx={{ marginTop: 1, color: '#ff9800' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#333', color: '#fff' }}>
                    <Typography>No comments available at the moment.</Typography>
                </Paper>
            )}

            {/* Submit Review Button for Authenticated Clients */}
            {auth.isAuthenticated && auth.role === 'Client' && (
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenReviewForm}
                        sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#ff7043' } }}
                    >
                        Submit a Review
                    </Button>
                </Box>
            )}

            {/* Review Form Modal for Adding New Review */}
            <Dialog open={openReviewForm} onClose={handleCloseReviewForm}>
                <DialogTitle>Submit a Review</DialogTitle>
                <DialogContent>
                    <Rating
                        name="rating"
                        value={reviewData.rating}
                        onChange={(event, newValue) => setReviewData({ ...reviewData, rating: newValue })}
                        max={5}
                    />
                    <TextField
                        label="Comment"
                        name="comment"
                        multiline
                        rows={4}
                        fullWidth
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        sx={{ marginTop: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReviewForm} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleReviewSubmit} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Form Modal for Editing Existing Review */}
            <Dialog open={openEditForm} onClose={handleCloseEditForm}>
                <DialogTitle>Edit Your Review</DialogTitle>
                <DialogContent>
                    <Rating
                        name="rating"
                        value={reviewData.rating}
                        onChange={(event, newValue) => setReviewData({ ...reviewData, rating: newValue })}
                        max={5}
                    />
                    <TextField
                        label="Comment"
                        name="comment"
                        multiline
                        rows={4}
                        fullWidth
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        sx={{ marginTop: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditForm} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleReviewUpdate} color="primary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PropertyDetailPage;
