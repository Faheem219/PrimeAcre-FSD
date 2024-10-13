import React, { useEffect, useState } from 'react';
import { getPropertyById, updateProperty } from '../api/propertyAPI'; // API calls
import { useParams, useHistory } from 'react-router-dom';

const EditPropertyPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await getPropertyById(id);
                setPropertyData(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setPropertyData({
            ...propertyData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProperty(id, propertyData);  // Call to API
            history.push(`/properties/${id}`);  // Redirect to updated property page
        } catch (error) {
            console.error('Error updating property:', error);
        }
    };

    return (
        <div>
            <h1>Edit Property</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={propertyData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={propertyData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={propertyData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={propertyData.location}
                    onChange={handleChange}
                    placeholder="Location"
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
                    type="number"
                    name="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={handleChange}
                    placeholder="Bedrooms"
                    required
                />
                <input
                    type="number"
                    name="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={handleChange}
                    placeholder="Bathrooms"
                    required
                />
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
};

export default EditPropertyPage;
