// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to PrimeAcre</h1>
            <p>Your one-stop solution for real estate needs.</p>
            <Link to="/properties">Browse Properties</Link>
        </div>
    );
}

export default HomePage;
