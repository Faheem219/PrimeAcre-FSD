import React, { useEffect, useState } from 'react';
import { getAgents } from '../api/agentAPI'; // API call to backend

const AgentProfilePage = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await getAgents();
                setAgents(response.data);
            } catch (error) {
                console.error('Error fetching agents:', error);
            }
        };

        fetchAgents();
    }, []);

    return (
        <div>
            <h1>Agents</h1>
            <ul>
                {agents.map((agent) => (
                    <li key={agent._id}>
                        {agent.firstName} {agent.lastName} - {agent.email}
                        <ul>
                            {agent.properties.map((property) => (
                                <li key={property._id}>{property.title}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AgentProfilePage;
