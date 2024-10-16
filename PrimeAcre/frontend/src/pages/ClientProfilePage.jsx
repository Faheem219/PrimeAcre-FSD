// src/pages/ClientProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { Link } from 'react-router-dom';
import {
    Box,
    CircularProgress
} from '@mui/material';

function ClientProfilePage() {
    const [clientData, setClientData] = useState(null);
    const [errors, setErrors] = useState(null);

    const fetchClientData = async () => {
        try {
            const data = await getUserProfile();
            setClientData(data);
        } catch (error) {
            setErrors(error.response.data.error || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchClientData();
    }, []);

    if (!clientData) {
        return (
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          );
    }

    return (
        <div>
            <h1>Client Profile</h1>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <p>
                Name: {clientData.firstName} {clientData.lastName}
            </p>
            <p>Email: {clientData.email}</p>
            <p>Phone: {clientData.phone}</p>

            <h2>Interested Properties</h2>
            {clientData.interestedProperties && clientData.interestedProperties.length > 0 ? (
                <ul>
                    {clientData.interestedProperties.map((property) => (
                        <li key={property._id}>
                            <Link to={`/properties/${property._id}`}>{property.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not marked any properties as interested yet.</p>
            )}
        </div>
    );
}

export default ClientProfilePage;
