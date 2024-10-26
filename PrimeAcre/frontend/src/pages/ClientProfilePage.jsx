// src/pages/ClientProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Grid,
    Paper,
    Avatar,
    CircularProgress,
} from '@mui/material';

function ClientProfilePage() {
    const [clientData, setClientData] = useState(null);
    const [errors, setErrors] = useState(null);

    const fetchClientData = async () => {
        try {
            const data = await getUserProfile();
            setClientData(data);
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchClientData();
    }, []);

    if (!clientData) {
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
                minHeight: '100vh',
                backgroundColor: '#121212',
                color: '#FFFFFF',
                padding: '40px',
                width: '100vw',
                boxSizing: 'border-box',
            }}
        >
            {errors && (
                <Typography variant="h6" style={{ color: '#ff0000' }}>
                    {errors}
                </Typography>
            )}

            {/* Client Header Section */}
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: '#1e1e1e',
                    padding: '20px',
                    marginBottom: '40px',
                    borderRadius: '10px',
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        {/* Client Photo */}
                        <Avatar
                            alt={`${clientData.firstName} ${clientData.lastName}`}
                            src={clientData.photoUrl || 'default-client-photo.jpg'}
                            sx={{
                                width: 200,
                                height: 200,
                                margin: 'auto',
                                border: '5px solid #ff9800',
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        {/* Client Name */}
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{ color: '#ff9800' }}
                        >{`${clientData.firstName} ${clientData.lastName}`}</Typography>

                        {/* Contact Information */}
                        <Box style={{ marginTop: '20px' }}>
                            <Typography variant="h4" sx={{ color: '#ff9800' }}>
                                Contact Information
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Email: {clientData.email}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Phone: {clientData.phone}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Interested Properties */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h4" sx={{ color: '#ff9800', marginBottom: '20px' }}>
                    Interested Properties
                </Typography>
                {clientData.interestedProperties && clientData.interestedProperties.length > 0 ? (
                    <Grid container spacing={8}>
                        {clientData.interestedProperties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property._id}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        backgroundColor: '#1e1e1e',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    {/* Property Image */}
                                    {property.imageUrl && (
                                        <img
                                            src={property.imageUrl}
                                            alt={property.title}
                                            style={{
                                                width: '100%',
                                                height: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                                marginBottom: '15px',
                                            }}
                                        />
                                    )}

                                    {/* Property Title */}
                                    <Link
                                        to={`/properties/${property._id}`}
                                        style={{
                                            color: '#ff9800',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {property.title}
                                        </Typography>
                                    </Link>

                                    {/* Property Details */}
                                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                        Location: {property.location}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                        Price: ${property.price}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body1">
                        You have not marked any properties as interested yet.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default ClientProfilePage;
