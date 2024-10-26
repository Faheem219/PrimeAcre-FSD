// src/pages/PropertyListPage.jsx
import React, { useEffect, useState } from 'react';
import { getProperties } from '../api/propertyAPI';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

function PropertyListPage() {
    const [properties, setProperties] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                setErrors(error.response?.data?.error || 'An error occurred while fetching properties');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100vw',
                padding: { xs: 2, sm: 4 },
                fontFamily: 'Proxima Nova, sans-serif',
                backgroundColor: '#121212',
                color: '#ffffff',
                minHeight: '100vh',
                overflow: 'hidden', // Prevent horizontal and vertical scroll bar
                boxSizing: 'border-box', // Prevents padding from increasing overall width
            }}
        >
            {/* Customized Header */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h3" component="h1" sx={{ color: '#ff9800', fontWeight: 'bold', borderBottom: '2px solid #ff9800', display: 'inline-block', paddingBottom: 1 }}>
                    Properties
                </Typography>
            </Box>

            {errors && <Typography color="error" sx={{ textAlign: 'center' }}>{errors}</Typography>}
            {properties.length > 0 ? (
                <Grid container spacing={4} justifyContent="center" sx={{ margin: '0 auto', maxWidth: '100%' }}>
                    {properties.map((property) => (
                        <Grid item xs={12} sm={6} md={3} key={property._id}>
                            <Card
                                sx={{
                                    backgroundColor: '#1e1e1e',
                                    color: '#ffffff',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    overflow: 'hidden', // Make sure card content doesn't overflow
                                }}
                            >
                                {property.images && property.images.length > 0 && (
                                    <CardMedia
                                        component="img"
                                        image={property.images[0]}
                                        alt={property.title}
                                        sx={{
                                            height: 200,
                                            borderTopLeftRadius: '12px',
                                            borderTopRightRadius: '12px',
                                        }}
                                    />
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="div" sx={{ color: '#ff9800', fontWeight: 'bold', marginBottom: 2 }}>
                                        {property.title}
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
                                        Location: {property.location}
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
                                        Price: ${property.price}
                                    </Typography>
                                    <Typography variant="body2" component="p" sx={{ fontStyle: 'italic', marginBottom: 1 }}>
                                        Type: {property.propertyType}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ padding: 2 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        component={Link}
                                        to={`/properties/${property._id}`}
                                        sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#ffb74d' } }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ padding: 2, textAlign: 'center', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
                    <Typography variant="body1">No properties available at the moment.</Typography>
                </Paper>
            )}
        </Box>
    );
}

export default PropertyListPage;
