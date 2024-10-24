import React from 'react';
import { Box, Typography, Container, Link, IconButton, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2C2C2C', // Grey dark background for dark mode
                color: '#FFFFFF', // White text
                py: 4, // Padding top and bottom
                mt: 6, // Margin top
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Prime Acre
                        </Typography>
                        <Typography variant="body2" align="center">
                            Empowering real estate for the modern world.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                            >
                                <FacebookIcon sx={{ color: '#ff9800' }} />
                            </IconButton>
                            <IconButton
                                href="https://www.twitter.com"
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                            >
                                <TwitterIcon sx={{ color: '#ff9800' }} />
                            </IconButton>
                            <IconButton
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                            >
                                <InstagramIcon sx={{ color: '#ff9800' }} />
                            </IconButton>
                            <IconButton
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                            >
                                <LinkedInIcon sx={{ color: '#ff9800' }} />
                            </IconButton>
                            <IconButton
                                href="https://www.github.com"
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                            >
                                <GitHubIcon sx={{ color: '#ff9800' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link href="/privacy-policy" color="inherit" sx={{ display: 'block', my: 1 }}>
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" color="inherit" sx={{ display: 'block', my: 1 }}>
                                Terms of Service
                            </Link>
                            <Link href="/contact-us" color="inherit" sx={{ display: 'block', my: 1 }}>
                                Contact Us
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography variant="body2" sx={{ color: '#ff9800' }}>
                        © 2024 Prime Acre. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
