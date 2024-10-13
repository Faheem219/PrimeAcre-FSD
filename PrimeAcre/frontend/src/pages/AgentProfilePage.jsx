// src/pages/AgentProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/userAPI';
import { deleteProperty } from '../api/propertyAPI';
import { Link } from 'react-router-dom';

function AgentProfilePage() {
    const [agentData, setAgentData] = useState(null);
    const [errors, setErrors] = useState(null);

    const fetchAgentData = async () => {
        try {
            const data = await getUserProfile();
            setAgentData(data);
        } catch (error) {
            setErrors(error.response.data.error || 'An error occurred');
        }
    };

    useEffect(() => {
        fetchAgentData();
    }, []);

    const handleDeleteProperty = async (id) => {
        try {
            await deleteProperty(id);
            fetchAgentData(); // Refresh data after deletion
        } catch (error) {
            setErrors(error.response.data.error || 'An error occurred');
        }
    };

    if (!agentData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Agent Profile</h1>
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
            <p>
                Name: {agentData.firstName} {agentData.lastName}
            </p>
            <p>Email: {agentData.email}</p>
            <p>Phone: {agentData.phone}</p>
            <p>Agency: {agentData.agency}</p>

            <h2>Your Properties</h2>
            <Link to="/properties/add">Add New Property</Link>
            {agentData.properties && agentData.properties.length > 0 ? (
                <ul>
                    {agentData.properties.map((property) => (
                        <li key={property._id}>
                            <Link to={`/properties/${property._id}`}>{property.title}</Link>{' '}
                            | <Link to={`/properties/${property._id}/edit`}>Edit</Link> |{' '}
                            <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not added any properties yet.</p>
            )}
        </div>
    );
}

export default AgentProfilePage;
