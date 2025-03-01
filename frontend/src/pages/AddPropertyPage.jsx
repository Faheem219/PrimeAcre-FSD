// src/pages/AddPropertyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../api/propertyAPI';

import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';

function AddPropertyPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: 'Apartment',
        status: 'Available',
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [errors, setErrors] = useState(null);

    const propertyTypes = ['Apartment', 'House', 'Condo', 'Land', 'Commercial'];
    const statuses = ['Available', 'Sold', 'Pending'];

    const handleChange = (e) => {
        if (e.target.name === 'images') {
            const files = Array.from(e.target.files);
            setImages(files); // Set the files to the images state

            // Image previews
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagesPreview(previews);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('location', formData.location);
        data.append('size', formData.size);
        data.append('bedrooms', formData.bedrooms);
        data.append('bathrooms', formData.bathrooms);
        data.append('propertyType', formData.propertyType);
        data.append('status', formData.status);

        // Append each image to the formData
        images.forEach((image) => {
            data.append('images', image);
        });

        try {
            await addProperty(data);
            navigate('/agent/profile'); // Redirect to agent profile
        } catch (error) {
            setErrors(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#121212',
                color: '#ffffff',
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
                p: 3,
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: '#1e1e1e',
                        width: '100%',
                        maxWidth: '600px',
                        mx: 'auto', // Horizontal centering
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{ color: '#ffffff' }}
                    >
                        Add New Property
                    </Typography>
                    {errors && (
                        <Typography color="error" align="center">
                            {errors}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        {/* Title */}
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Description */}
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Price */}
                        <TextField
                            label="Price ($)"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Location */}
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Size */}
                        <TextField
                            label="Size (sq ft)"
                            type="number"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Bedrooms */}
                        <TextField
                            label="Bedrooms"
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Bathrooms */}
                        <TextField
                            label="Bathrooms"
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{
                                style: { color: '#ffffff' },
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                },
                            }}
                        />
                        {/* Property Type */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel sx={{ color: '#ffffff' }}>Property Type</InputLabel>
                            <Select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                                sx={{
                                    color: '#ffffff',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#1e1e1e',
                                            color: '#ffffff',
                                        },
                                    },
                                }}
                            >
                                {propertyTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Status */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel sx={{ color: '#ffffff' }}>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                sx={{
                                    color: '#ffffff',
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#1e1e1e',
                                            color: '#ffffff',
                                        },
                                    },
                                }}
                            >
                                {statuses.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Images */}
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Images (up to 5):
                        </Typography>
                        <input
                            type="file"
                            name="images"
                            onChange={handleChange}
                            multiple
                            accept="image/*"
                            style={{ color: '#ffffff', marginTop: '8px' }}
                        />
                        {/* Image Previews */}
                        {imagesPreview.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Image Previews:
                                </Typography>
                                {imagesPreview.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt="Preview"
                                        style={{ width: '100px', marginRight: '10px' }}
                                    />
                                ))}
                            </Box>
                        )}
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Add Property
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default AddPropertyPage;
