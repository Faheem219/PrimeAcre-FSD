// src/pages/ClientProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff9800',
        },
        background: {
            default: '#1a1a1a',
            paper: '#2a2a2a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    color: 'text.primary',
                }}
            >
                Loading...
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    padding: 4,
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    width: '100vw',
                    boxSizing: 'border-box',
                }}
            >
                <Grid container spacing={4} sx={{ maxWidth: '1400px', width: '100%', margin: '0 auto', alignItems: 'stretch' }}>
                    {/* Left Side: Client Profile Photo and Name */}
                    <Grid item xs={12} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper
                            elevation={8}
                            sx={{
                                padding: 4,
                                textAlign: 'center',
                                backgroundColor: 'background.paper',
                                borderRadius: 4,
                                width: '100%',
                                maxWidth: 400,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 160,
                                    height: 160,
                                    borderRadius: '50%',
                                    backgroundColor: 'grey.700',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    mb: 2,
                                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <img
                                    src={clientData.photoUrl || 'default-client-photo.jpg'}
                                    alt={`${clientData.firstName} ${clientData.lastName}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {clientData.firstName} {clientData.lastName}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Right Side: Client Details */}
                    <Grid item xs={12} md={8} lg={9} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Paper
                            elevation={8}
                            sx={{
                                padding: 4,
                                backgroundColor: 'background.paper',
                                borderRadius: 4,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
                                height: '100%',
                            }}
                        >
                            {errors && <Typography color="error" sx={{ mb: 2 }}>{errors}</Typography>}
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '500', mb: 2 }}>Email: {clientData.email}</Typography>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: '500', mb: 2 }}>Phone: {clientData.phone}</Typography>

                            <Typography variant="h5" gutterBottom sx={{ mt: 4, color: 'primary.main', fontWeight: 'bold' }}>
                                Interested Properties
                            </Typography>
                            {clientData.interestedProperties && clientData.interestedProperties.length > 0 ? (
                                <ul style={{ paddingLeft: '1rem', listStyle: 'none', margin: 0 }}>
                                    {clientData.interestedProperties.map((property) => (
                                        <li key={property._id} style={{ marginBottom: '0.5rem' }}>
                                            <Link
                                                to={`/properties/${property._id}`}
                                                style={{ color: '#ff9800', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}
                                            >
                                                {property.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography sx={{ fontStyle: 'italic' }}>No properties marked as interested yet.</Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default ClientProfilePage;
