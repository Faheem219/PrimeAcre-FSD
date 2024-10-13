// src/pages/PropertyListPage.jsx
import React, { useEffect, useState } from 'react';
import { getProperties } from '../api/propertyAPI';
import { Link } from 'react-router-dom';

function PropertyListPage() {
    const [properties, setProperties] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(data);
            } catch (error) {
                setErrors(error.response.data.error || 'An error occurred while fetching properties');
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Properties</h1>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            {properties.length > 0 ? (
                <ul>
                    {properties.map((property) => (
                        <li key={property._id}>
                            <Link to={`/properties/${property._id}`}>
                                <h2>{property.title}</h2>
                                <p>Location: {property.location}</p>
                                <p>Price: ${property.price}</p>
                                <p>Type: {property.propertyType}</p>
                                {/* Display first image if available */}
                                {property.images && property.images.length > 0 && (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        style={{ width: '200px' }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No properties available at the moment.</p>
            )}
        </div>
    );
}

export default PropertyListPage;
