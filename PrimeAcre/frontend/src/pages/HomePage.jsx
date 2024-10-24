import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia, Avatar, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';

// Create styles for dark theme and background image section
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        color: '#ffffff',
        paddingBottom: '50px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '50px',
    },
    heroSection: {
        position: 'relative',
        height: '500px',
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
    },
    testimonialSection: {
        backgroundColor: '#2a2a2a',
        padding: '60px 0',
    },
    testimonialCard: {
        maxWidth: 600,
        margin: '20px auto',
        padding: '30px',
        backgroundColor: '#3a3a3a',
        color: '#ffffff',
    },
    testimonialAvatar: {
        width: 60,
        height: 60,
        marginRight: '15px',
        backgroundColor: '#ff9800',
    },
    testimonialContent: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
}));

const HomePage = () => {
    const classes = useStyles();

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
            <Container className={classes.section}>
                <Typography variant="h4" gutterBottom>
                    Featured Properties
                </Typography>
                <Carousel animation="slide" indicators={false} navButtonsAlwaysVisible={true}>
                    {[1, 2, 3].map((item, index) => (
                        <Card className={classes.propertyCard} key={index}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`https://via.placeholder.com/600x400?text=Property+${index + 1}`}
                                alt={`Property ${index + 1}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Property {index + 1}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stunning property with modern amenities.
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            </Container>

            {/* Why Choose Us Section */}
            <Container className={classes.section}>
                <Typography variant="h4" gutterBottom>
                    Why Choose PrimeAcre?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Expert Agents</Typography>
                        <Typography variant="body1">
                            Our agents have deep market knowledge and are committed to providing excellent service.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Wide Selection</Typography>
                        <Typography variant="body1">
                            Choose from a diverse range of properties to fit every need and budget.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6">Trusted Partners</Typography>
                        <Typography variant="body1">
                            We are trusted by thousands of happy clients. Your dream property is our mission.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box className={classes.testimonialSection}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        What Our Clients Say
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {[{
                            text: 'PrimeAcre made finding my dream home so easy and enjoyable!',
                            author: 'John Doe',
                        }, {
                            text: 'Their agents are simply the best! Very knowledgeable and friendly.',
                            author: 'Jane Smith',
                        }, {
                            text: 'Highly recommend PrimeAcre for anyone looking for hassle-free property buying.',
                            author: 'Emma Wilson',
                        }].map((testimonial, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Paper className={classes.testimonialCard} elevation={3}>
                                    <Box className={classes.testimonialContent}>
                                        <Avatar className={classes.testimonialAvatar}>{testimonial.author[0]}</Avatar>
                                        <Box>
                                            <Typography variant="body1">{testimonial.text}</Typography>
                                            <Typography variant="subtitle2" color="text.secondary">- {testimonial.author}</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default HomePage;

/* Installation Instructions for New Packages */
// Run the following command to install the necessary package for the above code:
// Carousel: npm install react-material-ui-carousel
