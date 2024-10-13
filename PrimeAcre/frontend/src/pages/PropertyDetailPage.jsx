import React, { useEffect, useState } from 'react';
import { getProperties, getPropertyById } from '../api/propertyAPI'; // API calls to backend
import { useParams, useHistory } from 'react-router-dom';

const PropertyDetailPage = () => {
    const { id } = useParams();  // Get the property ID from URL params
    const [properties, setProperties] = useState([]);  // List of all properties
    const [property, setProperty] = useState(null);    // Currently selected property
    const history = useHistory();

    // Fetch all properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await getProperties();
                setProperties(response.data);  // Set the list of properties
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    // Fetch the specific property based on ID from the URL
    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                try {
                    const response = await getPropertyById(id);
                    setProperty(response.data);  // Set the selected property details
                } catch (error) {
                    console.error('Error fetching property details:', error);
                }
            };

            fetchProperty();
        }
    }, [id]);

    // Handle property selection from the list
    const handlePropertyClick = (propertyId) => {
        history.push(`/properties/${propertyId}`);  // Navigate to the selected property
    };

    // If the property is not yet fetched
    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Sidebar - Property List */}
            <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: '10px' }}>
                <h2>All Properties</h2>
                <ul>
                    {properties.map((propertyItem) => (
                        <li key={propertyItem._id} style={{ marginBottom: '10px' }}>
                            <button
                                style={{
                                    padding: '10px',
                                    width: '100%',
                                    backgroundColor: '#f0f0f0',
                                    cursor: 'pointer',
                                    border: 'none',
                                }}
                                onClick={() => handlePropertyClick(propertyItem._id)}
                            >
                                {propertyItem.title} - {propertyItem.location}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main content - Selected Property Details */}
            <div style={{ flex: 2, padding: '10px' }}>
                <h1>{property.title}</h1>
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Status:</strong> {property.status}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Property Type:</strong> {property.propertyType}</p>
                <p><strong>Date Listed:</strong> {new Date(property.dateListed).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
