import React, { useEffect, useState } from 'react';
import { getClients } from '../api/clientAPI'; // API call to backend

const ClientProfilePage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <h1>Clients</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client._id}>
                        {client.firstName} {client.lastName} - {client.email}
                        <ul>
                            {client.interestedProperties.map((property) => (
                                <li key={property._id}>{property.title}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientProfilePage;
