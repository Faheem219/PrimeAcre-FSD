import React, { useState } from 'react';
import { addProperty } from '../api/propertyAPI'; // API call to backend

const AddPropertyPage = () => {
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        propertyType: '',
        agent: '',
    });

    const handleChange = (e) => {
        setPropertyData({
            ...propertyData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProperty(propertyData);
            alert('Property added successfully!');
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={propertyData.title}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={propertyData.description}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={propertyData.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={propertyData.location}
                onChange={handleChange}
                required
            />
            <select name="propertyType" value={propertyData.propertyType} onChange={handleChange} required>
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
            </select>
            <input
                type="text"
                name="agent"
                placeholder="Agent ID"
                value={propertyData.agent}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Property</button>
        </form>
    );
};

export default AddPropertyPage;
