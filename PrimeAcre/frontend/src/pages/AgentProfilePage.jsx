// src/pages/AgentProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Paper, Avatar, List, ListItem, ListItemText } from '@mui/material';

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

    if (!agentData) {
        return <div>Loading...</div>;
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
            {errors && <Typography variant="h6" style={{ color: '#ff0000' }}>{errors}</Typography>}

            {/* Agent Header Section */}
            <Paper elevation={3} sx={{ backgroundColor: '#1e1e1e', padding: '20px', marginBottom: '40px', borderRadius: '10px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        {/* Agent Photo */}
                        <Avatar
                            alt={`${agentData.firstName} ${agentData.lastName}`}
                            src={agentData.photoUrl || 'default-agent-photo.jpg'}
                            sx={{ width: 200, height: 200, margin: 'auto', border: '5px solid #ff9800' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        {/* Agent Name and Title */}
                        <Typography variant="h4" gutterBottom sx={{ color: '#ff9800' }}>{`${agentData.firstName} ${agentData.lastName}`}</Typography>
                        <Typography variant="h6" gutterBottom sx={{ color: '#b0b0b0' }}>{agentData.title || 'Real Estate Agent'}</Typography>

                        {/* Brief Bio */}
                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                            {agentData.bio || 'No bio available'}
                        </Typography>

                        {/* Contact Information */}
                        <Box style={{ marginTop: '20px' }}>
                            <Typography variant="h6" sx={{ color: '#ff9800' }}>Contact Information</Typography>
                            <Typography variant="body1">Phone: {agentData.phone}</Typography>
                            <Typography variant="body1">Email: {agentData.email}</Typography>
                            <Button variant="contained" sx={{ backgroundColor: '#ff9800', color: '#ffffff', marginTop: '10px' }} href="/schedule-appointment">
                                Schedule a Meeting
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* Social Media Links */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Follow Me</Typography>
                <Button variant="contained" sx={{ backgroundColor: '#ff9800', color: '#ffffff', marginRight: '10px' }} href={agentData.linkedin}>
                    LinkedIn
                </Button>
                {/* Removed Instagram and Zillow */}
            </Box>

            {/* License and Certifications */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>License & Certifications</Typography>
                <Typography variant="body1">License No: {agentData.licenseNumber}</Typography>
                <Typography variant="body1">Specializations: {agentData.certifications?.join(', ')}</Typography>
            </Box>

            {/* Client Testimonials */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Client Testimonials</Typography>
                {agentData.testimonials && agentData.testimonials.length > 0 ? (
                    <List>
                        {agentData.testimonials.map((testimonial, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`"${testimonial.text}"`} secondary={`- ${testimonial.clientName}`} sx={{ color: '#b0b0b0' }} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">No testimonials yet.</Typography>
                )}
            </Box>

            {/* Agent Listings */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Your Properties</Typography>
                <Link to="/properties/add">
                    <Button variant="contained" sx={{ backgroundColor: '#ff9800', color: '#ffffff', marginBottom: 2 }}>Add New Property</Button>
                </Link>
                {agentData.properties && agentData.properties.length > 0 ? (
                    <List>
                        {agentData.properties.map((property) => (
                            <ListItem key={property._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link to={`/properties/${property._id}`} style={{ color: '#ff9800', textDecoration: 'none' }}>
                                    {property.title}
                                </Link>
                                <Button variant="outlined" sx={{ color: '#ff9800', borderColor: '#ff9800' }}>Delete</Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">You have not added any properties yet.</Typography>
                )}
            </Box>

            {/* Areas of Service */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Areas of Service</Typography>
                <Typography variant="body1">{agentData.areasOfService?.join(', ')}</Typography>
            </Box>

            {/* Video Introduction */}
            {agentData.videoUrl && (
                <Box style={{ marginBottom: '40px' }}>
                    <Typography variant="h6" sx={{ color: '#ff9800' }}>Introduction Video</Typography>
                    <video controls style={{ width: '100%' }}>
                        <source src={agentData.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
            )}

            {/* Achievements and Awards */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Achievements & Awards</Typography>
                <List>
                    {agentData.achievements?.map((achievement, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={achievement} sx={{ color: '#b0b0b0' }} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Languages Spoken */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Languages Spoken</Typography>
                <Typography variant="body1">{agentData.languages?.join(', ')}</Typography>
            </Box>

            {/* Professional Affiliations */}
            <Box style={{ marginBottom: '40px' }}>
                <Typography variant="h6" sx={{ color: '#ff9800' }}>Professional Affiliations</Typography>
                <Typography variant="body1">{agentData.affiliations?.join(', ')}</Typography>
            </Box>
        </Box>
    );
}

export default AgentProfilePage;
