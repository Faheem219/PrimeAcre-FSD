import React, { useEffect, useState } from 'react';
import { getProperties } from '../api/propertyAPI'; // API call to backend
import { Link } from 'react-router-dom';

const PropertyListPage = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await getProperties();
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Properties List</h1>
            <ul>
                {properties.map((property) => (
                    <li key={property._id}>
                        <Link to={`/properties/${property._id}`}>
                            {property.title} - {property.location} - ${property.price}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyListPage;
