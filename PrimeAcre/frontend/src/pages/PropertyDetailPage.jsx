// src/pages/PropertyDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../api/propertyAPI';
import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import Slideshow from '../components/Slideshow';

function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
            } catch (error) {
                setErrors(error.response?.data?.error || 'An error occurred while fetching property details');
            }
        };

        fetchProperty();
    }, [id]);

    if (!property) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</Box>;
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                padding: 4,
                fontFamily: 'Proxima Nova, sans-serif',
                color: '#fff',
                overflowX: 'hidden',  // Prevent horizontal scroll
                boxSizing: 'border-box'  // Include padding and border in the element's width and height
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

            <Paper sx={{ padding: 3, backgroundColor: '#333', color: '#fff', marginBottom: 4 }}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Location:</strong> {property.location}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Price:</strong> ${property.price}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Size:</strong> {property.size} sq ft
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Bathrooms:</strong> {property.bathrooms}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Property Type:</strong> {property.propertyType}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Description:</strong> {property.description}
                </Typography>
            </Paper>

            {/* Comments Section */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#ff9800' }}>
                Comments
            </Typography>

            {property.reviews && property.reviews.length > 0 ? (
                <Grid container spacing={2} justifyContent="flex-start">
                    {property.reviews.map((review) => (
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
                                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1, color: '#bbb' }}>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </Typography>
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
        </Box>
    );
}

export default PropertyDetailPage;
s