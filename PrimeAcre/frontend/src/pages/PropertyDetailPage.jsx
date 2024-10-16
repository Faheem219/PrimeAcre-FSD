// src/pages/PropertyDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../api/propertyAPI';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Slideshow from '../components/Slideshow';

function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setProperty(data);
            } catch (error) {
                setErrors(error.response?.data?.error || 'An error occurred while fetching the property details');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (errors) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{errors}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    backgroundColor: '#1e1e1e',
                    color: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 3, color: '#ff9800' }}>
                    {property.title}
                </Typography>

                {/* Slideshow for Property Images */}
                {property.images && property.images.length > 0 && (
                    <Slideshow images={property.images} />
                )}

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Description:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {property.description}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Price:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        ${property.price}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Location:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {property.location}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Size:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {property.size} sq ft
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Bedrooms:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {property.bedrooms}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Bathrooms:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {property.bathrooms}
                    </Typography>

                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                        Type:
                    </Typography>
                    <Typography variant="body1">
                        {property.propertyType}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default PropertyDetailPage;
