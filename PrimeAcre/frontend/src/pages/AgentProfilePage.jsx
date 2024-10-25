// src/pages/AgentProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { deleteProperty } from '../api/propertyAPI';
import { Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    Avatar,
    CircularProgress,
} from '@mui/material';

function AgentProfilePage() {
    const [agentData, setAgentData] = useState(null);
    const [errors, setErrors] = useState(null);

    const fetchAgentData = async () => {
        try {
            const data = await getUserProfile();
            setAgentData(data);
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchAgentData();
    }, []);

    const handleDeleteProperty = async (id) => {
        try {
            await deleteProperty(id);
            fetchAgentData(); // Refresh data after deletion
        } catch (error) {
            setErrors(error.response?.data?.error || 'An error occurred');
        }
    };

    if (!agentData) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
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

            {/* Agent Header Section */}
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
                        {/* Agent Photo */}
                        <Avatar
                            alt={`${agentData.firstName} ${agentData.lastName}`}
                            src={agentData.photoUrl || 'default-agent-photo.jpg'}
                            sx={{
                                width: 200,
                                height: 200,
                                margin: 'auto',
                                border: '5px solid #ff9800',
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        {/* Agent Name and Title */}
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{ color: '#ff9800' }}
                        >{`${agentData.firstName} ${agentData.lastName}`}</Typography>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ color: '#b0b0b0' }}
                        >
                            {agentData.title || 'Real Estate Agent'}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>
                            Agency: {agentData.agency}
                        </Typography>

                        {/* Contact Information */}
                        <Box style={{ marginTop: '20px' }}>
                            <Typography variant="h4" sx={{ color: '#ff9800' }}>
                                Contact Information
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Phone: {agentData.phone}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff' }}>
                                Email: {agentData.email}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Agent Listings */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h4" sx={{ color: '#ff9800', marginBottom: '20px' }}>
                    Your Properties
                </Typography>
                <Link to="/properties/add" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff9800',
                            color: '#ffffff',
                            marginBottom: 2,
                        }}
                    >
                        Add New Property
                    </Button>
                </Link>
                {agentData.properties && agentData.properties.length > 0 ? (
                    <Grid container spacing={8}>
                        {agentData.properties.map((property) => (
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

                                    {/* Action Buttons */}
                                    <Box
                                        sx={{
                                            marginTop: 'auto',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Link
                                            to={`/properties/${property._id}/edit`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: '#ff9800',
                                                    borderColor: '#ff9800',
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: '#ff9800',
                                                borderColor: '#ff9800',
                                            }}
                                            onClick={() =>
                                                handleDeleteProperty(property._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body1">
                        You have not added any properties yet.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default AgentProfilePage;