import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { getProperties } from '../api/propertyAPI';

// Create styles for dark theme and background image section
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#ffffff',
        paddingBottom: '50px',
        overflowX: 'hidden', // Prevent horizontal scroll
    },
    header: {
        textAlign: 'center',
        marginBottom: '50px',
    },
    heroSection: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(/src/assets/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '40px',
        borderRadius: '15px',
    },
    linkButton: {
        marginTop: '20px',
        backgroundColor: '#ff9800',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#e67e22',
        },
    },
    section: {
        padding: '60px 0',
        textAlign: 'center',
    },
    propertyCard: {
        maxWidth: 345,
        margin: '20px auto',
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
    },
    carouselContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    propertyButton: {
        width: '100%',
        marginTop: '10px',
        fontSize: '16px',
        textTransform: 'none',
    },
    cleanBox: {
        background: 'linear-gradient(145deg, #1e1e1e, #2e2e2e)',
        boxShadow: '10px 10px 20px #0e0e0e, -10px -10px 20px #3e3e3e',
        borderRadius: '15px',
        padding: '20px',
        color: '#ffffff',
    },
    propertyTitle: {
        color: '#ff9800',
        fontWeight: 'bold',
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className={classes.root}>
            {/* Hero Section with Background Image */}
            <Box className={classes.heroSection}>
                <Box className={classes.heroContent}>
                    <Typography variant="h2" component="h1">
                        Welcome to PrimeAcre
                    </Typography>
                    <Typography variant="h6">
                        Your one-stop solution for real estate needs.
                    </Typography>
                    <Button
                        component={Link}
                        to="/properties"
                        className={classes.linkButton}
                        variant="contained"
                    >
                        Browse Properties
                    </Button>
                </Box>
            </Box>

            {/* Featured Properties Carousel Section */}
            <Container className={`${classes.section} ${classes.carouselContainer}`}>
                <Typography variant="h4" gutterBottom>
                    Featured Properties
                </Typography>
                <Carousel animation="slide" indicators={false} navButtonsAlwaysVisible={true}>
                    {properties.length > 0 ? (
                        properties.map((property, index) => (
                            <Box key={index} className={classes.cleanBox} style={{ maxWidth: '500px', margin: '0 auto' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={property.images && property.images.length > 0 ? property.images[0] : 'https://via.placeholder.com/600x400?text=Property'}
                                    alt={property.title}
                                    style={{ borderRadius: '15px' }}
                                />
                                <Box style={{ padding: '20px' }}>
                                    <Typography variant="h5" className={classes.propertyTitle}>
                                        {property.title}
                                    </Typography>
                                    <AwesomeButton
                                        type="primary"
                                        href={`/properties/${property._id}`}
                                        className={classes.propertyButton}
                                    >
                                        View Property - ${property.price}
                                    </AwesomeButton>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1">No featured properties available.</Typography>
                    )}
                </Carousel>
            </Container>

            {/* Why Choose Us Section */}
            {/* Why Choose Us Section */}
            <Container className={classes.section}>
                <Typography variant="h4" style={{ marginBottom: '40px' }}>
                    Why Choose PrimeAcre?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Box className={classes.cleanBox} sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h4" style={{ marginBottom: '35px' }}>Expert Agents</Typography>
                            <Typography variant="body1" textAlign="center">
                                Our agents have deep market knowledge and are committed to providing excellent service.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className={classes.cleanBox} sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h4" style={{ marginBottom: '40px' }}>Wide Selection</Typography>
                            <Typography variant="body1" textAlign="center">
                                Choose from a diverse range of properties to fit every need and budget.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className={classes.cleanBox} sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h4" style={{ marginBottom: '35px' }}>Trusted Partners</Typography>
                            <Typography variant="body1" textAlign="center">
                                We are trusted by thousands of happy clients. Your dream property is our mission.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HomePage;

/* Installation Instructions for New Packages */
// Run the following commands to install the necessary packages for the above code:
// Carousel: npm install react-material-ui-carousel
// Awesome Button: npm install react-awesome-button
