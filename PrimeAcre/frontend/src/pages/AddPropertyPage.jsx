// src/pages/AddPropertyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../api/propertyAPI';

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
        images: [],
    });
    const [imagesPreview, setImagesPreview] = useState([]);
    const [errors, setErrors] = useState(null);

    const propertyTypes = ['Apartment', 'House', 'Condo', 'Land', 'Commercial'];
    const statuses = ['Available', 'Sold', 'Pending'];

    const handleChange = (e) => {
        if (e.target.name === 'images') {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, images: files });

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

        formData.images.forEach((image) => {
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
        <div>
            <h1>Add New Property</h1>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                {/* Title */}
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* Description */}
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* Price */}
                <label>
                    Price ($):
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* Location */}
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* Size */}
                <label>
                    Size (sq ft):
                    <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                    />
                </label>
                {/* Bedrooms */}
                <label>
                    Bedrooms:
                    <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                    />
                </label>
                {/* Bathrooms */}
                <label>
                    Bathrooms:
                    <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                    />
                </label>
                {/* Property Type */}
                <label>
                    Property Type:
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        required
                    >
                        {propertyTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Status */}
                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Images */}
                <label>
                    Images (up to 5):
                    <input
                        type="file"
                        name="images"
                        onChange={handleChange}
                        multiple
                        accept="image/*"
                    />
                </label>
                {/* Image Previews */}
                {imagesPreview.length > 0 && (
                    <div>
                        <h3>Image Previews:</h3>
                        {imagesPreview.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt="Preview"
                                style={{ width: '100px', marginRight: '10px' }}
                            />
                        ))}
                    </div>
                )}
                {/* Submit Button */}
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
}

export default AddPropertyPage;
