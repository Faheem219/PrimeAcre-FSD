// src/pages/PropertyListPage.jsx
import React, { useEffect, useState } from 'react';
import { getProperties } from '../api/propertyAPI';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box'; 
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

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
        <Box sx={{ width: '100%', padding: 2, fontFamily: 'Proxima Nova, sans-serif' }}>
            {/* Customized Header */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <h1 style={{
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: '#583952',
                    textAlign: 'center',
                    borderBottom: '2px solid #d3d3d3',
                    paddingBottom: '10px',
                    display: 'inline-block'
                }}>
                    Properties
                </h1>
            </Box>

            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {properties.length > 0 ? (
                <Grid container spacing={3} justifyContent="center">
                    {properties.map((property) => (
                        <Grid item xs={12} sm={6} md={3} key={property._id}>
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    padding: 1, 
                                    textAlign: 'center', 
                                    borderRadius: '8px', 
                                    backgroundColor: '#e4dbdb',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between', // Space out the content
                                    height: '100%' // Ensure full height for proper spacing
                                }} 
                            >
                                <Link to={`/properties/${property._id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
                                    {/* Image at the top */}
                                    {property.images && property.images.length > 0 && (
                                        <img
                                            src={property.images[0]}
                                            alt={property.title}
                                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                        />
                                    )}
                                    <h2 style={{ fontSize: '1.2rem' }}>{property.title}</h2>
                                    <p>Location: {property.location}</p>
                                    <p>Price: ${property.price}</p>
                                </Link>
                                {/* 'Type' at the bottom left */}
                                <p style={{ marginLeft: '8px', marginBottom: '8px', alignSelf: 'flex-start' }}>Type: {property.propertyType}</p>
                                {/* change can be done over herre */}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    <p>No properties available at the moment.</p>
                </Paper>
            )}
        </Box>
    );
}

export default PropertyListPage;
